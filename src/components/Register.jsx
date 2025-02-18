import React, { useState } from "react";
import axios from "axios"; 
import Navbar from "./NavbarH";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        schoolName,
      });

      setMessage(response.data.message);
      setName("");
      setEmail("");
      setPassword("");
      setSchoolName("");
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div
          className="text-white p-8 rounded-lg shadow-lg w-full max-w-lg border"
          style={{ backgroundColor: "rgb(43, 43, 43)", borderColor: "rgb(55, 55, 55)" }}
        >
          <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            {message && <p className="text-center text-red-500">{message}</p>}
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 rounded-lg text-white placeholder-gray-400 border"
                style={{ backgroundColor: "rgb(55, 55, 55)", borderColor: "rgb(75, 75, 75)" }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 rounded-lg text-white placeholder-gray-400 border"
                style={{ backgroundColor: "rgb(55, 55, 55)", borderColor: "rgb(75, 75, 75)" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 rounded-lg text-white placeholder-gray-400 border"
                style={{ backgroundColor: "rgb(55, 55, 55)", borderColor: "rgb(75, 75, 75)" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="School Name"
                className="w-full p-3 rounded-lg text-white placeholder-gray-400 border"
                style={{ backgroundColor: "rgb(55, 55, 55)", borderColor: "rgb(75, 75, 75)" }}
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                required
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-1/2 p-3 bg-orange-500 rounded-lg text-white font-bold hover:bg-orange-600 transition duration-300">
                Register
              </button>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-1/2 p-3 bg-orange-500 rounded-lg text-white font-bold hover:bg-orange-600 transition duration-300">
                Return to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;


