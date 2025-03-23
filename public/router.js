const routes = {
  "": "pages/home.html", // Default route
  "#quiz": "pages/quiz.html",
  "#login": "pages/login.html",
  "#signup": "pages/signup.html",
  "#404": "pages/404.html",
};

// Function to load the page content dynamically
function loadPage() {
  const path = window.location.hash || ""; // Get the current hash
  const page = routes[path] || routes[""]; // Default to home if not found

  fetch(page)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("app").innerHTML = html;

      // Remove old script to prevent duplication
      const oldScript = document.getElementById("quiz-script");
      if (oldScript) {
        oldScript.remove();
      }

      if (path === "#quiz") {
        // Dynamically load quiz script
        const script = document.createElement("script");
        script.src = "quiz2.js";
        script.id = "quiz-script"; // Prevent multiple instances
        document.body.appendChild(script);
      }
    })
    .catch((error) => console.error("Error loading page:", error));
}

// Listen for hash changes & initial page load
window.addEventListener("hashchange", loadPage);
window.addEventListener("DOMContentLoaded", loadPage);
