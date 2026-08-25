import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function ProtectedRoute({ children }) {
  const {
    isAuthenticated,
    loading,
  } = useAuth();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;   // This line redirects the user to the login page if they are not authenticated. The "replace" prop ensures that the navigation history is replaced, preventing the user from going back to the protected route using the browser's back button.
  }

  return children;
}

export default ProtectedRoute;