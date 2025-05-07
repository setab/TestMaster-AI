require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth/authRoutes");
const quizRoutes = require("./routes/quizRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// 🔍 Log every request
app.use((req, res, next) => {
  console.log("➡️ Path:", req.path);
  next();
});

// 🌐 Serve static files (like JS, CSS, images)
app.use(express.static(path.join(__dirname, "../frontend")));

// 🌍 Home page
app.get("/", (req, res) => {
  console.log("🏠 Index page loaded");
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

// 👤 Auth routes
app.use("/api/auth", authRoutes);

// ❓ Quiz API + UI
app.use("/api/quiz", quizRoutes);
app.get("/quiz", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "src/pages/Quiz.html"));
});

// 📊 Dashboard
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "src/pages/DashBoard.html"));
});

// logout

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
