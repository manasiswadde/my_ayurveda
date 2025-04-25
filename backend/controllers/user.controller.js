import { User } from "../models/user.model.js"; 
import bcrypt from "bcryptjs";
import crypto from "crypto"; // Add this import for generating random tokens

// Add the register function and export it
export const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    // Add your registration logic here (e.g., hashing password, saving user)
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ fullname, email, password: hashedPassword });
    
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to register user.",
    });
  }
};

// Existing login function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 🔹 Check if the entered password matches the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // 🔹 Send user details (without password)
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No account found with that email address"
      });
    }

    // Generate a token and hash it before storing
    const resetToken = crypto.randomBytes(20).toString('hex');
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Set expiry to 1 hour
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    // Correct the frontend reset link
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
    console.log(`Password reset link: ${resetUrl}`); // Debugging only

    return res.status(200).json({
      success: true,
      message: "Password reset instructions sent to your email",
      resetToken // REMOVE THIS IN PRODUCTION
    });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later."
    });
  }
};


export const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.query;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    return res.status(200).json({ valid: !!user });
  } catch (error) {
    console.error("Token Verification Error:", error);
    return res.status(500).json({ valid: false });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    console.log("Reset Token Received:", token);
    console.log("New Password:", newPassword);

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Ensure token is not expired
    });

    if (!user) {
      console.log("Invalid or expired token");
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    console.log("User Found:", user.email);

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    console.log("Password Updated Successfully");

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
