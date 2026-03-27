import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmptyState from "../components/EmptyState";
import { useAuth } from "../hooks/useAuth";
import { createFeedbackItem, getFeedbackItems } from "../services/feedbackService";
import { showError, showSuccess } from "../utils/notify";

const FeedbackPage = () => {
  const { token } = useAuth();

  const [subject, setSubject] = useState("");
  const [messageText, setMessageText] = useState("");
  const [feedbackItems, setFeedbackItems] = useState([]);

  const loadFeedback = useCallback(async () => {
    const response = await getFeedbackItems(token);

    if (response.ok) {
      setFeedbackItems(response.data.feedbackItems);
    }
  }, [token]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    loadFeedback();
  }, [loadFeedback]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await createFeedbackItem(token, {
      subject,
      message: messageText,
    });

    if (response.ok) {
      showSuccess("Feedback submitted. Thank you!");
      setSubject("");
      setMessageText("");
      loadFeedback();
    } else {
      showError(response.message);
    }
  };

  return (
    <div className="page">
      <div className="dashboard-card wide-card">
        <div className="top-row">
          <h1>Support & Feedback</h1>
          <Link className="link-button" to="/dashboard">
            Back to Dashboard
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="grid-form">
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            rows="4"
            value={messageText}
            onChange={(event) => setMessageText(event.target.value)}
            required
          />

          <button type="submit">Submit Feedback</button>
        </form>

        <h3>Your Previous Feedback</h3>
        <div className="list-wrap">
          {feedbackItems.length === 0 && (
            <EmptyState
              title="No feedback submitted yet"
              subtitle="If you find any issue, submit it above and it will appear here."
            />
          )}

          {feedbackItems.map((item) => (
            <div key={item._id} className="list-card">
              <p>
                <strong>{item.subject}</strong>
              </p>
              <p className="helper-text">{item.message}</p>
              <p className="helper-text">
                Status: {item.status} | Date: {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
