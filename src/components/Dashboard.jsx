import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"; 
import { loginSuccess, logout } from "../redux";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";   

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access authentication status from Redux state 
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('authToken');
    navigate("/login");
  };

  // ✅ Move useEffect INSIDE the Dashboard component
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("authToken", token);
      const decoded = jwtDecode(token);
      
      dispatch(loginSuccess({ 
        email: decoded.email, 
        name: decoded.name, 
        token 
      }));

      navigate("/dashboard"); // ✅ Redirect to remove token from URL
    } else {
      // If no token found, redirect to login page
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return (
    <div className="flex h-screen"> 

      {/* Dashboard Content */}
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-4">Welcome, {user?.name}!</h2>
        <p className="text-gray-700 mb-4">
          You are {isAuthenticated ? 'logged in' : 'not logged in'}.
        </p>

        <button
          onClick={handleLogout}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-700">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

