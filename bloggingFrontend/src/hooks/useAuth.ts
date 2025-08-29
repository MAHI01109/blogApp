import { useContext, useDebugValue } from "react";
import { AuthContext } from "@/context/AuthContext"; // Named export

const useAuth = () => {
  const context = useContext(AuthContext);
  useDebugValue(context, ctx => ctx?.email ? "Logged In" : "Logged Out");
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export default useAuth;