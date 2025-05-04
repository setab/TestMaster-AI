import { login } from "../api/auth.js"; // Import the login function from the API module

document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const email = document.getElementById("email").value; // Get the email value from the input field
    const password = document.getElementById("password").value; // Get the password value from the input field

    const response = await login(email, password); // Call the login function with the email and password
    if (response && response.token) {
      localStorage.setItem("token", response.token);
      window.location.href = "/index.html"; // Redirect to the index page if login is successful
    } else {
      alert("Login failed. Please check your email and password."); // Show an alert if login fails
    }
  });
