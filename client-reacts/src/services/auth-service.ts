import { API_URL } from "@/utils/config";

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      return { success: false, error: "Login failed" };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: error.message };
  }
};