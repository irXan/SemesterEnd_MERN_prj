const BASE_URL = "http://localhost:5000/api/dashboard";

export const getDashboardStats = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!res.ok) return { ok: false, message: data.message };
    return { ok: true, data };
  } catch {
    return { ok: false, message: "Network error" };
  }
};