function start() {
  console.log("Quiz has started");

  const quizContainer = document.getElementById("quiz-container");
  const startButton = document.getElementById("start-button");
  const startScreen = document.getElementById("start-screen");

  let quizData = [];
  let questionIndex = 0;
  let correctAnswer = "";
  let score = 0;

  async function fetchQuizData() {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/quiz/questions");
      const data = await response.json();
      quizData = data.questions;

      startButton.addEventListener("click", startQuiz);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  }

  function startQuiz() {
    console.log("Quiz started");
    quizContainer.classList.remove("hide");
    startScreen.classList.add("hide");
    renderQuestion();
  }

  function renderQuestion() {
    const questionData = quizData[questionIndex];

    if (!questionData) {
      console.warn("No question found!");
      return;
    }

    correctAnswer = questionData.answers.find((ans) => ans.correct)?.text || "";

    quizContainer.innerHTML = `
      <div id="quiz-header">
        <h2 id="question">${questionData.question}</h2>
        <div id="progress">
          <span id="question-number">${questionIndex + 1}</span> of 
          <span id="total-questions">${quizData.length}</span>
        </div>
      </div>

      <div id="answer-buttons" class="btn-grid"></div>
      <div id="feedback" class="feedback hide"></div>

      <div class="controls">
        <button id="next-button" class="next-btn hide">Next</button>
      </div>
    `;

    const answerButtons = document.getElementById("answer-buttons");
    questionData.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.classList.add("answer-btn");
      button.textContent = answer.text;
      button.addEventListener("click", () => selectAnswer(answer.text));
      answerButtons.appendChild(button);
    });
  }

  function selectAnswer(selectedAnswer) {
    const answerButtons = document.getElementById("answer-buttons");
    const feedback = document.getElementById("feedback");

    [...answerButtons.children].forEach((button) => {
      button.disabled = true;

      if (button.textContent === selectedAnswer) {
        if (selectedAnswer === correctAnswer) {
          button.classList.add("correct");
          score++;
        } else {
          button.classList.add("wrong");
        }
      }
    });

    feedback.classList.remove("hide");
    feedback.textContent =
      selectedAnswer === correctAnswer
        ? "Correct!"
        : `Wrong! Correct answer is: ${correctAnswer}`;

    const nextButton = document.getElementById("next-button");
    nextButton.classList.remove("hide");
    nextButton.onclick = showNextQuestion;
  }

  function showNextQuestion() {
    questionIndex++;

    if (questionIndex < quizData.length) {
      renderQuestion();
    } else {
      showFinalScore();
    }
  }

  function showFinalScore() {
    quizContainer.innerHTML = `
      <div id="score-container" class="score-container">
        <h2>Your Score</h2>
        <p id="score">${score}</p>
        <button id="restart-button">Restart Quiz</button>
      </div>
    `;

    const restartButton = document.getElementById("restart-button");
    restartButton.addEventListener("click", () => {
      questionIndex = 0;
      score = 0;
      renderQuestion();
    });
  }

  fetchQuizData();
}

document.addEventListener("DOMContentLoaded", start);
