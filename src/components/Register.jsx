import React, { useState } from "react";
import axios from "axios";
import Navbar from "./NavbarH"; // Import Navbar

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [message, setMessage] = useState("");

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
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar at the top */}
      <Navbar />

      {/* Centered Registration Container */}
      <div className="flex items-center justify-center h-screen">
        <div className="flex w-4/5 max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
          
          {/* Left Section - Branding & Logo */}
          <div className="w-1/2 bg-gradient-to-br from-purple-500 to-purple-700 text-white flex flex-col justify-center items-center p-8">
            <img src="photos/logo.png" alt="Vizintel Logo" className="w-32 mb-6" />
            <h2 className="text-3xl font-bold mb-4">Welcome to Vizintel!</h2>
            <p className="text-center mb-6">
              Sign up with your details to access exclusive features.
            </p>
          </div>

          {/* Right Section - Registration Form */}
          <div className="w-1/2 p-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Sign Up</h2>
            <p className="text-center text-gray-600 mb-6">Create your account</p>

            {message && <p className="text-center text-red-500 mb-4">{message}</p>}

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

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

              <div>
                <input
                  type="text"
                  placeholder="School Name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
              >
                Register
              </button>
            </form>

            <p className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <a href="/login" className="text-purple-600 hover:underline">
                Sign In
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;

