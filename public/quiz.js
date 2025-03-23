if (!window.quizApp) {
  window.quizApp = {
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
        this.responseData = data.results;
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
      this.saveState();
      removeStartScreen();
      showQuestion();
    },

    saveState() {
      localStorage.setItem(
        "quizState",
        JSON.stringify({
          score: this.score,
          quizData: this.quizData,
          currentQuestionIndex: this.currentQuestionIndex,
          correctAnswer: this.correctAnswer,
          responseData: this.responseData,
        })
      );
    },

    loadState() {
      const savedState = localStorage.getItem("quizState");
      if (savedState) {
        Object.assign(this, JSON.parse(savedState));
        return true;
      }
      return false;
    },

    resetState() {
      localStorage.removeItem("quizState");
      Object.assign(this, {
        score: 0,
        quizData: [],
        currentQuestionIndex: 0,
        correctAnswer: null,
        responseData: [],
      });
    },
  };
}

// ✅ Prevent multiple DOM element declarations
if (!window.quizElements) {
  window.quizElements = {
    startScreen: document.getElementById("start-screen"),
    startButton: document.getElementById("start-button"),
    quizContainer: document.getElementById("quiz-container"),
    question: document.getElementById("question"),
    questionNumber: document.getElementById("question-number"),
    answerButtons: document.getElementById("answer-buttons"),
    scoreContainer: document.getElementById("score-container"),
    ScoreEl: document.getElementById("score"),
    restartButton: document.getElementById("restart-button"),
  };
}

// ✅ Assign global variables
const {
  startScreen,
  startButton,
  quizContainer,
  question,
  questionNumber,
  answerButtons,
  scoreContainer,
  ScoreEl,
  restartButton,
} = window.quizElements;

// ✅ Prevent multiple event listeners
if (!window.quizEventsAdded) {
  startButton.addEventListener("click", () => {
    console.log("Start button clicked");
    quizApp.startQuiz();
    console.log("Quiz started");
  });

  restartButton.addEventListener("click", () => {
    quizApp.resetState();
    startScreen.classList.remove("hide");
    quizContainer.classList.add("hide");
    scoreContainer.classList.add("hide");
  });

  window.quizEventsAdded = true; // Mark events as added
}

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
    quizApp.saveState();
    showQuestion();
  });

  answerButtons.appendChild(nextButton);
}

function showScore() {
  scoreContainer.classList.remove("hide");
  quizContainer.classList.add("hide");
  ScoreEl.innerText = quizApp.score;
}

// Load quiz state if available
if (quizApp.loadState()) {
  removeStartScreen();
  showQuestion();
}
