import { createContext, useCallback, useEffect, useState } from "react";
import { loginUser, registerUser, getCurrentUser } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async (authToken = token) => {
    if (!authToken) {
      setUser(null);
      setLoading(false);
      return;
    }

    const response = await getCurrentUser(authToken);

    if (response.ok) {
      setUser(response.data.user);
    } else {
      localStorage.removeItem("token");
      setToken("");
      setUser(null);
    }

    setLoading(false);
  }, [token]);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);
  /* eslint-enable react-hooks/set-state-in-effect */

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
        setUser,
        refreshUser,
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
