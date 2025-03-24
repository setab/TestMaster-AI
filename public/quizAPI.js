// const url = "https://opentdb.com/api.php?amount=10";
const url = "http://127.0.0.1:5000/quiz";

// Fetching data from the API
async function fetchQuestions(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading page:", error);
  }
}

// Convert API response to quiz format
function convertApiResponse(apiResponse) {
  if (apiResponse) {
    return apiResponse.map((item) => ({
      question: item.question,
      answers: [
        ...item.incorrect_answers.map((answer) => ({
          text: answer,
          correct: false,
        })),
        {
          text: item.correct_answer,
          correct: true,
        },
      ].sort(() => Math.random() - 0.5),
    }));
  } else {
    return [];
  }
}

async function getFormattedQuizData() {
  const response_data = await fetchQuestions(url);
  // console.log(response_data.results);
  return convertApiResponse(response_data.results);
}

export default getFormattedQuizData;
