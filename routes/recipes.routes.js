const express = require('express');
const router = express.Router();
const db = require('../database/db');
const { isAuthenticated } = require('../middleware/auth.middleware');
const { promisePool } = require('../database/db');


router.get('/recipe-name-search', (req, res) => {
  const { food_name } = req.query;

  // Validate the input
  if (!food_name || typeof food_name !== 'string') {
    return res.status(400).send({ error: "Invalid or missing 'food_name' query parameter" });
  }

  const searchQuery = `
    SELECT 
      fi.id AS food_id,
      fi.food_name,
      fi.description,
      fi.category -- Include category in the query
    FROM food_information fi
    WHERE fi.food_name LIKE ?
    GROUP BY fi.id;
  `;

  const searchTerm = `%${food_name}%`; // Use wildcard for partial matches

  db.query(searchQuery, [searchTerm], (err, searchResults) => {
    if (err) {
      console.error("Error searching food information:", err);
      return res.status(500).send({ error: "Error searching food information" });
    }

    if (searchResults.length === 0) {
      return res.status(404).send({ error: "No food items found matching the search criteria" });
    }

    // Map results to include category in the response
    const formattedResults = searchResults.map(food => ({
      id: food.food_id,
      food_name: food.food_name,
      description: food.description,
      category: food.category || null, // Include category or null if not available
    }));

    res.send(formattedResults);
  });
});

  

    router.get('/all', async (req, res) => {
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
          GROUP_CONCAT(DISTINCT nc.nutrient_name, ': ', nc.amount SEPARATOR ', ') AS nutritional_content,
          fi_img.image_url,
          fi_img.caption
        FROM food_information fi
        LEFT JOIN recipe_ingredients ri ON fi.id = ri.food_id
        LEFT JOIN cooking_instructions ci ON fi.id = ci.food_id
        LEFT JOIN nutritional_content nc ON fi.id = nc.food_id
        LEFT JOIN food_images fi_img ON fi.id = fi_img.food_id
        GROUP BY fi.id;
      `;

      try {
        // Use promise-based query execution
        const [foodResults] = await promisePool.query(foodQuery);

        if (foodResults.length === 0) {
          return res.status(404).json({ error: "No food information found" });
        }

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
          image_url: food.image_url ? `https://food-ai-server-v2.onrender.com${food.image_url}` : null,
          caption: food.caption || null
        }));

        res.json(formattedResults);
      } catch (error) {
        console.error("Error fetching all food information:", error);
        res.status(500).json({ error: "Database error" });
      }
    });

    module.exports = router;
  


  // Route to get food info by ID
  router.get('/get-recipe/:id', (req, res) => {
      const { id } = req.params;
    
      if (!id || isNaN(parseInt(id, 10))) {
        return res.status(400).send({ error: "Invalid or missing food ID" });
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
          fi.author, -- Include the author column
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
    
      db.query(foodQuery, [foodId], (err, foodResults) => {
        if (err) {
          console.error("Error fetching food information:", err);
          return res.status(500).send({ error: "Error fetching food information" });
        }
    
        if (foodResults.length === 0) {
          return res.status(404).send({ error: "Food not found" });
        }
    
        const food = foodResults[0];
    
        const imageQuery = `SELECT image_url, caption FROM food_images WHERE food_id = ?`;
        db.query(imageQuery, [foodId], (err, imageResults) => {
          if (err) {
            console.error("Error fetching food images:", err);
            return res.status(500).send({ error: "Error fetching food images" });
          }
    
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
            author: food.author || null, // Add author to the response
            recipe_featured: food.recipe_featured || '0',
            ingredients: food.ingredients ? food.ingredients.split(', ') : [],
            ingredient_quantities: food.ingredient_quantities ? food.ingredient_quantities.split(', ') : [],
            instructions: food.instructions ? food.instructions.split(' | ') : [],
            nutritional_content: food.nutritional_content ? food.nutritional_content.split(', ') : [],
            images: imageResults.map(img => ({
              image_url: `http://192.168.111.245:6000${img.image_url}`,
              caption: img.caption || null
            }))
          };
    
          res.send(formattedResult);
        });
      });
    });
  

