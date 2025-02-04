import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { Menu, X } from "lucide-react";
import logo from "/photos/logo.png"; // Ensure the correct path

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function

  const handleBack = () => {
    navigate(-1);  // Goes back to the previous page
  };

  return (
    <nav className="sticky top-0 flex justify-between items-center p-4 bg-purple-600 text-white shadow-lg z-10">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Company Logo" className="h-10" />
        <h1 className="text-xl font-bold">VIZINTEL</h1>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-white transition" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/contact" className="hover:text-white transition" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/login" className="hover:text-white transition" onClick={() => setMenuOpen(false)}>Login</Link>
          <Link to="/AdminLogin" className="hover:text-white transition" onClick={() => setMenuOpen(false)}>Admin Login</Link>
      </div>

      {/* Hamburger Menu (Mobile) */}
      <div className="md:hidden">
        {menuOpen ? (
          <X className="w-6 h-6 cursor-pointer" onClick={() => setMenuOpen(false)} />
        ) : (
          <Menu className="w-6 h-6 cursor-pointer" onClick={() => setMenuOpen(true)} />
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-purple-600 text-white p-4 flex flex-col gap-4 shadow-lg">
          <Link to="/" className="hover:text-white transition" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/contact" className="hover:text-white transition" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link to="/login" className="hover:text-white transition" onClick={() => setMenuOpen(false)}>User Login</Link>
          <Link to="/AdminLogin" className="hover:text-white transition" onClick={() => setMenuOpen(false)}>Admin Login</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

