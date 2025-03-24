const routes = {
  "": "pages/home.html", // Default route
  "#quiz": "pages/quiz.html",
  "#login": "pages/login.html",
  "#signup": "pages/signup.html",
  "#404": "pages/404.html",
};

// Function to load the page content dynamically
function loadPage() {
  const path = window.location.hash || "";
  const page = routes[path] || routes[""];

  fetch(page)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("app").innerHTML = html;

      if (path === "#quiz") {
        console.log("Quiz page loaded");

        // Remove existing script if it exists
        const existingScript = document.getElementById("quiz-script");
        if (existingScript) {
          existingScript.remove();
        }

        // Dynamically load the quiz script with cache-busting
        const script = document.createElement("script");
        script.src = `quiz.js?t=${Date.now()}`; // Add timestamp to avoid caching
        script.type = "module";
        script.id = "quiz-script";

        document.body.appendChild(script);
      }
    })
    .catch((error) => console.error("Error loading page:", error));
}

// Listen for hash changes & initial page load
window.addEventListener("hashchange", loadPage);
window.addEventListener("DOMContentLoaded", loadPage);
