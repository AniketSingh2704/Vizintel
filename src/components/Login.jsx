import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux";
import Navbar from "./NavbarH"; // Import Navbar

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the previous path (where the user came from)
  const from = sessionStorage.getItem("redirectPath") || "/dashboard";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const userData = {
        email,
        token: response.data.authToken,
        name: response.data.name,
        identity: response.data.identity,
      };

      document.cookie = `authToken=${userData.token}; path=/; max-age=604800; Secure`;
      dispatch(loginSuccess(userData));

      setMessage("Login successful");
      navigate(from); // Navigate back to the stored path or dashboard by default
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Store the current path when the component mounts, for redirect after login
  useEffect(() => {
    if (!sessionStorage.getItem("redirectPath")) {
      sessionStorage.setItem("redirectPath", window.location.pathname);
    }
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar at the top */}
      <Navbar />

      {/* Centered Login Container */}
      <div className="flex items-center justify-center h-screen">
        <div className="flex w-4/5 max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
          
          {/* Left Section - Login Form */}
          <div className="w-1/2 p-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Sign In</h2>
            <p className="text-center text-gray-600 mb-6">Use your email and password</p>

            {message && <p className="text-center text-red-500 mb-4">{message}</p>}

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

            <p className="text-center text-gray-600 mt-4">
              <a href="/register" className="text-purple-600 hover:underline">
                Sign Up
              </a>
            </p>
          </div>

          {/* Right Section - Branding & Logo */}
          <div className="w-1/2 bg-gradient-to-br from-purple-500 to-purple-700 text-white flex flex-col justify-center items-center p-8">
            <img src="photos/logo.png" alt="Vizintel Logo" className="w-32 mb-6" />
            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-center mb-6">
              Sign in to access your dashboard and explore features.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;

