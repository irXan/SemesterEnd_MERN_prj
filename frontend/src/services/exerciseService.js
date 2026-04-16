const BASE_URL = "http://localhost:5000/api/exercises";

export const getExercises = async (token) => {
  try {
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return { ok: false, message: data.message };
    }

    return { ok: true, data };
  } catch (error) {
    return { ok: false, message: "Network error" };
  }
};

export const createExercise = async (token, payload) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return { ok: false, message: data.message };
    }

    return { ok: true, data };
  } catch (error) {
    return { ok: false, message: "Network error" };
  }
};

export const updateExercise = async (token, id, payload) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return { ok: false, message: data.message };
    }

    return { ok: true, data };
  } catch (error) {
    return { ok: false, message: "Network error" };
  }
};

export const deleteExercise = async (token, id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      return { ok: false, message: data.message };
    }

    return { ok: true, data };
  } catch (error) {
    return { ok: false, message: "Network error" };
  }
};