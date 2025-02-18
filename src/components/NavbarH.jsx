import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Attach the event listener to detect clicks outside the dropdown
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="bg-black text-white sticky top-0 z-50 shadow-lg border-2px border-white">

        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img src="photos/logo.png" alt="Logo" className="h-10 w-10" />
              <span className="text-orange-500 text-2xl font-bold ml-2">
                VIZINTEL
              </span>
            </a>
          </div>

          {/* Center Menu */}
          <div className="flex space-x-6">
            <a
              href="/"
              className="hover:text-orange-500 transition duration-300"
            >
              Home
            </a>
            <a
              href="/about"
              className="hover:text-orange-500 transition duration-300"
            >
              About
            </a>
            <a
              href="/services"
              className="hover:text-orange-500 transition duration-300"
            >
              Services
            </a>
            <a
              href="/contact"
              className="hover:text-orange-500 transition duration-300"
            >
              Contact
            </a>
          </div>

          {/* Login Button */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="bg-orange-500 text-white font-bold px-6 py-2 rounded-lg hover:bg-orange-600 transition duration-300"
            >
              Login
            </button>

            {isDropdownOpen && (
              <motion.div
                className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-full border border-gray-300"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Dropdown Buttons */}
                <button
                  className="w-full bg-orange-500 text-white font-bold py-3 border-b rounded-t-lg hover:bg-orange-600 transition duration-300"
                  onClick={() => {
                    navigate("/Login");
                    setIsDropdownOpen(false);
                  }}
                >
                  User
                </button>
                <button
                  className="w-full bg-orange-500 text-white font-bold py-3 rounded-b-lg hover:bg-orange-600 transition duration-300"
                  onClick={() => {
                    navigate("/AdminLogin");
                    setIsDropdownOpen(false);
                  }}
                >
                  Admin
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

