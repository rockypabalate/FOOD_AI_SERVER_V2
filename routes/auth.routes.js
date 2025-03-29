// auth.routes.js under the folder routes
const express = require("express");
const bcrypt = require("bcryptjs");
const { promisePool } = require('../database/db');
const imagesRoutes = require('./images.routes');
const { uploadProfile } = require("../routes/images.routes"); 
const { isAuthenticated } = require('../middleware/auth.middleware');

const router = express.Router();
//
// Register
router.post("/register", async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
      return res.status(400).send({ error: "Please fill in all fields" });
  }

  if (password.length < 6) {
      return res.status(400).send({ error: "Password must be at least 6 character long" });
  }

  try {
      // Check if the email already exists
      const checkQuery = "SELECT * FROM users WHERE email = ?";
      const [results] = await promisePool.query(checkQuery, [email]);

      if (results.length > 0) {
          return res.status(400).send({ error: "Email already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the new user
      const insertQuery = "INSERT INTO users (email, password, username) VALUES (?, ?, ?)";
      await promisePool.query(insertQuery, [email, hashedPassword, username]);

      // Store session email
      req.session.email = email;
      res.send({ message: "User registered successfully" });

  } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).send({ error: "Failed to register user" });
  }
});


// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "Please fill in all fields" });
  }

  try {
    // Fetch user from database
    const query = "SELECT * FROM users WHERE email = ?";
    const [results] = await promisePool.query(query, [email]);

    if (results.length === 0) {
      return res.status(401).send({ error: "Invalid email or password" });
    }

    const user = results[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: "Invalid email or password" });
    }

    if (!req.session) {
      console.error("Session is not initialized");
      return res.status(500).send({ error: "Session error" });
    }

    // Store user in session
    req.session.user = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    res.send({ message: "User logged in successfully", token: req.sessionID });

  } catch (error) {
    console.error("Error during login process:", error);
    return res.status(500).send({ error: "Failed to login user" });
  }
});



// Get Current User
router.get("/current-user", isAuthenticated, async (req, res) => {
  const user = req.user;

  try {
      const query = "SELECT id, email, username, created_at, profile_image FROM users WHERE id = ?";
      const [results] = await promisePool.query(query, [user.id]);

      if (results.length === 0) {
          return res.status(404).send({ error: "User not found" });
      }

      const userDetails = results[0];
      const baseUrl = process.env.BASE_URL || 'https://food-ai-server-v2.onrender.com';

      const responseData = {
          user: {
              id: userDetails.id,
              email: userDetails.email,
              username: userDetails.username,
              created_at: userDetails.created_at,
              profile_image: userDetails.profile_image
                  ? `${baseUrl}${userDetails.profile_image}`
                  : null,
          },
      };

      res.send(responseData);

  } catch (error) {
      console.error("Error retrieving user:", error);
      return res.status(500).send({ error: "Failed to retrieve user" });
  }
});


// Update Profile
router.put(
  '/update-profile',
  isAuthenticated,
  uploadProfile.single('profileImage'),
  async (req, res) => {
    const { username } = req.body;
    
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    if (!req.file && !username) {
      return res.status(400).send({ error: 'No fields to update' });
    }

    const email = req.user.email;
    const fieldsToUpdate = {};

    if (username) fieldsToUpdate.username = username;
    if (req.file) {
      fieldsToUpdate.profile_image = `/profile_images/${req.file.filename}`;
    }

    const updateFields = Object.keys(fieldsToUpdate)
      .map((key) => `${key} = ?`)
      .join(', ');
    const values = Object.values(fieldsToUpdate);
    values.push(email);

    const updateQuery = `UPDATE users SET ${updateFields} WHERE email = ?`;

    try {
      await promisePool.query(updateQuery, values);
      console.log('Profile updated successfully:', fieldsToUpdate);

      const successMessage = {
        message: 'Profile updated successfully',
        updatedFields: fieldsToUpdate,
        profileImageLink: req.file
          ? `${req.protocol}://${req.get('host')}/profile_images/${req.file.filename}`
          : null,
      };

      res.send(successMessage);
    } catch (error) {
      console.error('Error updating user profile:', error);
      return res.status(500).send({ error: 'Failed to update profile' });
    }
  }
);



// Logout route
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error logging out user:", err);
      return res.status(500).send({ error: "Failed to logout user" });
    }
    res.clearCookie("connect.sid");
    res.send({ message: "User logged out successfully" });
  });
});



router.post('/test-upload', uploadProfile.single('profileImage'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded' });
  }
  res.send({ message: 'File uploaded successfully', path: `/profile_images/${req.file.filename}` });
});

  

module.exports = router;
