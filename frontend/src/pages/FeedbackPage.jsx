import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { createFeedbackItem, getFeedbackItems } from "../services/feedbackService";
import { showError, showSuccess } from "../utils/notify";
import { MessageSquare, History, LayoutDashboard, Send, Clock } from "lucide-react"; // Icons added
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

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
    <div className="bg-[#050505] min-h-screen text-white pt-20">
      <Navbar />

      <main 
        className="relative min-h-screen py-20 px-4 sm:px-8 overflow-hidden"
        style={{ 
          backgroundImage: `radial-gradient(circle at 50% -20%, rgba(234, 179, 8, 0.08), transparent 70%), 
                            linear-gradient(to bottom, rgba(5, 5, 5, 0.95), rgba(5, 5, 5, 1)),
                            url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-yellow-500/5 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto space-y-10">
     
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
              </div>
              <h1 className="text-white text-5xl md:text-6xl font-white uppercase tracking-tighter leading-none">
                Member <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 to-yellow-600">Support</span>
              </h1>
            </div>
            
            <Link 
              to="/dashboard"
              className="group flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500"
            >
              <LayoutDashboard size={14} className="group-hover:rotate-12 transition-transform" />
              Return to Dashboard
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            <div className="lg:col-span-7">
              <div className="bg-[#0a0a0a]/60 backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <MessageSquare size={120} />
                </div>

                <h2 className="text-lg font-black text-white mb-8 uppercase tracking-[0.2em] flex items-center gap-3">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                  Post Feedback
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">Topic of Discussion</label>
                    <input
                      type="text"
                      placeholder="e.g., Training Equipment Inquiry"
                      className="w-full bg-black/50 border border-white/5 rounded-2xl px-6 py-5 focus:outline-none focus:border-yellow-500/50 focus:ring-4 focus:ring-yellow-500/5 transition-all text-white placeholder:text-gray-700 text-sm font-bold uppercase tracking-wide"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] ml-2">Detailed Message</label>
                    <textarea
                      rows="6"
                      placeholder="Share your experience or report an issue..."
                      className="w-full bg-black/50 border border-white/5 rounded-2xl px-6 py-5 focus:outline-none focus:border-yellow-500/50 focus:ring-4 focus:ring-yellow-500/5 transition-all text-white resize-none placeholder:text-gray-700 text-sm font-bold uppercase tracking-wide"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      required
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="group relative w-full py-6 bg-yellow-500 text-black font-black uppercase tracking-[0.3em] text-xs rounded-2xl hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-500 transform active:scale-[0.98] disabled:opacity-50 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="relative flex items-center justify-center gap-3">
                      {isSubmitting ? "Syncing with Server..." : <>Transmit Message <Send size={14} /></>}
                    </span>
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#0a0a0a]/60 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/10 shadow-2xl h-[650px] flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-lg font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
                    <History size={20} className="text-yellow-500" />
                    Activity Logs
                  </h2>
                  <div className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
                    <span className="text-[10px] font-black text-yellow-500 uppercase">{feedbackItems.length} Entries</span>
                  </div>
                </div>
                
                <div className="space-y-4 overflow-y-auto pr-3 custom-scrollbar">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                      <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Fetching Archives</span>
                    </div>
                  ) : feedbackItems.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-white/5 rounded-3xl">
                      <Clock size={40} className="mx-auto text-gray-800 mb-4" />
                      <p className="text-gray-600 font-black uppercase text-[10px] tracking-[0.2em]">No Logs Found in Protocol</p>
                    </div>
                  ) : (
                    feedbackItems.map((item) => (
                      <div key={item._id} className="group bg-white/[0.02] p-6 rounded-3xl border border-white/5 hover:border-yellow-500/30 hover:bg-white/[0.04] transition-all duration-500">
                        <div className="flex justify-between items-start mb-4">
                          <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${
                            item.status === 'Resolved' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500 text-black'
                          }`}>
                            {item.status || 'Pending'}
                          </span>
                          <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">
                            {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        <h3 className="text-[13px] font-black text-gray-200 uppercase tracking-tight group-hover:text-yellow-500 transition-colors">
                          {item.subject}
                        </h3>
                        <p className="text-[11px] text-gray-500 mt-2 italic leading-relaxed line-clamp-2 opacity-60 group-hover:opacity-100 transition-opacity">
                          "{item.message}"
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 4px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(234, 179, 8, 0.4); border-radius: 20px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          
          input:focus::placeholder, textarea:focus::placeholder {
            transform: translateX(10px);
            opacity: 0;
            transition: all 0.3s ease;
          }
        `}</style>
      </main>

      <Footer />
    </div>
  );
};

export default FeedbackPage;