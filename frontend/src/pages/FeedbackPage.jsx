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
    <div className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-3xl font-bold text-primary">Support & Feedback</h1>
            <p className="text-sm text-gray-500 mt-1">We would love to hear your thoughts or help with any issues.</p>
          </div>
          <Link 
            className="btn btn-primary btn-outline border-2 hover:bg-primary hover:text-white transition-all duration-300" 
            to="/dashboard"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left Column: Form Card */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Submit New Feedback</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Subject Input */}
              <div className="form-control w-full">
                <label htmlFor="subject" className="label font-medium text-gray-700">Subject</label>
                <input
                  id="subject"
                  type="text"
                  placeholder="What is this regarding?"
                  className="input input-bordered w-full bg-white focus:outline-primary focus:border-primary border-gray-200 transition-colors"
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  required
                />
              </div>

              {/* Message Input */}
              <div className="form-control w-full">
                <label htmlFor="message" className="label font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="Describe your feedback or issue here..."
                  className="textarea textarea-bordered w-full bg-white focus:outline-primary focus:border-primary border-gray-200 transition-colors"
                  value={messageText}
                  onChange={(event) => setMessageText(event.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn btn-primary w-full text-white bg-primary hover:bg-secondary border-none transition-all duration-300 shadow-md shadow-green-900/10"
              >
                Submit Feedback
              </button>
            </form>
          </div>

          {/* Right Column: History List */}
          <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Your History</h2>
              <p className="text-xs text-gray-500 mt-0.5">Track your previous queries</p>
            </div>
            
            <div className="space-y-3 overflow-y-auto max-h-[400px] pr-1 flex-grow">
              {feedbackItems.length === 0 ? (
                <div className="text-center py-6">
                  <EmptyState
                    title="No feedback yet"
                    subtitle="Submit a form and it will appear here."
                  />
                </div>
              ) : (
                feedbackItems.map((item) => (
                  <div key={item._id} className="p-4 bg-base-200 rounded-xl border border-gray-100 hover:border-accent/40 transition-colors duration-200">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {item.subject}
                    </p>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.message}</p>
                    
                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-200/60 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <span className={`w-2 h-2 rounded-full ${item.status === 'open' ? 'bg-accent' : 'bg-success'}`}></span>
                        Status: <span className="capitalize font-medium text-gray-700">{item.status}</span>
                      </span>
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;