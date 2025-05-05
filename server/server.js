require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth/authRoutes");
const quizRoutes = require("./routes/quizRoutes"); // Import the quiz routes
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// homepage route
app.use(express.static(path.join(__dirname, "../frontend"))); // Serve static files from the public directory
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html")); // Serve the index.html file
});

// authentication routes
app.use("/api/auth", authRoutes); // Use the auth routes for authentication

// quiz routes
app.use("/api/quiz", quizRoutes);
app.use("/api/quiz", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "src/pages/Quiz.html")); // Serve the quiz.html file
});

const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not set in .env
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
