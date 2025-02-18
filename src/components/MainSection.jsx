import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import Navbar from "./NavbarH"; // Import NavbarH component
import { FaReact, FaNodeJs, FaDatabase } from "react-icons/fa"; // Import icons for tech stack

const MainSection = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleGetStarted = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative py-24 px-6 md:px-12 bg-gradient-to-r from-black via-gray-900 to-black">
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl font-extrabold mb-4 text-orange-500">
            Welcome to My AI-Powered Platform
          </h1>
          <p className="text-xl mb-6 text-gray-300">
            Build interactive 2D/3D graphs, analyze trends, and uncover insights with ease. Join today and experience the future of data analytics.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 px-8 rounded-lg transition duration-300 shadow-lg"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Project Info Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center text-white mb-8">
          Welcome to My Project
        </h2>
        <p className="text-center text-lg text-gray-400 mb-4">
          This is a full-stack MERN application with AI-driven insights, 2D/3D graph visualizations, and more.
        </p>
        <p className="text-center text-lg text-gray-400">
          The project features user authentication, real-time updates, and a scalable backend with MongoDB and Node.js.
        </p>
      </div>

      {/* Tech Stack Section */}
      <div className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-semibold text-center text-white mb-6">
          Technologies Used
        </h3>
        <div className="flex justify-center gap-8">
          <div className="flex flex-col items-center">
            <FaReact className="text-6xl text-blue-500 mb-2" />
            <p className="text-lg text-gray-300">React</p>
          </div>
          <div className="flex flex-col items-center">
            <FaNodeJs className="text-6xl text-green-500 mb-2" />
            <p className="text-lg text-gray-300">Node.js</p>
          </div>
          <div className="flex flex-col items-center">
            <FaDatabase className="text-6xl text-yellow-500 mb-2" />
            <p className="text-lg text-gray-300">MongoDB</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gray-900 py-6">
        <div className="container mx-auto text-center">
          <p className="text-gray-500">&copy; 2025 AI-Powered Data Visualization Platform. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default MainSection;


