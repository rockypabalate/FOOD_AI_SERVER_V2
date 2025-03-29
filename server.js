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

// MySQL Session Store
const dbOptions = {
  host: process.env.DB_HOST || "your-mysql-host",
  user: process.env.DB_USER || "your-mysql-user",
  password: process.env.DB_PASSWORD || "your-mysql-password",
  database: process.env.DB_NAME || "your-database-name",
  port: process.env.DB_PORT || 3306,
  clearExpired: true,
  checkExpirationInterval: 900000, // 15 mins
  expiration: 86400000, // 24 hours
};

const sessionStore = new MySQLStore(dbOptions);

// Session Middleware
app.use(
  session({
    key: "session_id",
    secret: process.env.SESSION_SECRET || "mysecretkey",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Set true in production with HTTPS
      httpOnly: true,
      maxAge: 86400000, // 24 hours
    },
  })
);

// Static File Serving
app.use("/profile_images", express.static(path.join(__dirname, "public/profile_images")));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/recipe_images", express.static(path.join(__dirname, "public/recipe_images_user")));

// Serve Landing Page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Routes
app.use("/auth", authRoutes);
app.use("/images", imagesRoutes);
app.use("/recipes", recipesRoutes);

// Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at ${PORT}`);
});
