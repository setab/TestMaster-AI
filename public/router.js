const routes = {
  "": "pages/home.html", // Default route
  "#quiz": "pages/quiz.html",
  "#leaderboard": "pages/leaderboard.html",
  "#login": "pages/login.html",
  "#signup": "pages/signup.html",
};
// Function to load the page content dynamically
function loadPage() {
  const path = window.location.hash || ""; // Get the current hash
  const page = routes[path] || routes[""]; // Default to home if not found

  fetch(page)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("app").innerHTML = html;
    })
    .catch((error) => console.error("Error loading page:", error));
}

// Listen for hash changes & initial page load
window.addEventListener("hashchange", loadPage);
window.addEventListener("DOMContentLoaded", loadPage);
