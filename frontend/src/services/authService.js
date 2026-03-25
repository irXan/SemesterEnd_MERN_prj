const API_BASE_URL = "http://localhost:5000/api";

const makeRequest = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      return {
        ok: false,
        message: data.message || "Something went wrong",
      };
    }

    return {
      ok: true,
      data,
    };
  } catch {
    return {
      ok: false,
      message: "Cannot connect to server",
    };
  }
};

export const registerUser = async (formData) => {
  return makeRequest(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
};

export const loginUser = async (formData) => {
  return makeRequest(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
};

export const getCurrentUser = async (token) => {
  return makeRequest(`${API_BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
