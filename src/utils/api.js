const API_URL = import.meta.env.VITE_API_URL;

export async function postRequest(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    let errorMessage = "Failed to submit form";

    if (url.includes("login")) {
      errorMessage =
        errorData.message || "Invalid credentials. Please try again.";
    } else if (url.includes("register")) {
      errorMessage =
        errorData.message || "Username already exists. Please choose another.";
    }

    throw new Error(errorMessage);
  }
  return await response.json();
}

export async function postRequestLogout() {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to logout. Please try again.");
  }
}
