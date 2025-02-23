import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import OTP from '../models/otp.model.js';
import dotenv from 'dotenv';
import { Article } from '../models/article.model.js';
import { Comment } from '../models/article.model.js';
import { sendMail } from '../Utils/mailsender.js';
import { upload_on_cloudinary } from '../utils/cloudinary.js';

dotenv.config({ path: './.env' });
const secretKey = process.env.SECRET_KEY;

if (!secretKey) {
  console.error("Error: SECRET_KEY is not defined in the environment variables.");
  process.exit(1);
}

const registerUser = async (req, res) => {
  console.log("register hit")
  try {
    const { username, email, password, name, location, picture, dob, otp } = req.body;
    console.log(req.body);
    console.log(otp);
    // Input validation
    if (!username || !email || !password || !otp) {
      console.error("Missing required fields: username, email, password, or otp.");
      return res.status(400).json({ error: "All fields (username, email, password, otp) are required." });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error(`User with email ${email} already exists.`);
      return res.status(409).json({ error: "Email already in use." });
    }

    //* Check OTP
    // const latestOTP = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);
    // if (!latestOTP || latestOTP.otp !== otp) {
    //   return res.status(400).json({ error: "Invalid or expired OTP" });
    // }

    // await OTP.deleteMany({ email });
    // Password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // User creation with additional fields
    const user = new User({
      username,
      email,
      password: hashedPassword,
      name,
      location,
      picture,
      dob,
      isEmailVerified: true
    });

    await user.save();

    // Token generation
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    res.status(201).json({
      message: `User ${username} registered successfully.`,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        location: user.location,
        picture: user.picture || "" ,
        dob: user.dob,
        accountCreated: user.accountCreated,
        articlesPublished: user.articlesPublished
      }
    });

    console.log(`User ${username} registered successfully.`);
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ error: "An error occurred while registering the user." });
  }
};

const loginUser = async (req, res) => {
  console.log("login hit")
  try {
    const { credential, password } = req.body;

    // Input validation
    if (!credential || !password) {
      console.error("Missing required fields: credential or password");
      return res.status(400).json({ error: "Both credential (email/username) and password are required" });
    }

    // Determine if credential is email or username
    const isEmail = credential.includes('@');

    // Fetch user from database based on either email or username
    const user = await User.findOne(
      isEmail ? { email: credential } : { username: credential }
    );

    if (!user) {
      console.error(`Login failed for credential: ${credential}. User not found.`);
      return res.status(404).json({
        error: `No user found with this ${isEmail ? 'email' : 'username'}`
      });
    }

    // // Password validation
    // const isValidPassword = await bcrypt.compare(password, user.password);
    // if (!isValidPassword) {
    //   console.error(`Login failed for user: ${user.username}. Invalid password.`);
    //   return res.status(401).json({ error: "Incorrect password" });
    // }

    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    // Send successful response with token and user data
    res.json({
      userId: user._id,
      token,
      username: user.username,
      email: user.email,
      name: user.name || '',
      picture: user.picture || '',
      location: user.location || ''
    });

    console.log(`User ${user.username} logged in successfully`);

  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({
      error: "An error occurred during login. Please try again later."
    });
  }
};
const getProfile = async (req, res) => {
  try {
    console.log("getProfile called");

    // Get the token from the authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.error("Authorization header is missing.");
      return res.status(401).json({ error: "No token provided." });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      console.error("Bearer token is missing.");
      return res.status(401).json({ error: "Invalid token format." });
    }

    // Verify the token
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findById(decoded.userId).populate('authorLevel').populate('achievements');
    if (!user) {
      console.error(`User not found for token with userId: ${decoded.userId}.`);
      return res.status(404).json({ error: "User not found." });
    }

    await user.populate({path:'likedArticles', strictPopulate:false})
    // Send back detailed user profile data
    res.json({
      user
    });

    console.log(`Profile fetched successfully for user ${user.username}.`);
  } catch (error) {
    console.error("Error during profile retrieval:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token." });
    }
    res.status(500).json({ error: "An error occurred while fetching the profile." });
  }
};


// const editProfile = async (req, res) => {
//   try {
//     console.log("editProfile called");

//     // Get the token from the authorization header
//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//       console.error("Authorization header is missing.");
//       return res.status(401).json({ error: "No token provided." });
//     }

//     const token = authHeader.split(' ')[1];
//     if (!token) {
//       console.error("Bearer token is missing.");
//       return res.status(401).json({ error: "Invalid token format." });
//     }

//     let decoded;
//     try {
//       // Verify and decode the token
//       decoded = jwt.verify(token, secretKey);
//     } catch (err) {
//       console.error("Error decoding token:", err.message);
//       return res.status(401).json({ error: "Invalid or expired token." });
//     }

