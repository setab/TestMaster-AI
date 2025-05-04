function start() {
  console.log("quize has started");
  fetchQuizData();
  const quizContainer = document.getElementById("quiz-container");
  const startButton = document.getElementById("start-button");
  const startScreen = document.getElementById("start-screen");
  // const questionContainer = document.getElementById("question");

  let QuizData;
  let questionIndex = 0;
  let correct_answer = "";
  let score = 0;

  async function fetchQuizData() {
    const response = await fetch("http://127.0.0.1:5000/quiz");
    QuizData = await response.json(); // Wait until the JSON is fetched and parsed
    console.log(QuizData); // Log QuizData after it is assigned

    function addEventListener() {
      startButton.addEventListener("click", startQuiz);
    }
    addEventListener();
  }

  function startQuiz() {
    console.log("Quiz started");

    quizContainer.classList.remove("hide");
    startScreen.classList.add("hide");
    renderQuestion();
  }

  function renderQuestion() {
    const questionData = QuizData[questionIndex];

    if (!questionData) {
      console.log("no question found!!");
      return;
    }
    correct_answer =
      questionData.answers.find((answer) => answer.correct)?.text || "";

    quizContainer.innerHTML = ` 
    <div id="quiz-header"> 
        <h2 id="question">${QuizData[questionIndex].question}</h2> 
        <div id="progress"> 
            <span id="question-number">${questionIndex + 1}</span> of 
            <span id="total-questions">10</span> 
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
      button.addEventListener("click", () => {
        selectAnswer(answer.text);
      });
      answerButtons.appendChild(button);
    });
  }

  function selectAnswer(selectedAnswer) {
    const answerButtons = document.getElementById("answer-buttons");
    answerButtons.childNodes.forEach((button) => {
      button.disabled = true;
      if (
        button.textContent === selectedAnswer &&
        selectedAnswer === correct_answer
      ) {
        button.classList.add("correct");
        score++;
      } else if (button.textContent === selectedAnswer) {
        button.classList.add("wrong");
      }
    });
    const feedback = document.getElementById("feedback");
    feedback.classList.remove("hide");
    if (selectedAnswer === correct_answer) {
      feedback.textContent = "Correct!";
    } else {
      feedback.textContent = "Wrong! correct answer is :" + correct_answer;
    }
    const nextButton = document.getElementById("next-button");
    nextButton.classList.remove("hide");
    nextButton.addEventListener("click", () => {
      questionIndex++;
      if (questionIndex < QuizData.length) {
        renderQuestion();
      } else {
        quizContainer.innerHTML = `
      <div id="score-container" class="score-container ">
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
    });
  }
}

document.addEventListener("DOMContentLoaded", start());
