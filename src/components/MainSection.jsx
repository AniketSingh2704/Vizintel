import React, { useState } from "react";
import Navbar from "./NavbarH";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <header className="text-center py-16 bg-gray-100">
        <h2 className="text-3xl font-bold">AI-Powered Data Visualization & Analytics</h2>
        <p className="mt-4 text-lg">Upload data, generate interactive graphs, and get AI-driven insights.</p>
      </header>

      {/* Features Section */}
      <section className="p-8">
        <h3 className="text-2xl font-bold text-center mb-6">Key Features</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-200 rounded shadow-md">
            <h4 className="font-semibold">Excel Upload</h4>
            <p>Upload Excel files to analyze your data.</p>
          </div>
          <div className="p-4 bg-gray-200 rounded shadow-md">
            <h4 className="font-semibold">2D & 3D Graphs</h4>
            <p>Generate interactive visualizations.</p>
          </div>
          <div className="p-4 bg-gray-200 rounded shadow-md">
            <h4 className="font-semibold">AI Insights</h4>
            <p>Analyze trends, detect anomalies, and get predictions.</p>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="p-8 bg-gray-100">
        <h3 className="text-2xl font-bold text-center mb-6">Technology Stack</h3>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <p>Frontend: React.js, Redux, Tailwind CSS</p>
          <p>Backend: Node.js, Express.js, MongoDB</p>
          <p>AI: Python, Flask/FastAPI</p>
        </div>
      </section>
    </div>
  );
};

export default Home;