//     const userId = decoded.userId;

//     // Extract fields to be updated from request body
//     const { name, location, picture, dob, currentPassword, newPassword } = req.body;

//     if (!name && !location && !picture && !dob && !currentPassword && !newPassword) {
//       console.error("No fields provided for update.");
//       return res.status(400).json({ error: "No fields to update." });
//     }

//     const user = await User.findById(userId);

//     if (!user) {
//       console.error(`User with ID ${userId} not found.`);
//       return res.status(404).json({ error: "User not found." });
//     }

//     // Handle password change
//     if (currentPassword || newPassword) {
//       if (!currentPassword || !newPassword) {
//         console.error("Both current and new passwords are required.");
//         return res.status(400).json({ error: "Both current and new passwords are required to change the password." });
//       }

//       const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
//       if (!isCurrentPasswordValid) {
//         console.error("Current password is incorrect.");
//         return res.status(401).json({ error: "Current password is incorrect." });
//       }

//       if (newPassword.length < 8) {
//         console.error("New password must be at least 8 characters long.");
//         return res.status(400).json({ error: "New password must be at least 8 characters long." });
//       }

//       // Hash and update the new password
//       const hashedPassword = await bcrypt.hash(newPassword, 10);
//       user.password = hashedPassword;
//     }

//     // Update other fields if provided
//     if (name) user.name = name;
//     if (location) user.location = location;
//     if (picture) user.picture = picture;
//     if (dob) user.dob = dob;

//     // Save the updated user
//     await user.save();

//     res.json({
//       message: "Profile updated successfully.",
//       user
//     });

//     console.log(`Profile updated successfully for user ${user.username}.`);
//   } catch (error) {
//     console.error("Error during profile update:", error);
//     res.status(500).json({ error: "An error occurred while updating the profile." });
//   }
// };

const editProfile = async (req, res) => {
  try {
    console.log(req.file)
    console.log("editProfile called");

    // Get the token from the authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.error("Authorization header is missing.");
      return res.status(401).json({ error: "No token provided." });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      console.error("Bearer token is missing.");
      return res.status(401).json({ error: "Invalid token format." });
    }

    let decoded;
    try {
      // Verify and decode the token
      decoded = jwt.verify(token, secretKey);
    } catch (err) {
      console.error("Error decoding token:", err.message);
      return res.status(401).json({ error: "Invalid or expired token." });
    }

    const userId = decoded.userId;

    // Extract fields to be updated from request body
    const { name, location, dob, currentPassword, newPassword } = req.body;

    if (!name && !location && !dob && !currentPassword && !newPassword && !req.file) {
      console.error("No fields provided for update.");
      return res.status(400).json({ error: "No fields to update." });
    }

    const user = await User.findById(userId);
    console.log("first ", user.picture)
    if (!user) {
      console.error(`User with ID ${userId} not found.`);
      return res.status(404).json({ error: "User not found." });
    }

    // Handle password change
    if (currentPassword || newPassword) {
      if (!currentPassword || !newPassword) {
        console.error("Both current and new passwords are required.");
        return res.status(400).json({ error: "Both current and new passwords are required to change the password." });
      }

      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        console.error("Current password is incorrect.");
        return res.status(401).json({ error: "Current password is incorrect." });
      }

      if (newPassword.length < 8) {
        console.error("New password must be at least 8 characters long.");
        return res.status(400).json({ error: "New password must be at least 8 characters long." });
      }

      // Hash and update the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    // Update other fields if provided
    if (name) user.name = name;
    if (location) user.location = location;
    if (dob) user.dob = dob;

    // Handle profile image upload
    if (req.file) {
      const fileBuffer = req.file.buffer;
      try {
        const cloudinaryResult = await upload_on_cloudinary(fileBuffer, {
          folder: 'profile_images',
          public_id: `${userId}_profile`,
        });
        console.log("cloudinary", cloudinaryResult)
        user.picture = cloudinaryResult;
      } catch (err) {
        console.error("Error uploading to Cloudinary:", err.message);
        return res.status(500).json({ error: "Error uploading profile image." });
      }
    }
    console.log("before",user)
    // Save the updated user
    await user.save();

    console.log("after",user)

    res.json({
      message: "Profile updated successfully.",
      user
    });

    console.log(`Profile updated successfully for user ${user.username}.`);
  } catch (error) {
    console.error("Error during profile update:", error);
    res.status(500).json({ error: "An error occurred while updating the profile." });
  }
};

