import { signup } from "../api/auth.js"; // ✅ Ensure correct path

document
  .getElementById("signup-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // ✅ Prevent refresh

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await signup(email, password);
    if (response) {
      alert("Signup successful! Please check your email for verification."); // ✅ Show success message
      window.location.href = "/index.html"; // ✅ Redirect to login page after signup
    }
  });
