// firebase/firebase-auth.js
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { app } from "./firebase-config.js";

const auth = getAuth(app);

// Sign up function
export function signUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User signed up:", userCredential.user);
      alert("Signup successful!");
    })
    .catch((error) => console.error("Error signing up:", error));
}

// Login function
export function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("User logged in:", userCredential.user);
      alert("Login successful!");
      window.location.href = "home.html"; // Redirect after login
    })
    .catch((error) => console.error("Error logging in:", error));
}

// Logout function
export function logout() {
  signOut(auth)
    .then(() => {
      console.log("User logged out");
      alert("Logout successful!");
      window.location.href = "login.html"; // Redirect to login page
    })
    .catch((error) => console.error("Error logging out:", error));
}
