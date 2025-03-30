const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth.middleware');
const { promisePool } = require('../database/db');


router.get('/recipe-name-search', async (req, res) => {
  const { food_name } = req.query;

  // Validate the input
  if (!food_name || typeof food_name !== 'string') {
    return res.status(400).json({ error: "Invalid or missing 'food_name' query parameter" });
  }

  const searchQuery = `
    SELECT 
      fi.id AS food_id,
      fi.food_name,
      fi.description,
      fi.category
    FROM food_information fi
    WHERE fi.food_name LIKE ?
    GROUP BY fi.id;
  `;

  const searchTerm = `%${food_name}%`; // Use wildcard for partial matches

  try {
    // Use promise-based query execution
    const [searchResults] = await promisePool.query(searchQuery, [searchTerm]);

    if (searchResults.length === 0) {
      return res.status(404).json({ error: "No food items found matching the search criteria" });
    }

    // Map results to include category in the response
    const formattedResults = searchResults.map(food => ({
      id: food.food_id,
      food_name: food.food_name,
      description: food.description,
      category: food.category || null,
    }));

    res.json(formattedResults);
  } catch (error) {
    console.error("Error searching food information:", error);
    res.status(500).json({ error: "Database error while searching food information" });
  }
});


  

router.get('/all', async (req, res) => {
  try {
      // Fetch all food information first
      const foodQuery = `
          SELECT 
              fi.id AS food_id,
              fi.food_name,
              fi.description,
              fi.serving_size,
              fi.total_cook_time,
              fi.difficulty,
              fi.category,
              fi.views,
              fi.likes,
              fi.preparation_tips,
              fi.nutritional_paragraph,
              fi.author, 
              fi.recipe_featured,
              GROUP_CONCAT(DISTINCT ri.ingredient_name SEPARATOR ', ') AS ingredients,
              GROUP_CONCAT(DISTINCT ri.quantity SEPARATOR ', ') AS ingredient_quantities,
              GROUP_CONCAT(DISTINCT ci.step_number, '. ', ci.instruction SEPARATOR ' | ') AS instructions,
              GROUP_CONCAT(DISTINCT nc.nutrient_name, ': ', nc.amount SEPARATOR ', ') AS nutritional_content
          FROM food_information fi
          LEFT JOIN recipe_ingredients ri ON fi.id = ri.food_id
          LEFT JOIN cooking_instructions ci ON fi.id = ci.food_id
          LEFT JOIN nutritional_content nc ON fi.id = nc.food_id
          GROUP BY fi.id;
      `;

      const [foodResults] = await promisePool.query(foodQuery);

      if (foodResults.length === 0) {
          return res.status(404).json({ error: "No food information found" });
      }

      // Fetch images separately
      const imageQuery = `SELECT food_id, image_url, caption FROM food_images`;
      const [imageResults] = await promisePool.query(imageQuery);

      // Group images by food_id
      const foodImagesMap = {};
      imageResults.forEach(image => {
          if (!foodImagesMap[image.food_id]) {
              foodImagesMap[image.food_id] = [];
          }
          foodImagesMap[image.food_id].push({
              image_url: `https://food-ai-server-v2.onrender.com${image.image_url}`,
              caption: image.caption || null
          });
      });

      // Format response
      const formattedResults = foodResults.map(food => ({
          id: food.food_id,
          food_name: food.food_name,
          description: food.description,
          serving_size: food.serving_size,
          total_cook_time: food.total_cook_time || null,
          difficulty: food.difficulty || null,
          category: food.category || null,
          views: food.views || 0,
          likes: food.likes || 0,
          preparation_tips: food.preparation_tips || null,
          nutritional_paragraph: food.nutritional_paragraph || null,
          author: food.author || null,
          recipe_featured: food.recipe_featured || '0',
          ingredients: food.ingredients ? food.ingredients.split(', ') : [],
          ingredient_quantities: food.ingredient_quantities ? food.ingredient_quantities.split(', ') : [],
          instructions: food.instructions ? food.instructions.split(' | ') : [],
          nutritional_content: food.nutritional_content ? food.nutritional_content.split(', ') : [],
          images: foodImagesMap[food.food_id] || [] // Return array of images
      }));

      res.json(formattedResults);
  } catch (error) {
      console.error("Error fetching all food information:", error);
      res.status(500).json({ error: "Database error" });
  }
});

  // Route to get food info by ID
