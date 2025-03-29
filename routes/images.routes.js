//images.routes.js

const express = require('express');
const path = require('path');
const multer = require('multer');
const { isAuthenticated } = require('../middleware/auth.middleware');
const { promisePool } = require('../database/db');
const router = express.Router();

// Correctly serve static files
router.use('/profile_images', express.static(path.join(__dirname, 'public/profile_images')));
router.use('/images', express.static(path.join(__dirname, 'public/images')));
router.use('/recipe_images', express.static(path.join(__dirname, '../public/recipe_images')));


const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/profile_images'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
  }
});

const uploadProfile = multer({ storage: profileStorage });

// Route for profile image uploads
router.post('/upload/profile', uploadProfile.single('profileImage'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded' });
  }

  res.send({ message: 'Profile image uploaded successfully', path: `/profile_images/${req.file.filename}` });
});

// **Multer setup for recipe images**
const recipeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/recipe_images_user'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
  },
});

const uploadRecipe = multer({ storage: recipeStorage });

// Route for uploading recipe images, with authentication middleware
router.post('/upload/recipe/:recipe_id', isAuthenticated, uploadRecipe.single('recipeImage'), async (req, res) => {
  const recipeId = req.params.recipe_id;

  if (!req.file) {
    return res.status(400).send({ error: 'No file uploaded' });
  }

  const imageUrl = `/recipe_images/${req.file.filename}`;

  const query = `
    INSERT INTO user_recipe_images (recipe_id, image_url) 
    SELECT ?, ?
    WHERE NOT EXISTS (
      SELECT 1 FROM user_recipe_images 
      WHERE recipe_id = ? AND image_url = ?
    );
  `;

  try {
    const [result] = await promisePool.execute(query, [recipeId, imageUrl, recipeId, imageUrl]); // Use promisePool
    res.send({ message: 'Recipe image uploaded successfully', image_url: imageUrl });
  } catch (err) {
    console.error('Error uploading recipe image:', err);
    res.status(500).send({ error: 'Error uploading recipe image' });
  }
});


module.exports = router; // Export the router
module.exports.uploadProfile = uploadProfile; // Export the multer instance
