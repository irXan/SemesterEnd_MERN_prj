const API_BASE_URL = "http://localhost:5000/api/workouts";

const makeWorkoutRequest = async (url, method, token, bodyData) => {
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
      return { ok: false, message: data.message || "Workout request failed" };
    }

    return { ok: true, data };
  } catch {
    return { ok: false, message: "Cannot connect to server" };
  }
};

export const getWorkouts = async (token) => {
  return makeWorkoutRequest(API_BASE_URL, "GET", token);
};

export const createWorkout = async (token, workoutData) => {
  return makeWorkoutRequest(API_BASE_URL, "POST", token, workoutData);
};

export const updateWorkout = async (token, id, workoutData) => {
  return makeWorkoutRequest(`${API_BASE_URL}/${id}`, "PUT", token, workoutData);
};

export const deleteWorkout = async (token, id) => {
  return makeWorkoutRequest(`${API_BASE_URL}/${id}`, "DELETE", token);
};
