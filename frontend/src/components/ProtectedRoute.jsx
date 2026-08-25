import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function ProtectedRoute({ children }) {
  const {
    isAuthenticated,
    loading,
  } = useAuth();     // This line uses the useAuth hook to access the authentication state from the AuthContext. It retrieves the isAuthenticated and loading values, which indicate whether the user is authenticated and whether the authentication status is still being determined, respectively.

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;   // This line redirects the user to the login page if they are not authenticated. The "replace" prop ensures that the navigation history is replaced, preventing the user from going back to the protected route using the browser's back button.
  }

  return children;
}

export default ProtectedRoute;