router.get('/get-recipe/:id', async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id, 10))) {
    return res.status(400).json({ error: "Invalid or missing food ID" });
  }

  const foodId = parseInt(id, 10);

  const foodQuery = `
    SELECT 
      fi.id AS food_id,
      fi.food_name,
      fi.description,
      fi.serving_size,
      fi.total_cook_time,
      fi.difficulty,
      fi.category,
      fi.views,
      fi.likes,
      fi.preparation_tips,
      fi.nutritional_paragraph,
      fi.author,
      fi.recipe_featured,
      GROUP_CONCAT(DISTINCT ri.ingredient_name SEPARATOR ', ') AS ingredients,
      GROUP_CONCAT(DISTINCT ri.quantity SEPARATOR ', ') AS ingredient_quantities,
      GROUP_CONCAT(DISTINCT ci.step_number, '. ', ci.instruction SEPARATOR ' | ') AS instructions,
      GROUP_CONCAT(DISTINCT nc.nutrient_name, ': ', nc.amount SEPARATOR ', ') AS nutritional_content
    FROM food_information fi
    LEFT JOIN recipe_ingredients ri ON fi.id = ri.food_id
    LEFT JOIN cooking_instructions ci ON fi.id = ci.food_id
    LEFT JOIN nutritional_content nc ON fi.id = nc.food_id
    WHERE fi.id = ?
    GROUP BY fi.id;
  `;

  const imageQuery = `SELECT image_url, caption FROM food_images WHERE food_id = ?`;

  try {
    // Fetch food information
    const [foodResults] = await promisePool.query(foodQuery, [foodId]);

    if (foodResults.length === 0) {
      return res.status(404).json({ error: "Food not found" });
    }

    const food = foodResults[0];

    // Fetch food images
    const [imageResults] = await promisePool.query(imageQuery, [foodId]);

    const formattedResult = {
      id: food.food_id,
      food_name: food.food_name,
      description: food.description,
      serving_size: food.serving_size,
      total_cook_time: food.total_cook_time || null,
      difficulty: food.difficulty || null,
      category: food.category || null,
      views: food.views || 0,
      likes: food.likes || 0,
      preparation_tips: food.preparation_tips || null,
      nutritional_paragraph: food.nutritional_paragraph || null,
      author: food.author || null,
      recipe_featured: food.recipe_featured || '0',
      ingredients: food.ingredients ? food.ingredients.split(', ') : [],
      ingredient_quantities: food.ingredient_quantities ? food.ingredient_quantities.split(', ') : [],
      instructions: food.instructions ? food.instructions.split(' | ') : [],
      nutritional_content: food.nutritional_content ? food.nutritional_content.split(', ') : [],
      images: imageResults.map(img => ({
        image_url: `https://food-ai-server-v2.onrender.com${img.image_url}`,
        caption: img.caption || null
      }))
    };

    res.json(formattedResult);
  } catch (error) {
    console.error("Error fetching food information:", error);
    res.status(500).json({ error: "Database error while fetching food information" });
  }
});

  

// Save food route
router.post("/save-recipe", isAuthenticated, async (req, res) => {
  const { foodId } = req.query; // Get foodId from query parameters

  if (!foodId || isNaN(parseInt(foodId, 10))) {
    return res.status(400).json({ error: "Invalid or missing food ID" });
  }

  const userId = req.user.id;
  const parsedFoodId = parseInt(foodId, 10);

  try {
    // Check if the food exists in the food_information table
    const [foodResults] = await promisePool.query("SELECT * FROM food_information WHERE id = ?", [parsedFoodId]);

    if (foodResults.length === 0) {
      return res.status(404).json({ error: "Food not found" });
    }

    // Check if the food is already saved by the user
    const [savedFoodResults] = await promisePool.query(
      "SELECT * FROM user_saved_foods WHERE user_id = ? AND food_id = ?",
      [userId, parsedFoodId]
    );

    if (savedFoodResults.length > 0) {
      return res.status(409).json({ message: "Recipe already saved" }); // Use 409 for conflict
    }

    // Save food to user's saved recipes
    await promisePool.query("INSERT INTO user_saved_foods (user_id, food_id) VALUES (?, ?)", [userId, parsedFoodId]);

    res.status(201).json({ message: "Food saved successfully" }); // Use 201 for resource creation
  } catch (error) {
    console.error("Error saving food:", error);
    res.status(500).json({ error: "Database error while saving food" });
  }
});


