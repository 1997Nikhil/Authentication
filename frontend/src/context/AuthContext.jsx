import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;     // This line creates a boolean variable isAuthenticated that indicates whether the user is authenticated or not. It uses the double negation operator (!!) to convert the user state into a boolean value. If the user state is not null (i.e., a user is logged in), isAuthenticated will be true; otherwise, it will be false.

  // Get current logged-in user
  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");   // This line retrieves the JWT token from the browser's local storage. The token is stored in local storage when the user logs in, and it is used to authenticate subsequent requests to the server. If the token is not found, it indicates that the user is not logged in, and the function will set the user state to null and loading state to false, effectively ending the authentication check.

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      const response = await api.get("/user/profile");

      setUser(response.data.user);
    } catch (error) {
      console.log("Authentication failed");

      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  // Login
  const login = async (email, password) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const {token} = response.data;

    localStorage.setItem("token", token);

    // Get user information
    await getCurrentUser();

    return response.data;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};