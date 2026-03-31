import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { createFeedbackItem, getFeedbackItems } from "../services/feedbackService";
import { showError, showSuccess } from "../utils/notify";

const FeedbackPage = () => {
  const { token } = useAuth();
  const [subject, setSubject] = useState("");
  const [messageText, setMessageText] = useState("");
  const [feedbackItems, setFeedbackItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadFeedback = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getFeedbackItems(token);
      if (response.ok) {
        setFeedbackItems(response.data.feedbackItems || []);
      }
    } catch (error) {
      showError("History load nahi ho saki.");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadFeedback();
  }, [loadFeedback]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const response = await createFeedbackItem(token, { subject, message: messageText });

    if (response.ok) {
      showSuccess("Feedback successfully bhej diya gaya!");
      setSubject("");
      setMessageText("");
      loadFeedback();
    } else {
      showError(response.message);
    }
    setIsSubmitting(false);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-fixed bg-center bg-no-repeat py-12 px-6 relative font-sans tracking-tight"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop')` 
      }}
    >
      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
              Member <span className="text-yellow-500">Support</span>
            </h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] mt-1">Premium Fitness Experience</p>
          </div>
          <Link 
            to="/dashboard"
            className="px-10 py-3 font-black text-xs uppercase tracking-widest text-black bg-yellow-500 rounded-full hover:bg-white transition-all duration-300 shadow-lg active:scale-95"
          >
            Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- Form Section (Left) --- */}
          <div className="lg:col-span-7 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
            <h2 className="text-xl font-black text-yellow-500 mb-8 uppercase tracking-[0.2em]">Post Feedback</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Subject</label>
                <input
                  type="text"
                  placeholder="TOPIC OF DISCUSSION"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-500 transition-all text-white placeholder:text-gray-700 text-sm font-bold uppercase"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Message</label>
                <textarea
                  rows="5"
                  placeholder="TELL US MORE..."
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-500 transition-all text-white resize-none placeholder:text-gray-700 text-sm font-bold uppercase"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-5 bg-yellow-500 text-black font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-all duration-500 transform active:scale-95 disabled:opacity-50 shadow-xl"
              >
                {isSubmitting ? "Processing..." : "Submit Now"}
              </button>
            </form>
          </div>

          {/* --- History Section (Right) --- */}
          <div className="lg:col-span-5 flex flex-col h-[585px]">
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl flex-grow overflow-hidden flex flex-col">
              <h2 className="text-xl font-black text-white mb-8 uppercase tracking-[0.2em]">History</h2>
              
              <div className="space-y-4 overflow-y-auto pr-3 custom-scrollbar">
                {isLoading ? (
                  <div className="flex justify-center py-20 text-yellow-500 font-black uppercase text-xs tracking-widest animate-pulse">Loading Logs...</div>
                ) : feedbackItems.length === 0 ? (
                  <div className="text-gray-600 text-center py-10 font-bold uppercase text-[10px] tracking-widest italic">No previous logs found</div>
                ) : (
                  feedbackItems.map((item) => (
                    <div key={item._id} className="group bg-black/20 p-6 rounded-2xl border border-white/5 hover:border-yellow-500/50 transition-all duration-500">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[9px] font-black px-3 py-1 rounded-full bg-yellow-500 text-black uppercase">
                          {item.status}
                        </span>
                        <span className="text-[10px] text-gray-600 font-bold tracking-tighter">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-sm font-black text-gray-200 uppercase tracking-tight group-hover:text-yellow-500 transition-colors duration-300">
                        {item.subject}
                      </h3>
                      <p className="text-xs text-gray-500 mt-2 italic leading-relaxed line-clamp-2">"{item.message}"</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #eab308; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </div>
  );
};

export default FeedbackPage;