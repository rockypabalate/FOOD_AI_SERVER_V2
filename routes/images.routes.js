const express = require('express');
const path = require('path');
const multer = require('multer');

const router = express.Router();

// Correctly serve static files
router.use('/profile_images', express.static(path.join(__dirname, 'public/profile_images')));
router.use('/images', express.static(path.join(__dirname, 'public/images')));

// Multer setup
const profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/profile_images'); // Ensure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
  }
});

const uploadProfile = multer({ storage: profileStorage });

// Route for profile image uploads
router.post('/upload/profile', uploadProfile.single('profileImage'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded' });
  }
  res.send({ message: 'Profile image uploaded successfully', path: `/profile_images/${req.file.filename}` });
});

module.exports = router; // Export the router
module.exports.uploadProfile = uploadProfile; // Export the multer instance
