const API_BASE_URL = "http://localhost:5000/api/nutrition";

const makeNutritionRequest = async (url, method, token, bodyData) => {
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
      return { ok: false, message: data.message || "Nutrition request failed" };
    }

    return { ok: true, data };
  } catch {
    return { ok: false, message: "Cannot connect to server" };
  }
};

export const getNutritionEntries = async (token) => {
  return makeNutritionRequest(API_BASE_URL, "GET", token);
};

export const createNutritionEntry = async (token, entryData) => {
  return makeNutritionRequest(API_BASE_URL, "POST", token, entryData);
};

export const updateNutritionEntry = async (token, id, entryData) => {
  return makeNutritionRequest(`${API_BASE_URL}/${id}`, "PUT", token, entryData);
};

export const deleteNutritionEntry = async (token, id) => {
  return makeNutritionRequest(`${API_BASE_URL}/${id}`, "DELETE", token);
};