router.get("/saved-by-user", isAuthenticated, async (req, res) => {
  const userId = req.user.id;

  const savedFoodsQuery = `
    SELECT 
      fi.id AS food_id, 
      fi.food_name, 
      fi.likes, 
      fi.views, 
      fi.total_cook_time, 
      fi.difficulty, 
      fi.author
    FROM user_saved_foods sr
    JOIN food_information fi ON sr.food_id = fi.id
    WHERE sr.user_id = ?;
  `;

  try {
    // Fetch saved foods
    const [savedFoodsResults] = await promisePool.query(savedFoodsQuery, [userId]);

    if (savedFoodsResults.length === 0) {
      return res.status(404).json({ error: "No saved foods found" });
    }

    const foodIds = savedFoodsResults.map(food => food.food_id);

    if (foodIds.length === 0) {
      return res.json([]); // Return an empty array if there are no saved foods
    }

    // Query for one image per saved food item
    const imageQuery = `
      SELECT food_id, image_url, caption 
      FROM food_images 
      WHERE food_id IN (?) 
      GROUP BY food_id;
    `;
    
    const [imageResults] = await promisePool.query(imageQuery, [foodIds]);

    // Map images by food_id for easier access
    const imagesByFoodId = imageResults.reduce((acc, image) => {
      acc[image.food_id] = {
        image_url: `https://food-ai-server-v2.onrender.com${image.image_url}`,
        caption: image.caption || null
      };
      return acc;
    }, {});

    // Attach a single image to each saved food item
    const formattedResults = savedFoodsResults.map(food => ({
      id: food.food_id,
      food_name: food.food_name,
      likes: food.likes || 0,
      views: food.views || 0,
      total_cook_time: food.total_cook_time || null,
      difficulty: food.difficulty || null,
      author: food.author || null,
      image: imagesByFoodId[food.food_id] || null
    }));

    res.json(formattedResults);
  } catch (error) {
    console.error("Error fetching saved foods:", error);
    res.status(500).json({ error: "Database error while fetching saved foods" });
  }
});

  
  
