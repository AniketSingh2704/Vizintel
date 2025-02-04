import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated,user,token,identity } = useSelector((state) => state.auth);

  
  return isAuthenticated  && !identity ?<><Navbar/>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
