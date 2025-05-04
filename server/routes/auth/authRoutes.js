const express = require("express");
const path = require("path"); // Import the path module to handle file paths
const router = express.Router();
const { signup, login } = require("../../controllers/authController"); // Import the signup and login functions from the controller

router.post("/signup", signup); // Route for user signup
router.get("/signup", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../../frontend", "src/pages/Signup.html")
  ); // Test route for authentication API
});
router.post("/login", login); // Route for user login
router.get("/login", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../../../frontend", "src/pages/Login.html")
  ); // Test route for authentication API
});

module.exports = router; // Export the router to be used in the main server file