// Save food route
router.post("/save-recipe", isAuthenticated, (req, res) => {
    const { foodId } = req.query; // Get foodId from query parameters
  
    if (!foodId || isNaN(parseInt(foodId, 10))) {
      return res.status(400).send({ error: "Invalid or missing food ID" });
    }
  
    const userId = req.user.id;
  
    // Check if the food exists in the food_information table
    const foodQuery = "SELECT * FROM food_information WHERE id = ?";
    db.query(foodQuery, [foodId], (err, foodResults) => {
      if (err) {
        console.error("Error fetching food information:", err);
        return res.status(500).send({ error: "Error fetching food information" });
      }
  
      if (foodResults.length === 0) {
        return res.status(404).send({ error: "Food not found" });
      }
  
      // Check if the food is already saved by the user
      const checkSavedFoodQuery = "SELECT * FROM user_saved_foods WHERE user_id = ? AND food_id = ?";
      db.query(checkSavedFoodQuery, [userId, foodId], (err, savedFoodResults) => {
        if (err) {
          console.error("Error checking saved food:", err);
          return res.status(500).send({ error: "Error checking saved food" });
        }
  
        if (savedFoodResults.length > 0) {
          return res.status(409).send({ message: "Recipe already saved" }); // Use 409 for conflict
        }
  
        // Save food to user's saved recipes
        const saveFoodQuery = "INSERT INTO user_saved_foods (user_id, food_id) VALUES (?, ?)";
        db.query(saveFoodQuery, [userId, foodId], (err) => {
          if (err) {
            console.error("Error saving food:", err);
            return res.status(500).send({ error: "Error saving food" });
          }
  
          res.status(201).send({ message: "Food saved successfully" }); // Use 201 for resource creation
        });
      });
    });
  });
  

  router.get("/saved-by-user", isAuthenticated, (req, res) => {
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
  
    db.query(savedFoodsQuery, [userId], (err, savedFoodsResults) => {
      if (err) {
        console.error("Error fetching saved foods:", err);
        return res.status(500).send({ error: "Error fetching saved foods" });
      }
  
      if (savedFoodsResults.length === 0) {
        return res.status(404).send({ error: "No saved foods found" });
      }
  
      const foodIds = savedFoodsResults.map(food => food.food_id);
  
      // Query for one image per saved food item
      const imageQuery = `
        SELECT food_id, image_url, caption 
        FROM food_images 
        WHERE food_id IN (?) 
        GROUP BY food_id;
      `;
      db.query(imageQuery, [foodIds], (err, imageResults) => {
        if (err) {
          console.error("Error fetching food images:", err);
          return res.status(500).send({ error: "Error fetching food images" });
        }
  
        // Map images by food_id for easier access
        const imagesByFoodId = imageResults.reduce((acc, image) => {
          acc[image.food_id] = {
            image_url: `http://192.168.111.245:6000${image.image_url}`,
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
  
        res.send(formattedResults);
      });
    });
  });
  

  
  
router.delete("/delete",isAuthenticated, (req, res) => {
    const { foodId } = req.query;
    const userId = req.user.id;
  
    if (!foodId) {
      return res.status(400).send({ error: "Food ID is required" });
    }
  
    const deleteQuery = "DELETE FROM user_saved_foods WHERE user_id = ? AND food_id = ?";
    db.query(deleteQuery, [userId, foodId], (err, result) => {
      if (err) {
        console.error("Error deleting saved food:", err);
        return res.status(500).send({ error: "Error deleting saved food" });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).send({ error: "Food not found in saved recipes" });
      }
  
      res.send({ message: "Food deleted successfully" });
    });
  });

router.put('/increment-views/:id', isAuthenticated, (req, res) => {
    const { id } = req.params;
    const userId = req.user.id; // The user ID from the authenticated session

    if (!id || isNaN(parseInt(id, 10))) {
        return res.status(400).send({ error: "Invalid or missing recipe ID" });
    }

    const foodId = parseInt(id, 10);

    // Check if the user has already viewed the food item
    const checkViewQuery = `
        SELECT * FROM food_views 
        WHERE user_id = ? AND food_id = ?
    `;

    db.query(checkViewQuery, [userId, foodId], (err, results) => {
        if (err) {
            console.error("Error checking views:", err);
            return res.status(500).send({ error: "Error checking if food item is already viewed" });
        }

        if (results.length > 0) {
            // User has already viewed the food item
            return res.status(400).send({ message: "Already viewed" });
        }

        // Increment the views in food_information table
        const incrementViewsQuery = `
            UPDATE food_information 
            SET views = views + 1 
            WHERE id = ?
        `;

        const addViewRecordQuery = `
            INSERT INTO food_views (user_id, food_id) 
            VALUES (?, ?)
        `;

        db.query(incrementViewsQuery, [foodId], (err, updateResult) => {
            if (err) {
                console.error("Error updating views:", err);
                return res.status(500).send({ error: "Error incrementing food item views" });
            }

            if (updateResult.affectedRows === 0) {
                return res.status(404).send({ error: "Food item not found" });
            }

            // Add record to food_views table to track user view
            db.query(addViewRecordQuery, [userId, foodId], (err) => {
                if (err) {
                    console.error("Error adding view record:", err);
                    return res.status(500).send({ error: "Error recording the view" });
                }

                res.send({ message: "Views updated successfully" });
            });
        });
    });
});

router.put('/increment-likes/:id', isAuthenticated, (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; // The user ID from the authenticated session

  if (!id || isNaN(parseInt(id, 10))) {
      return res.status(400).send({ error: "Invalid or missing food item ID" });
  }

  const foodId = parseInt(id, 10);

  // Start a transaction
  db.beginTransaction((err) => {
      if (err) {
          console.error("Error starting transaction:", err);
          return res.status(500).send({ error: "Error starting transaction" });
      }

      // Check if the user has already liked the food item
      const checkLikeQuery = `
          SELECT * FROM food_likes 
          WHERE user_id = ? AND food_id = ?
      `;

      db.query(checkLikeQuery, [userId, foodId], (err, results) => {
          if (err) {
              console.error("Error checking likes:", err);
              return db.rollback(() => {
                  res.status(500).send({ error: "Error checking if food item is already liked" });
              });
          }

          // If results exist, it means the user has already liked this food item
          if (results.length > 0) {
              console.log("User has already liked this food item.");
              return db.rollback(() => {
                  res.status(400).send({ message: "Already liked" });
              });
          }

          // If not already liked, increment the likes in food_information table
          const incrementLikesQuery = `
              UPDATE food_information 
              SET likes = likes + 1 
              WHERE id = ?
          `;

          db.query(incrementLikesQuery, [foodId], (err, updateResult) => {
              if (err) {
                  console.error("Error updating likes:", err);
                  return db.rollback(() => {
                      res.status(500).send({ error: "Error incrementing food item likes" });
                  });
              }

              // Ensure the update actually modified the row (check if affectedRows > 0)
              if (updateResult.affectedRows === 0) {
                  return db.rollback(() => {
                      res.status(404).send({ error: "Food item not found" });
                  });
              }

              // Add record to food_likes table to track user like
              const addLikeRecordQuery = `
                  INSERT INTO food_likes (user_id, food_id) 
                  VALUES (?, ?)
              `;

              db.query(addLikeRecordQuery, [userId, foodId], (err) => {
                  if (err) {
                      console.error("Error adding like record:", err);
                      return db.rollback(() => {
                          res.status(500).send({ error: "Error recording the like" });
                      });
                  }

                  // Commit transaction if everything is successful
                  db.commit((err) => {
                      if (err) {
                          console.error("Error committing transaction:", err);
                          return db.rollback(() => {
                              res.status(500).send({ error: "Error committing transaction" });
                          });
                      }

                      res.send({ message: "Likes updated successfully" });
                  });
              });
          });
      });
  });
});


// Optional: Fetch views and likes for a recipe
router.get('/stats/:id', (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id, 10))) {
      return res.status(400).send({ error: "Invalid or missing recipe ID" });
  }

  const query = `SELECT views, likes FROM food_information WHERE id = ?`;

  db.query(query, [parseInt(id, 10)], (err, result) => {
      if (err) {
          console.error("Error fetching stats:", err);
          return res.status(500).send({ error: "Error fetching stats" });
      }

      if (result.length === 0) {
          return res.status(404).send({ error: "Recipe not found" });
      }

      res.send(result[0]);
  });
});





