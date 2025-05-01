import mongoose from 'mongoose';
import { User } from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const checkAndResetPassword = async (email, newPassword) => {
  try {
    // Connect to MongoDB using the exact connection string from Compass
    await mongoose.connect('mongodb://localhost:27017/ayurveda', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Find specific user
    console.log('\nLooking for user:', email);
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found in database');
      return;
    }

    console.log('\nUser found:', {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      currentPasswordHash: user.password
    });

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Test password comparison before update
    const testCompare = await bcrypt.compare(newPassword, hashedPassword);
    console.log('\nPre-update test:', {
      testComparison: testCompare,
      newPasswordHash: hashedPassword
    });

    // Update password directly in MongoDB
    await mongoose.connection.collection('users').updateOne(
      { email },
      { $set: { 
        password: hashedPassword,
        updatedAt: new Date()
      } }
    );

    // Verify the update
    const updatedUser = await User.findOne({ email });
    console.log('\nUpdated user password hash:', updatedUser.password);
    
    // Test password comparison
    const finalTest = await bcrypt.compare(newPassword, updatedUser.password);
    console.log('\nPassword update verification:', {
      passwordUpdated: updatedUser.password !== user.password,
      passwordMatches: finalTest
    });

    if (finalTest) {
      console.log('\nSuccess! You can now log in with:');
      console.log('Email:', email);
      console.log('Password:', newPassword);
    } else {
      console.log('\nWarning: Password update may not have worked correctly.');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nMongoDB connection closed');
  }
};

// Reset password for the user
const email = 'manasiswadde@gmail.com';
const newPassword = 'Test@123456'; // This will be the new password

checkAndResetPassword(email, newPassword); 