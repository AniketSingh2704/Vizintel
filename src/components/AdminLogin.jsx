import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from "../redux"; // Import login action
import Navbar from "./NavbarH";

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize useDispatch hook

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/superadminlogin', {
        email,
        password,
      });

      setMessage('Login successful');

      const adminData = { email, token: response.data.authToken, name: response.data.name, identity: response.data.identity };
      console.log(response);

      dispatch(loginSuccess(adminData));

      document.cookie = `authToken=${adminData.token}; path=/; max-age=604800; Secure`;

      navigate('/AdminDashboard');
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Login Section */}
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div
          className="text-white p-8 rounded-lg shadow-lg w-full max-w-lg border"
          style={{ backgroundColor: "rgb(43, 43, 43)", borderColor: "rgb(55, 55, 55)" }}
        >
          <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            {message && <p className="text-center text-red-500">{message}</p>}
            <div>
              <label className="block text-gray-300 mb-1">Email</label>
              <input
                type="email"
                className="w-full p-3 rounded-lg text-white placeholder-gray-400 border"
                style={{
                  backgroundColor: "rgb(55, 55, 55)",
                  borderColor: "rgb(75, 75, 75)",
                }}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Password</label>
              <input
                type="password"
                className="w-full p-3 rounded-lg text-white placeholder-gray-400 border"
                style={{
                  backgroundColor: "rgb(55, 55, 55)",
                  borderColor: "rgb(75, 75, 75)",
                }}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 accent-orange-500" />
                Show password
              </label>
              <a href="#" className="text-orange-500 hover:underline">Forgot password?</a>
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-orange-500 rounded-lg text-white font-bold hover:bg-orange-600 transition duration-300"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-300 mb-4">OR</p>
            <button
              className="flex items-center justify-center w-full p-3 text-white font-bold rounded-lg transition duration-300"
              style={{
                backgroundColor: "rgb(55, 55, 55)",
                borderColor: "rgb(75, 75, 75)",
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google Logo"
                className="w-5 h-5 mr-2"
              />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;








