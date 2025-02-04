import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux";
import Navbar from "./NavbarH";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/superadminlogin", {
        email,
        password,
      });

      const adminData = {
        email,
        token: response.data.authToken,
        name: response.data.name,
        identity: response.data.identity,
      };

      document.cookie = `authToken=${adminData.token}; path=/; max-age=604800; Secure`;
      dispatch(loginSuccess(adminData));

      setMessage("Login successful");
      navigate("/AdminDashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
    {/* Navbar at the top */}
    <Navbar />

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <img src="photos\logo.png" alt="Vizintel Logo" className="w-20" />
        </div>

        {/* Form Heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Admin Login</h2>
        <p className="text-center text-gray-600 mb-6">Sign in to manage the platform</p>

        {message && <p className="text-center text-red-500 mb-4">{message}</p>}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

      </div>
    </div>
    </div>
  );
};

export default AdminLogin;

