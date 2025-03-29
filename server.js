const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
require("dotenv").config(); // Load environment variables

const authRoutes = require("./routes/auth.routes");
const imagesRoutes = require("./routes/images.routes");
const recipesRoutes = require("./routes/recipes.routes");

const app = express();
const PORT = process.env.PORT || 6000;

// Base URL for the server (Change for production)
const baseUrl = process.env.BASE_URL || `http://192.168.201.245:${PORT}`;

// CORS Middleware
app.use(cors({ origin: "*", credentials: true })); 

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Static File Serving
app.use("/profile_images", express.static(path.join(__dirname, "public/profile_images")));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/recipe_images", express.static(path.join(__dirname, "public/recipe_images_user")));


// Routes
app.use("/auth", authRoutes);
app.use("/images", imagesRoutes);
app.use("/recipes", recipesRoutes);

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at ${PORT}`);
});
