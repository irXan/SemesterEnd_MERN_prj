import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const FULL_NAME_REGEX = /^(?=.{2,60}$)[A-Za-z]+(?: [A-Za-z]+)*$/;
const EMAIL_REGEX = /^[A-Za-z0-9][A-Za-z0-9._%+-]*@[A-Za-z0-9-]+(?:\.[A-Za-z]{2,})+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[^\s]{8,100}$/;

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


    const trimmedFullName = formData.fullName.trim();
    const trimmedEmail = formData.email.trim();

    if (!FULL_NAME_REGEX.test(trimmedFullName)) {
      setError("Full name must contain only letters, with single spaces between words and no symbols.");
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setError("Email must start with a letter or number and be in a valid format.");
      return;
    }

    if (!PASSWORD_REGEX.test(formData.password)) {
      setError("Password must be 8 to 100 characters and include uppercase, lowercase, number, and special character.");
      return;
    }

    setIsSubmitting(true);

    const response = await register({
      ...formData,
      fullName: trimmedFullName,
      email: trimmedEmail,
    });


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

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl">

          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
              Create <span className="text-yellow-500">Account</span>
            </h1>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">
              Start tracking workouts and nutrition today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 tracking-[0.2em] ml-1">
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
                pattern="^(?=.{2,60}$)[A-Za-z]+(?: [A-Za-z]+)*$"
                title="Full name must contain only letters, with single spaces between words and no symbols."

                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-500 transition-all text-white placeholder:text-gray-700 text-sm font-bold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 tracking-[0.2em] ml-1">
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
                pattern="^[A-Za-z0-9][A-Za-z0-9._%+\-]*@[A-Za-z0-9-]+(?:\.[A-Za-z]{2,})+$"
                title="Email must start with a letter or number and be in a valid format."

                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-500 transition-all text-white placeholder:text-gray-700 text-sm font-bold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 tracking-[0.2em] ml-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="MINIMUM 8 CHARACTERS"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[^\s]{8,100}$"
                title="Password must be 8 to 100 characters and include uppercase, lowercase, number, and special character."
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-500 transition-all text-white placeholder:text-gray-700 text-sm font-bold"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-2xl">
                <p className="text-red-400 text-xs font-bold uppercase tracking-wider text-center">
                  {error}
                </p>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-5 bg-yellow-500 text-black font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-all duration-500 transform active:scale-95 disabled:opacity-50 shadow-xl mt-4"
            >
              {isSubmitting ? "Processing..." : "Register Now"}
            </button>
          </form>

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