router.delete("/delete", isAuthenticated, async (req, res) => {
  const { foodId } = req.query;
  const userId = req.user.id;

  if (!foodId) {
    return res.status(400).json({ error: "Food ID is required" });
  }

  const deleteQuery = "DELETE FROM user_saved_foods WHERE user_id = ? AND food_id = ?";

  try {
    const [result] = await promisePool.query(deleteQuery, [userId, foodId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Food not found in saved recipes" });
    }

    res.json({ message: "Food deleted successfully" });
  } catch (error) {
    console.error("Error deleting saved food:", error);
    res.status(500).json({ error: "Database error while deleting saved food" });
  }
});


router.put('/increment-views/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // The user ID from the authenticated session

  if (!id || isNaN(parseInt(id, 10))) {
      return res.status(400).json({ error: "Invalid or missing recipe ID" });
  }

  const foodId = parseInt(id, 10);

  try {
      // Check if the user has already viewed the food item
      const checkViewQuery = `
          SELECT * FROM food_views 
          WHERE user_id = ? AND food_id = ?
      `;
      const [results] = await promisePool.query(checkViewQuery, [userId, foodId]);

      if (results.length > 0) {
          // User has already viewed the food item
          return res.status(400).json({ message: "Already viewed" });
      }

      // Increment the views in food_information table
      const incrementViewsQuery = `
          UPDATE food_information 
          SET views = views + 1 
          WHERE id = ?
      `;
      const [updateResult] = await promisePool.query(incrementViewsQuery, [foodId]);

      if (updateResult.affectedRows === 0) {
          return res.status(404).json({ error: "Food item not found" });
      }

      // Add record to food_views table to track user view
      const addViewRecordQuery = `
          INSERT INTO food_views (user_id, food_id) 
          VALUES (?, ?)
      `;
      await promisePool.query(addViewRecordQuery, [userId, foodId]);

      res.json({ message: "Views updated successfully" });

  } catch (error) {
      console.error("Error updating views:", error);
      res.status(500).json({ error: "Database error while updating views" });
  }
});


    router.put('/increment-likes/:id', isAuthenticated, async (req, res) => {
      const { id } = req.params;
      const userId = req.user.id; // The user ID from the authenticated session

      if (!id || isNaN(parseInt(id, 10))) {
          return res.status(400).send({ error: "Invalid or missing food item ID" });
      }

      const foodId = parseInt(id, 10);

      // Get a connection for transaction handling
      const connection = await promisePool.getConnection();

      try {
          await connection.beginTransaction(); // Start transaction

          // Check if the user has already liked the food item
          const checkLikeQuery = `
              SELECT * FROM food_likes 
              WHERE user_id = ? AND food_id = ?
          `;
          const [likeResults] = await connection.query(checkLikeQuery, [userId, foodId]);

          if (likeResults.length > 0) {
              console.log("User has already liked this food item.");
              await connection.rollback();
              return res.status(400).send({ message: "Already liked" });
          }

          // If not already liked, increment the likes in food_information table
          const incrementLikesQuery = `
              UPDATE food_information 
              SET likes = likes + 1 
              WHERE id = ?
          `;
          const [updateResult] = await connection.query(incrementLikesQuery, [foodId]);

          // Ensure the update actually modified the row (check if affectedRows > 0)
          if (updateResult.affectedRows === 0) {
              await connection.rollback();
              return res.status(404).send({ error: "Food item not found" });
          }

          // Add record to food_likes table to track user like
          const addLikeRecordQuery = `
              INSERT INTO food_likes (user_id, food_id) 
              VALUES (?, ?)
          `;
          await connection.query(addLikeRecordQuery, [userId, foodId]);

          // Commit transaction if everything is successful
          await connection.commit();
          res.send({ message: "Likes updated successfully" });

      } catch (error) {
          console.error("Error processing like:", error);
          await connection.rollback(); // Rollback transaction on error
          res.status(500).send({ error: "Database error while processing like" });

      } finally {
          connection.release(); // Release the connection
      }
    });



// Optional: Fetch views and likes for a recipe
router.get('/stats/:id', async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id, 10))) {
      return res.status(400).send({ error: "Invalid or missing recipe ID" });
  }

  const query = `SELECT views, likes FROM food_information WHERE id = ?`;

  try {
      const [result] = await promisePool.query(query, [parseInt(id, 10)]);

      if (result.length === 0) {
          return res.status(404).send({ error: "Recipe not found" });
      }

      res.send(result[0]);
  } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).send({ error: "Error fetching stats" });
  }
});