// Route to create a new recipe by a user
router.post('/user-recipe/create-recipe', isAuthenticated, (req, res) => {
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

  // Validate required input data (nutritional_paragraph removed from required fields)
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

  db.query(recipeQuery, [
    userId, 
    food_name, 
    description, 
    servings, 
    category, 
    total_cook_time, 
    difficulty, 
    preparation_tips, 
    nutritional_paragraph ?? '' // Default to empty string if not provided
  ], (err, result) => {
    if (err) {
      console.error("Error inserting new recipe:", err);
      return res.status(500).send({ error: "Error inserting recipe" });
    }

    const recipeId = result.insertId;

    // Step 2: Insert ingredients for the new recipe
    const ingredientQueries = ingredients.map((ingredient, index) => {
      return new Promise((resolve, reject) => {
        const ingredientQuery = `
          INSERT INTO user_recipe_ingredients (recipe_id, ingredient_name, quantity)
          VALUES (?, ?, ?)
        `;
        db.query(ingredientQuery, [recipeId, ingredient, quantities[index]], (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });

    // Step 3: Insert cooking instructions for the new recipe
    const instructionQueries = instructions.map((instruction, index) => {
      return new Promise((resolve, reject) => {
        const instructionQuery = `
          INSERT INTO user_cooking_instructions (recipe_id, step_number, instruction)
          VALUES (?, ?, ?)
        `;
        db.query(instructionQuery, [recipeId, index + 1, instruction], (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });

    // Step 4: Wait for all database operations to finish
    Promise.all([...ingredientQueries, ...instructionQueries])
      .then(() => {
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
      })
      .catch((err) => {
        console.error("Error inserting related data:", err);
        res.status(500).send({ error: "Error inserting related recipe data" });
      });
  });
});



router.get('/user-recipe/all', isAuthenticated, (req, res) => {
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

  db.query(query, [userId], (err, recipes) => {
      if (err) {
          console.error("Error fetching user's recipes:", err);
          return res.status(500).send({ error: "Error fetching user's recipes" });
      }

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
              ? recipe.images.split(', ').map(img => `http://192.168.111.245:6000${img}`) 
              : [] // Format images with base URL
      }));

      res.send(formattedRecipes);
  });
});



router.get('/user-recipe/single-recipe/:id', isAuthenticated, (req, res) => {
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

  db.query(query, [recipeId, userId], (err, results) => {
      if (err) {
          console.error("Error fetching the recipe:", err);
          return res.status(500).send({ error: "Error fetching the recipe" });
      }

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
              ? recipe.images.split(', ').map(img => `http://192.168.111.245:6000${img}`)
              : []
      };

      res.send(formattedRecipe);
  });
});




// Route to search recipes by food name for the authenticated user
router.get('/user-recipe/search-recipes', isAuthenticated, (req, res) => {
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

  // Execute the query
  db.query(query, [userId, searchTerm], (err, recipes) => {
    if (err) {
      console.error("Error searching for recipes:", err);
      return res.status(500).send({ error: "Error searching for recipes" });
    }

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
  });
});

// Route to delete a recipe created by the authenticated user
router.delete('/user-recipe/delete-recipe/:id', isAuthenticated, (req, res) => {
  const recipeId = req.params.id; // Get the recipe ID from the route parameter
  const userId = req.user.id; // Get the authenticated user's ID

  // Check if the recipe exists and belongs to the user
  const checkQuery = `
    SELECT id 
    FROM user_recipes 
    WHERE id = ? AND user_id = ?
  `;

  db.query(checkQuery, [recipeId, userId], (err, results) => {
    if (err) {
      console.error("Error checking recipe ownership:", err);
      return res.status(500).send({ error: "Error checking recipe ownership" });
    }

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

    // Use Promise.all to execute all delete queries
    const deletePromises = deleteQueries.map(query => {
      return new Promise((resolve, reject) => {
        db.query(query, [recipeId], (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });

    Promise.all(deletePromises)
      .then(() => {
        res.send({ message: "Recipe deleted successfully" });
      })
      .catch(err => {
        console.error("Error deleting recipe data:", err);
        res.status(500).send({ error: "Error deleting recipe data" });
      });
  });
});

// Export the router
module.exports = router;
