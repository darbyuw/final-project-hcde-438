import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// This component surrounds the Questions component and ensures that users are only directed to that page after their 
// account has been logged in and authenticated. 
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    // Show loading state or spinner
    return <div className="loading">Loading...</div>;
  }

  if (!currentUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  // Render children if authenticated
  return children;
};

export default ProtectedRoute;