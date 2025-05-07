// quiz button
document.getElementById("quiz").addEventListener("click", function () {
  window.location.href = "/quiz";
});

// check if the user is logged in
document.addEventListener("DOMContentLoaded", function () {
  fetch("/api/auth/checkLogin", {
    method: "GET",
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        // If not logged in, redirect to login page
        window.location.href = "/api/auth/login";
      }
    })
    .catch((error) => {
      console.error("Error checking login status:", error);
    });
});
// logout button
document.getElementById("logout").addEventListener("click", () => {
  fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        window.location.href = "/"; // Redirect to login page after logout
      } else {
        console.error("Logout failed:", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error during logout:", error);
    });
  console.log("Logout button clicked"); // Log when the logout button is clicked
});
