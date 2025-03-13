const quizApp = {
  score: 0,
  quizData: [],
  currentQuestionIndex: 0,
  correctAnswer: null,
  responseData: [],

  async fetchQuizDataAPI() {
    const url = "https://opentdb.com/api.php?amount=10";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      this.responseData = data.results; // Store results properly
      console.log(this.responseData);
    } catch (error) {
      console.error(error);
    }
  },

  async startQuiz() {
    await this.fetchQuizDataAPI();
    if (this.responseData.length === 0) {
      console.error("No quiz data available.");
      return;
    }
    this.quizData = convertApiResponse(this.responseData);
    this.currentQuestionIndex = 0;
    removeStartScreen();
    showQuestion();
  },
};

const startScreen = document.getElementById("start-screen");
const startButton = document.getElementById("start-button");
const quizContainer = document.getElementById("quiz-container");
const question = document.getElementById("question");
const questionNumber = document.getElementById("question-number");
const answerButtons = document.getElementById("answer-buttons");
const scoreContainer = document.getElementById("score-container");
const ScoreEl = document.getElementById("score");
const restartButton = document.getElementById("restart-button");

function convertApiResponse(apiResponse) {
  return apiResponse.map((item) => ({
    question: item.question,
    answers: [
      ...item.incorrect_answers.map((answer) => ({
        text: answer,
        correct: false,
      })),
      { text: item.correct_answer, correct: true },
    ].sort(() => Math.random() - 0.5), // Shuffle answers
  }));
}

startButton.addEventListener("click", () => {
  quizApp.startQuiz();
});

function removeStartScreen() {
  startScreen.classList.add("hide");
}

function showQuestion() {
  answerButtons.innerHTML = "";
  quizContainer.classList.remove("hide");

  if (quizApp.currentQuestionIndex < quizApp.quizData.length) {
    insertButtons(quizApp.quizData[quizApp.currentQuestionIndex]);
  } else {
    showScore();
  }
}

function insertButtons(quiz) {
  question.innerText = quiz.question;
  questionNumber.innerText = quizApp.currentQuestionIndex + 1;
  quizApp.correctAnswer = null;

  quiz.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    if (answer.correct) {
      quizApp.correctAnswer = answer.text;
    }

    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

function selectAnswer(event) {
  const selectedButton = event.target;
  const isCorrect = selectedButton.textContent === quizApp.correctAnswer;

  document.querySelectorAll(".answer-btn").forEach((btn) => {
    btn.disabled = true;
  });

  if (isCorrect) {
    selectedButton.classList.add("correct");
    quizApp.score++;
  } else {
    selectedButton.classList.add("wrong");

    const wrongButton = document.createElement("button");
    wrongButton.textContent = `Wrong! The correct answer is: ${quizApp.correctAnswer}`;
    wrongButton.classList.add("feedback", "wrong");
    answerButtons.appendChild(wrongButton);
  }

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.classList.add("next-btn");
  nextButton.addEventListener("click", () => {
    quizApp.currentQuestionIndex++;
    showQuestion();
  });

  answerButtons.appendChild(nextButton);
}

function showScore() {
  scoreContainer.classList.remove("hide");
  quizContainer.classList.add("hide");
  ScoreEl.innerText = quizApp.score;

  restartButton.removeEventListener("click", restart);
  restartButton.addEventListener("click", restart);
}

function restart() {
  quizApp.score = 0;
  quizApp.currentQuestionIndex = 0;
  quizApp.correctAnswer = null;
  startScreen.classList.remove("hide");
  quizContainer.classList.add("hide");
  scoreContainer.classList.add("hide");
}
