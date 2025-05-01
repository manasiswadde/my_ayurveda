import { User } from "../models/user.model.js"; 
import bcrypt from "bcryptjs";
import crypto from "crypto"; // Add this import for generating random tokens
import jwt from "jsonwebtoken";
import { sendEmail } from "../config/emailConfig.js";

// Add the register function and export it
export const register = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;
    
    // Validate role if provided
    if (role && !['user', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Must be either 'user' or 'admin'"
      });
    }

    // Add your registration logic here (e.g., hashing password, saving user)
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ 
      fullname, 
      email, 
      password: hashedPassword,
      role: role || 'user' // Use provided role or default to 'user'
    });
    
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Registration Error:", error);
    // Check for duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists"
      });
    }
    return res.status(500).json({
      success: false,
      message: "Failed to register user."
    });
  }
};

// Login function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login attempt - Email:', email);
    
    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log('No user found with email:', email);
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    console.log('User found:', {
      id: user._id,
      email: user.email,
      role: user.role
    });

    // Use the comparePassword method from the user schema
    const isPasswordValid = await user.comparePassword(password);
    console.log('Password comparison result:', isPasswordValid);
    
    if (!isPasswordValid) {
      console.log('Invalid password for user:', email);
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        role: user.role 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    console.log('Login successful for user:', email);

    // Send user details and token
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login Error:", error);
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

    // Create reset URL
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    // Create email content
    const emailSubject = "Password Reset Request - Ayurveda App";
    const emailHtml = `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h2 style="color: #2e7d32; text-align: center;">Reset Your Password</h2>
        <p>Hello,</p>
        <p>You have requested to reset your password for your Ayurveda App account.</p>
        <p>Please click the button below to reset your password. This link will expire in 1 hour.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #2e7d32; 
                    color: white; 
                    padding: 12px 24px; 
                    text-decoration: none; 
                    border-radius: 5px;
                    display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>If you didn't request this password reset, please ignore this email.</p>
        <p>For security reasons, this link will expire in 1 hour.</p>
        <hr style="border: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px; text-align: center;">
          This is an automated email, please do not reply.
        </p>
      </div>
    `;

    // Send the email
    const emailSent = await sendEmail(email, emailSubject, emailHtml);

    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to send reset email. Please try again later."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password reset instructions sent to your email"
    });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later."
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    console.log('Password reset attempt with token');

    // Hash the token to match the stored hashed token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      console.log('No user found with valid reset token');
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token"
      });
    }

    console.log('User found for password reset:', user.email);

    // Update password directly in MongoDB to avoid double hashing
    await User.updateOne(
      { _id: user._id },
      { 
        $set: { 
          password: await bcrypt.hash(password, 10),
          resetPasswordToken: undefined,
          resetPasswordExpires: undefined,
          updatedAt: new Date()
        } 
      }
    );

    // Verify the update
    const updatedUser = await User.findById(user._id);
    const testLogin = await updatedUser.comparePassword(password);
    
    console.log('Password reset verification:', {
      passwordUpdated: updatedUser.password !== user.password,
      testLoginSuccessful: testLogin
    });

    if (!testLogin) {
      console.log('Warning: Password reset verification failed');
      return res.status(500).json({
        success: false,
        message: "Password reset failed. Please try again."
      });
    }

    console.log('Password reset successful for user:', user.email);
    return res.status(200).json({
      success: true,
      message: "Password has been reset successfully"
    });

  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later."
    });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    // Validate role
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Must be either 'user' or 'admin'"
      });
    }

    // Find and update user
    const user = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "User role updated successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Update Role Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update user role"
    });
  }
};