// Route to create a new recipe by a user
router.post('/user-recipe/create-recipe', isAuthenticated, async (req, res) => {
  const { 
      food_name, 
      description, 
      servings, 
      category, 
      ingredients, 
      quantities, 
      instructions, 
      total_cook_time,          
      difficulty,               
      preparation_tips,         
      nutritional_paragraph    
  } = req.body;

  // Validate required input data
  if (!food_name || !description || !ingredients || !quantities || !instructions || 
      !total_cook_time || !difficulty || !preparation_tips) {
      return res.status(400).send({ error: "Required fields are missing" });
  }

  // User ID (from the authenticated user)
  const userId = req.user.id;

  // Step 1: Insert the new recipe into the user_recipes table
  const recipeQuery = `
      INSERT INTO user_recipes 
      (user_id, food_name, description, servings, category, total_cook_time, difficulty, preparation_tips, nutritional_paragraph)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
      const [recipeResult] = await promisePool.query(recipeQuery, [
          userId, 
          food_name, 
          description, 
          servings, 
          category, 
          total_cook_time, 
          difficulty, 
          preparation_tips, 
          nutritional_paragraph ?? '' // Default to empty string if not provided
      ]);

      const recipeId = recipeResult.insertId;

      // Step 2: Insert ingredients for the new recipe
      const ingredientQueries = ingredients.map((ingredient, index) => {
          const ingredientQuery = `
              INSERT INTO user_recipe_ingredients (recipe_id, ingredient_name, quantity)
              VALUES (?, ?, ?)
          `;
          return promisePool.query(ingredientQuery, [recipeId, ingredient, quantities[index]]);
      });

      // Step 3: Insert cooking instructions for the new recipe
      const instructionQueries = instructions.map((instruction, index) => {
          const instructionQuery = `
              INSERT INTO user_cooking_instructions (recipe_id, step_number, instruction)
              VALUES (?, ?, ?)
          `;
          return promisePool.query(instructionQuery, [recipeId, index + 1, instruction]);
      });

      // Step 4: Wait for all database operations to finish
      await Promise.all([...ingredientQueries, ...instructionQueries]);

      // After all data is inserted, send the response with the full recipe details
      res.send({
          message: "Recipe created successfully",
          recipe: {
              id: recipeId, // Include the recipe ID in the response
              food_name: food_name,
              description: description,
              servings: servings,
              category: category,
              ingredients: ingredients,
              quantities: quantities,
              instructions: instructions,
              total_cook_time: total_cook_time,
              difficulty: difficulty,
              preparation_tips: preparation_tips,
              nutritional_paragraph: nutritional_paragraph ?? '' // Return empty if not provided
          }
      });

  } catch (error) {
      console.error("Error inserting recipe data:", error);
      res.status(500).send({ error: "Error inserting recipe data" });
  }
});



router.get('/user-recipe/all', isAuthenticated, async (req, res) => {
  const userId = req.user.id; // Assuming `req.user` contains the authenticated user's information

  const query = `
      SELECT 
          ur.id AS recipe_id,
          ur.food_name,
          ur.description,
          ur.total_cook_time,
          ur.difficulty,
          GROUP_CONCAT(uri.image_url SEPARATOR ', ') AS images
      FROM user_recipes ur
      LEFT JOIN user_recipe_images uri ON ur.id = uri.recipe_id
      WHERE ur.user_id = ?
      GROUP BY ur.id;
  `;

  try {
      const [recipes] = await promisePool.query(query, [userId]);

      if (recipes.length === 0) {
          return res.status(404).send({ error: "No recipes found for this user" });
      }

      const formattedRecipes = recipes.map(recipe => ({
          recipe_id: recipe.recipe_id,
          food_name: recipe.food_name,
          description: recipe.description,
          total_cook_time: recipe.total_cook_time || null,
          difficulty: recipe.difficulty || null,
          images: recipe.images 
              ? recipe.images.split(', ').map(img => `https://food-ai-server-v2.onrender.com${img}`) 
              : [] // Format images with base URL
      }));

      res.send(formattedRecipes);
  } catch (err) {
      console.error("Error fetching user's recipes:", err);
      res.status(500).send({ error: "Error fetching user's recipes" });
  }
});




router.get('/user-recipe/single-recipe/:id', isAuthenticated, async (req, res) => {
  const recipeId = req.params.id;
  const userId = req.user.id;

  const query = `
      SELECT 
          ur.id AS id, 
          ur.food_name,
          ur.description,
          ur.servings,
          ur.category,
          ur.total_cook_time,
          ur.difficulty,
          ur.preparation_tips,
          ur.nutritional_paragraph,
          GROUP_CONCAT(DISTINCT CONCAT('{ "name": "', uri.ingredient_name, '", "quantity": "', uri.quantity, '" }') SEPARATOR ', ') AS ingredients,
          GROUP_CONCAT(DISTINCT CONCAT('{ "step_number": "', uci.step_number, '", "instruction": "', uci.instruction, '" }') SEPARATOR ', ') AS instructions,
          GROUP_CONCAT(DISTINCT urimg.image_url SEPARATOR ', ') AS images
      FROM user_recipes ur
      LEFT JOIN user_recipe_ingredients uri ON ur.id = uri.recipe_id
      LEFT JOIN user_cooking_instructions uci ON ur.id = uci.recipe_id
      LEFT JOIN user_recipe_images urimg ON ur.id = urimg.recipe_id
      WHERE ur.id = ? AND ur.user_id = ?
      GROUP BY ur.id;
  `;

  try {
      const [results] = await promisePool.query(query, [recipeId, userId]);

      if (results.length === 0) {
          return res.status(404).send({ error: "Recipe not found or not authorized" });
      }

      const recipe = results[0];

      // ✅ Parse manually formatted JSON-like strings
      const formattedRecipe = {
          id: recipe.id,
          food_name: recipe.food_name,
          description: recipe.description,
          servings: parseInt(recipe.servings, 10) || 0,
          category: recipe.category,
          ingredients: recipe.ingredients ? JSON.parse(`[${recipe.ingredients}]`) : [],
          instructions: recipe.instructions
              ? JSON.parse(`[${recipe.instructions}]`).map(instr => `${instr.step_number}. ${instr.instruction}`)
              : [],
          total_cook_time: recipe.total_cook_time,
          difficulty: recipe.difficulty,
          preparation_tips: recipe.preparation_tips,
          nutritional_paragraph: recipe.nutritional_paragraph,
          images: recipe.images
              ? recipe.images.split(', ').map(img => `https://food-ai-server-v2.onrender.com${img}`)
              : []
      };

      res.send(formattedRecipe);
  } catch (err) {
      console.error("Error fetching the recipe:", err);
      res.status(500).send({ error: "Error fetching the recipe" });
  }
});




