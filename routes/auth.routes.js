// auth.routes.js under the folder routes
const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../database/db");
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

  if (password.length < 1) {
    return res.status(400).send({ error: "Password must be at least 1 character long" });
  }

  const checkQuery = "SELECT * FROM users WHERE email = ?";
  db.query(checkQuery, [email], async (err, results) => {
    if (err) {
      console.error("Error checking email existence:", err);
      return res.status(500).send({ error: "Failed to register user" });
    }
    if (results.length > 0) {
      return res.status(400).send({ error: "Email already exists" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertQuery = "INSERT INTO users (email, password, username) VALUES (?, ?, ?)";

      db.query(insertQuery, [email, hashedPassword, username], (err, results) => {
        if (err) {
          console.error("Error registering user:", err);
          return res.status(500).send({ error: "Failed to register user" });
        }
        req.session.email = email;
        res.send({ message: "User registered successfully" });
      });
    } catch (error) {
      console.error("Error hashing password:", error);
      return res.status(500).send({ error: "Failed to register user" });
    }
  });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: "Please fill in all fields" });
  }

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Error retrieving user for login:", err);
      return res.status(500).send({ error: "Failed to login user" });
    }

    if (results.length === 0) {
      return res.status(401).send({ error: "Invalid email or password" });
    }

    const user = results[0];

    try {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).send({ error: "Invalid email or password" });
      }

      req.session.email = email;
      res.send({ message: "User logged in successfully", token: req.sessionID });
    } catch (error) {
      console.error("Error during login process:", error);
      return res.status(500).send({ error: "Failed to login user" });
    }
  });
});

// Get Current User
router.get("/current-user", isAuthenticated, (req, res) => {
  // At this point, the middleware has already validated the session and attached user data to req.user
  const user = req.user;

  const query = "SELECT * FROM users WHERE id = ?";
  db.query(query, [user.id], (err, results) => {
    if (err) {
      console.error("Error retrieving user:", err);
      return res.status(500).send({ error: "Failed to retrieve user" });
    }

    if (results.length === 0) {
      return res.status(404).send({ error: "User not found" });
    }

    const userDetails = results[0];

    // Modify the profile_image URL as per the requirement
    const baseUrl = process.env.BASE_URL || 'http://192.168.195.245:6000';

    // Construct the responseData object
    const responseData = {
      user: {
        id: userDetails.id,
        email: userDetails.email,
        username: userDetails.username,
        created_at: userDetails.created_at,
        profile_image: userDetails.profile_image
          ? `${baseUrl}${userDetails.profile_image}`
          : null,
        bio: userDetails.bio,
        favorite_recipe: userDetails.favorite_recipe,
        dietary_preference: userDetails.dietary_preference,
        address: userDetails.address,
        role: userDetails.role,
      },
    };

    // Send the structured response
    res.send(responseData);
  });
});



router.put(
  '/update-profile',
  isAuthenticated, // Check if the user is authenticated
  uploadProfile.single('profileImage'), // Multer middleware for file uploads
  (req, res) => {
    const { username, bio, favorite_recipe, address, dietary_preference, role } = req.body;

    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    if (!req.file) {
      console.warn('No file was uploaded');
    }

    const email = req.user.email;

    const fieldsToUpdate = {};

    if (username) fieldsToUpdate.username = username;
    if (bio) fieldsToUpdate.bio = bio;
    if (favorite_recipe) fieldsToUpdate.favorite_recipe = favorite_recipe;
    if (address) fieldsToUpdate.address = address;
    if (dietary_preference) fieldsToUpdate.dietary_preference = dietary_preference;
    if (role) fieldsToUpdate.role = role;

    if (req.file) {
      fieldsToUpdate.profile_image = `/profile_images/${req.file.filename}`;
    }

    if (Object.keys(fieldsToUpdate).length === 0) {
      return res.status(400).send({ error: 'No fields to update' });
    }

    const updateFields = Object.keys(fieldsToUpdate)
      .map((key) => `${key} = ?`)
      .join(', ');
    const values = Object.values(fieldsToUpdate);
    values.push(email);

    const updateQuery = `UPDATE users SET ${updateFields} WHERE email = ?`;

    db.query(updateQuery, values, (err) => {
      if (err) {
        console.error('Error updating user profile:', err);
        return res.status(500).send({ error: 'Failed to update profile' });
      }

      console.log('Profile updated successfully:');
      console.log(`Updated Fields: ${JSON.stringify(fieldsToUpdate)}`);

      const successMessage = {
        message: 'Profile updated successfully',
        updatedFields: fieldsToUpdate,
        profileImageLink: req.file
          ? `${req.protocol}://${req.get('host')}/profile_images/${req.file.filename}`
          : null,
      };

      console.log('Debug Response:', successMessage);

      res.send(successMessage);
    });
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
