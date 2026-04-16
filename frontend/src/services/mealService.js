const API_BASE_URL = "http://localhost:5000/api/meal-types";

const makeMealRequest = async (url, method, token, bodyData) => {
  try {
    const options = {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    if (bodyData) {
      options.body = JSON.stringify(bodyData);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      return { ok: false, message: data.message || "Meal request failed" };
    }

    return { ok: true, data };
  } catch {
    return { ok: false, message: "Cannot connect to server" };
  }
};

export const getMealTypes = (token) => {
  return makeMealRequest(API_BASE_URL, "GET", token);
};

export const createMealType = (token, body) => {
  return makeMealRequest(API_BASE_URL, "POST", token, body);
};

export const updateMealType = (token, id, body) => {
  return makeMealRequest(`${API_BASE_URL}/${id}`, "PUT", token, body);
};

export const deleteMealType = (token, id) => {
  return makeMealRequest(`${API_BASE_URL}/${id}`, "DELETE", token);
};