import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const response = await register(formData);

    if (response.ok) {
      navigate("/login", {
        state: { successMessage: "Registration successful. Please login." },
      });
    } else {
      setError(response.message);
    }
    setIsSubmitting(false);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-fixed bg-center bg-no-repeat py-12 px-6 relative font-sans tracking-tight flex items-center justify-center"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')` 
      }}
    >
      <div className="w-full max-w-md relative z-10">
        
        {/* --- Register Card --- */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
              Create <span className="text-yellow-500">Account</span>
            </h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">
              Start tracking workouts and nutrition today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Full Name Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="ENTER YOUR FULL NAME"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-500 transition-all text-white placeholder:text-gray-700 text-sm font-bold uppercase"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="ENTER YOUR EMAIL"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-500 transition-all text-white placeholder:text-gray-700 text-sm font-bold uppercase"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="MINIMUM 6 CHARACTERS"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-500 transition-all text-white placeholder:text-gray-700 text-sm font-bold uppercase"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-2xl">
                <p className="text-red-400 text-xs font-bold uppercase tracking-wider text-center">
                  {error}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-5 bg-yellow-500 text-black font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-all duration-500 transform active:scale-95 disabled:opacity-50 shadow-xl mt-4"
            >
              {isSubmitting ? "Processing..." : "Register Now"}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-yellow-500 hover:text-white transition-colors duration-300 font-black"
              >
                Login Here
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="mt-6 text-center">
          <Link 
            to="/"
            className="text-gray-600 text-[10px] font-black uppercase tracking-[0.2em] hover:text-yellow-500 transition-colors duration-300"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;