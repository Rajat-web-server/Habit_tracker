
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0d0d0e] text-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-green-500" />

        <p className="text-sm text-gray-400">
          Getting things ready...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
