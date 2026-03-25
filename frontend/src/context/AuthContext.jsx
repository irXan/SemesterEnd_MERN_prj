import { createContext, useEffect, useState } from "react";
import { loginUser, registerUser, getCurrentUser } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await getCurrentUser(token);

      if (response.ok) {
        setUser(response.data.user);
      } else {
        localStorage.removeItem("token");
        setToken("");
        setUser(null);
      }

      setLoading(false);
    };

    loadUser();
  }, [token]);

  const login = async (formData) => {
    const response = await loginUser(formData);

    if (response.ok) {
      setToken(response.data.token);
      setUser(response.data.user);
      localStorage.setItem("token", response.data.token);
    }

    return response;
  };

  const register = async (formData) => {
    return registerUser(formData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        isAuthenticated: Boolean(token),
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
