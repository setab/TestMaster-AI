import { login } from "../api/auth.js"; // Import the login function from the API module

document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include", // 🔹 Ensures cookies are sent & received
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      console.log("Login successful:", await response.json());

      // ✅ No need to manually store JWT—cookies handle authentication automatically
      window.location.href = "/dashboard"; // Redirect if login is successful
    } else {
      alert("Login failed. Please check your email and password."); // Show an alert if login fails
    }
  });
