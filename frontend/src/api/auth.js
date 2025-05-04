const API_URL = "http://localhost:3000/api/auth";

// signup function to register a new user
async function signup(email, password) {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Signup response:", data);
    return data;
  } catch (error) {
    console.error("Error during signup:", error);
  }
}
async function login(email, password) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Login response:", data);
    return data;
  } catch (error) {
    console.error("Error during login:", error);
  }
}
export { signup, login };
