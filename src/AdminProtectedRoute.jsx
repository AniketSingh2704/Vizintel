import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminDashboard from "./components/AdminDashboard";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated ,user,token,identity } = useSelector((state) => state.auth);

  
  return isAuthenticated && identity ? <>{children}</> : <Navigate to="/Adminlogin" />;
};

export default ProtectedRoute;
