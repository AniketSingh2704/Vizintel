import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux";
import Navbar from "./NavbarH";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      setMessage("Login successful");
      const userData = { email, token: response.data.authToken, name: response.data.name, identity: response.data.identity };
      dispatch(loginSuccess(userData));
      document.cookie = `authToken=${userData.token}; path=/; max-age=604800; Secure`;
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white p-8 rounded-lg shadow-lg w-full max-w-lg border" style={{ backgroundColor: "rgb(43, 43, 43)", borderColor: "rgb(55, 55, 55)" }}>
          <h2 className="text-3xl font-bold text-center mb-6">User Login</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            {message && <p className="text-center text-red-500">{message}</p>}
            <div>
              <label className="block text-gray-300 mb-1">Email</label>
              <input type="email" className="w-full p-3 rounded-lg text-white placeholder-gray-400 border" style={{ backgroundColor: "rgb(55, 55, 55)", borderColor: "rgb(75, 75, 75)" }} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Password</label>
              <input type="password" className="w-full p-3 rounded-lg text-white placeholder-gray-400 border" style={{ backgroundColor: "rgb(55, 55, 55)", borderColor: "rgb(75, 75, 75)" }} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 accent-orange-500" />
                Show password
              </label>
              <a href="#" className="text-orange-500 hover:underline">Forgot password?</a>
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="w-1/2 p-3 bg-orange-500 rounded-lg text-white font-bold hover:bg-orange-600 transition duration-300">Login</button>
              <button type="button" onClick={() => navigate('/register')} className="w-1/2 p-3 bg-orange-500 rounded-lg text-white font-bold hover:bg-orange-600 transition duration-300">Register</button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-300 mb-4">OR</p>
            <button onClick={() => window.open("http://localhost:5000/auth/google", "_self")}className="flex items-center justify-center w-full p-3 text-white font-bold rounded-lg transition duration-300">
              <img src="photos\Google__G__logo.svg.png" alt="Google Logo" className="w-5 h-5 mr-2" />
             Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;




