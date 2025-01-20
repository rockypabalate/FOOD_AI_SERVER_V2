const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require("express-session"); // Ensure express-session is used
const authRoutes = require("./routes/auth.routes");
const imagesRoutes = require("./routes/images.routes");
const recipesRoutes = require("./routes/recipes.routes");

const app = express();
const PORT = process.env.PORT || 6000;

// Base URL for the server
const baseUrl = 'http://192.168.201.245:6000';

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// Session middleware setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mysecretkey", // Use a secure secret in production
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }, // Secure=false for development, use true in production with HTTPS
  })
);

// Static file serving
app.use('/profile_images', express.static(path.join(__dirname, 'public/profile_images')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Serve the index.html file as a landing page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Routes
app.use("/auth", authRoutes); // Authentication routes
app.use('/images', imagesRoutes); // Image-related routes
app.use('/recipes', recipesRoutes); // Recipe-related routes

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at ${PORT}`);
});