// Route to search recipes by food name for the authenticated user
router.get('/user-recipe/search-recipes', isAuthenticated, async (req, res) => {
  const userId = req.user.id; // Authenticated user's ID
  const { food_name } = req.query; // Extract the search term from query parameters

  // Validate that a search term is provided
  if (!food_name) {
      return res.status(400).send({ error: "Food name is required for searching" });
  }

  // SQL query to search recipes by food name for the authenticated user
  const query = `
      SELECT 
          ur.id AS recipe_id,
          ur.food_name,
          ur.description,
          ur.total_cook_time,
          ur.difficulty,
          (SELECT GROUP_CONCAT(image_url SEPARATOR ', ') 
           FROM user_recipe_images 
           WHERE recipe_id = ur.id) AS images
      FROM user_recipes ur
      WHERE ur.user_id = ? AND ur.food_name LIKE ?
  `;

  // Use a wildcard search for the food name
  const searchTerm = `%${food_name}%`;

  try {
      // Execute the query using promisePool
      const [recipes] = await promisePool.query(query, [userId, searchTerm]);

      if (recipes.length === 0) {
          return res.status(404).send({ error: "No recipes found matching the search term" });
      }

      // Format the results before sending the response
      const formattedRecipes = recipes.map(recipe => ({
          recipe_id: recipe.recipe_id,
          food_name: recipe.food_name,
          description: recipe.description,
          total_cook_time: recipe.total_cook_time,
          difficulty: recipe.difficulty,
          images: recipe.images ? recipe.images.split(', ') : [] // Include the images in the response
      }));

      // Send the formatted results
      res.send(formattedRecipes);
  } catch (err) {
      console.error("Error searching for recipes:", err);
      res.status(500).send({ error: "Error searching for recipes" });
  }
});

// Route to delete a recipe created by the authenticated user
router.delete('/user-recipe/delete-recipe/:id', isAuthenticated, async (req, res) => {
  const recipeId = req.params.id; // Get the recipe ID from the route parameter
  const userId = req.user.id; // Get the authenticated user's ID

  try {
      // Check if the recipe exists and belongs to the user
      const checkQuery = `SELECT id FROM user_recipes WHERE id = ? AND user_id = ?`;
      const [results] = await promisePool.query(checkQuery, [recipeId, userId]);

      if (results.length === 0) {
          return res.status(404).send({ error: "Recipe not found or not authorized to delete" });
      }

      // Delete the recipe and all related data
      const deleteQueries = [
          `DELETE FROM user_recipe_ingredients WHERE recipe_id = ?`,
          `DELETE FROM user_cooking_instructions WHERE recipe_id = ?`,
          `DELETE FROM user_recipe_images WHERE recipe_id = ?`,
          `DELETE FROM user_recipes WHERE id = ?`
      ];

      // Execute delete queries in sequence using promisePool
      for (const query of deleteQueries) {
          await promisePool.query(query, [recipeId]);
      }

      res.send({ message: "Recipe deleted successfully" });

  } catch (err) {
      console.error("Error deleting recipe data:", err);
      res.status(500).send({ error: "Error deleting recipe data" });
  }
});


// Export the router
module.exports = router;
