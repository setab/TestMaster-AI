const express = require("express");
const path = require("path"); // Import the path module to handle file paths
const router = express.Router();
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET; // Get the secret key from environment variables
const { signup, login } = require("../../controllers/authController"); // Import the signup and login functions from the controller
// const { decode } = require("punycode");

// signup route to handle user registration
router.post("/signup", signup); // Route for user signup
router.get("/signup", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../../frontend", "src/pages/Signup.html")
  ); // Test route for authentication API
});

// login route to handle user authentication
router.post("/login", login); // Route for user login
router.get("/login", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../../frontend", "src/pages/Login.html")
  ); // Test route for authentication API
  console.log("login page loaded"); // Log when the login.html file is loaded
});

//Middleware to check authentication
function isAuthenticated(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Get token

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err)
      return res.status(403).json({ message: "Forbidden: Invalid token" });

    req.user = decoded; // Attach decoded user info to request object
    next();
  });
}
// API route to check login status
router.get("/checkLogin", isAuthenticated, (req, res) => {
  console.log("in checkLogin route"); // Log when the checkLogin route is accessed
  res.json({
    loggedIn: true, // If the user is authenticated, send loggedIn as true
    message: "User is logged in",
    user: req.user, // Send user info
  });
});

// logout route to handle user logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  }); // Clear the token cookie
  res.status(200).json({ message: "Logged out successfully" }); // Send success message
  console.log("User logged out successfully"); // Log when the user logs out
});

module.exports = router; // Export the router to be used in the main server file
