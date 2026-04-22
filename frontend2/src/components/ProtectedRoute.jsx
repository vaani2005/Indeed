import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { isAuthenticated, userType, isLoading } = useAuth();

  // ✅ SHOW NOTHING WHILE CHECKING AUTH STATE
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // ✅ NOT LOGGED IN
  if (!isAuthenticated) {
    if (requiredRole === "employer") {
      return <Navigate to="/employer-login" replace />;
    }
    return <Navigate to="/loginsignup" replace />;
  }

  // ✅ WRONG ROLE
  if (requiredRole && userType !== requiredRole) {
    if (requiredRole === "employer") {
      return <Navigate to="/employer-login" replace />;
    }
    return <Navigate to="/loginsignup" replace />;
  }

  // ✅ AUTHORIZED - RENDER CHILDREN
  return children;
}
