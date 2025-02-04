// Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-semibold">My Website</div>
        <ul className="flex space-x-6">
          <li>
            <a href="#home" className="text-white hover:text-purple-400">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="text-white hover:text-purple-400">
              About
            </a>
          </li>
          <li>
            <a href="#services" className="text-white hover:text-purple-400">
              Services
            </a>
          </li>
          <li>
            <a href="#contact" className="text-white hover:text-purple-400">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
