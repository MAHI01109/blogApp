// src/routes/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user) return <Navigate to="/" />;
  return children;
};