const deleteUserAccount = async (req, res) => {
  try {
    const { otp } = req.body;
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.error("Authorization header is missing.");
      return res.status(401).json({ error: "No token provided." });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      console.error("Bearer token is missing.");
      return res.status(401).json({ error: "Invalid token format." });
    }

    const decoded = jwt.verify(token, secretKey);
    const user = await User.findById(decoded.userId);
    if (!user) {
      console.error(`User not found for token with userId: ${decoded.userId}.`);
      return res.status(404).json({ error: "User not found." });
    }

    const userId = user._id;

    // Check OTP
    const latestOTP = await OTP.findOne({ email: user.email }).sort({ createdAt: -1 }).limit(1);
    if (!latestOTP || latestOTP.otp !== otp) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    await OTP.deleteMany({ email: user.email });

    // Assuming verification is done, proceed with deletion
    await User.findByIdAndDelete(userId);
    await Article.deleteMany({ author: userId });
    await Comment.deleteMany({ user: userId });

    res.status(200).json({ message: "Account successfully deleted.", user });
  } catch (error) {
    console.error("Error deleting account:", error);
    res.status(500).json({ error: "An error occurred while deleting the account." });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;

    if (!email || !otp || !newPassword || !confirmPassword) {
      return res.status(400).json({
        error: "Email, OTP, and password are required"
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        error: "New password and confirm password do not match"
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "No user found with this email"
      });
    }

    //use strong password
    if (!newPassword || newPassword.length < 8 || !/(?=.*[A-Z])/.test(newPassword) || !/(?=.*[0-9])/.test(newPassword) || !/(?=.*[!@#$%^&*])/.test(newPassword)) {
      return res.status(400).json({
        error: "Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character (!@#$%^&*)"
      });
    }

    // Verify OTP
    const latestOTP = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);
    if (!latestOTP || latestOTP.otp !== otp) {
      return res.status(400).json({
        error: "Invalid or expired OTP"
      });
    }

    // Delete used OTP
    await OTP.deleteMany({ email });

    // Hash and update password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      message: "Password reset successful",
      user
    });

  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({
      error: "An error occurred while resetting the password"
    });
  }
};

const getOtherUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId).select(
      'username name location picture dob age accountCreated articlesPublished followers following'
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const followUser = async (req, res) => {
    try {
        const { userToFollowId } = req.params;
        
        // Get current user from token
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: "No token provided." });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, secretKey);
        const currentUserId = decoded.userId;

        // Check if trying to follow self
        if (currentUserId === userToFollowId) {
            return res.status(400).json({ error: "You cannot follow yourself" });
        }

        // Find both users
        const userToFollow = await User.findById(userToFollowId);
        const currentUser = await User.findById(currentUserId);

        console.log("userToFollow",userToFollow)
        console.log("currentUser",currentUser)

        if (!userToFollow || !currentUser) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if already following
        if (currentUser.following.includes(userToFollowId)) {
            return res.status(400).json({ error: "You are already following this user" });
        }

        // Add to following and followers lists
        currentUser.following.push(userToFollowId);
        userToFollow.followers.push(currentUserId);

        await currentUser.save();
        await userToFollow.save();

        res.status(200).json({ 
            message: "Successfully followed user",
            following: currentUser.following,
            followers: userToFollow.followers
        });

    } catch (error) {
        console.error("Error in followUser:", error);
        res.status(500).json({ error: "An error occurred while following user" });
    }
};

const unfollowUser = async (req, res) => {
  try {
      const { userToUnfollowId } = req.params;
      
      // Get current user from token
      const authHeader = req.headers.authorization;
      if (!authHeader) {
          return res.status(401).json({ error: "No token provided." });
      }
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, secretKey);
      const currentUserId = decoded.userId;

      // Check if trying to unfollow self
      if (currentUserId === userToUnfollowId) {
          return res.status(400).json({ error: "You cannot unfollow yourself" });
      }

      // Find both users
      const userToUnfollow = await User.findById(userToUnfollowId);
      const currentUser = await User.findById(currentUserId);

      if (!userToUnfollow || !currentUser) {
          return res.status(404).json({ error: "User not found" });
      }

      // Check if actually following
      if (!currentUser.following.includes(userToUnfollowId)) {
          return res.status(400).json({ error: "You are not following this user" });
      }

      // Remove from following and followers lists
      currentUser.following = currentUser.following.filter(id => id.toString() !== userToUnfollowId);
      userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== currentUserId);

      await currentUser.save();
      await userToUnfollow.save();

      res.status(200).json({ 
          message: "Successfully unfollowed user",
          following: currentUser.following,
          followers: userToUnfollow.followers
      });

  } catch (error) {
      console.error("Error in unfollowUser:", error);
      res.status(500).json({ error: "An error occurred while unfollowing user" });
  }
};

export { getProfile, registerUser, loginUser, editProfile, deleteUserAccount, resetPassword, getOtherUser, followUser, unfollowUser };