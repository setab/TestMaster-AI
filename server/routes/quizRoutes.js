const express = require("express");
const path = require("path"); // Import the path module to handle file paths
const router = express.Router();

router.get("/questions", (req, res) => {
  res.json({
    questions: [
      {
        question: "What is the capital of France?",
        answers: [
          { text: "Berlin", correct: false },
          { text: "Madrid", correct: false },
          { text: "Paris", correct: true },
          { text: "Rome", correct: false },
        ],
      },
      {
        question: "What is 5 × 6?",
        answers: [
          { text: "30", correct: true },
          { text: "25", correct: false },
          { text: "35", correct: false },
          { text: "40", correct: false },
        ],
      },
      {
        question: "Which planet is known as the Red Planet?",
        answers: [
          { text: "Earth", correct: false },
          { text: "Mars", correct: true },
          { text: "Venus", correct: false },
          { text: "Jupiter", correct: false },
        ],
      },
      {
        question: "What is the chemical symbol for water?",
        answers: [
          { text: "O", correct: false },
          { text: "H", correct: false },
          { text: "H₂O", correct: true },
          { text: "HO₂", correct: false },
        ],
      },
      {
        question: "Who wrote 'Romeo and Juliet'?",
        answers: [
          { text: "Charles Dickens", correct: false },
          { text: "William Shakespeare", correct: true },
          { text: "Jane Austen", correct: false },
          { text: "Mark Twain", correct: false },
        ],
      },
      {
        question: "What is √64?",
        answers: [
          { text: "6", correct: false },
          { text: "7", correct: false },
          { text: "8", correct: true },
          { text: "9", correct: false },
        ],
      },
      {
        question: "Which gas do plants primarily use for photosynthesis?",
        answers: [
          { text: "Oxygen", correct: false },
          { text: "Carbon dioxide", correct: true },
          { text: "Nitrogen", correct: false },
          { text: "Hydrogen", correct: false },
        ],
      },
      {
        question: "What is the largest mammal on Earth?",
        answers: [
          { text: "Elephant", correct: false },
          { text: "Blue Whale", correct: true },
          { text: "Giraffe", correct: false },
          { text: "Polar Bear", correct: false },
        ],
      },
      {
        question: "What is 12 ÷ 4?",
        answers: [
          { text: "2", correct: false },
          { text: "3", correct: true },
          { text: "4", correct: false },
          { text: "6", correct: false },
        ],
      },
      {
        question: "Which continent is the Sahara Desert located in?",
        answers: [
          { text: "Asia", correct: false },
          { text: "Africa", correct: true },
          { text: "Australia", correct: false },
          { text: "South America", correct: false },
        ],
      },
    ],
  });
  console.log("Quiz questions sent successfully"); // Log the success message
});
module.exports = router; // Export the router to be used in the main server file
