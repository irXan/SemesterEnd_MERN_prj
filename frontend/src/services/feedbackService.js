const API_BASE_URL = "http://localhost:5000/api/feedback";

const makeFeedbackRequest = async (url, method, token, bodyData) => {
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
      return { ok: false, message: data.message || "Feedback request failed" };
    }

    return { ok: true, data };
  } catch {
    return { ok: false, message: "Cannot connect to server" };
  }
};

export const getFeedbackItems = async (token) => {
  return makeFeedbackRequest(API_BASE_URL, "GET", token);
};

export const createFeedbackItem = async (token, feedbackData) => {
  return makeFeedbackRequest(API_BASE_URL, "POST", token, feedbackData);
};
