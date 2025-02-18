import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../redux";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const UserSearch = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const dispatch = useDispatch(); // Initialize useDispatch hook
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      setError("");
      setUsers([]);

      // Construct query parameters
      const query = new URLSearchParams();
      if (email) query.append("email", email);
      if (name) query.append("name", name);

      // Call the backend server.js code
      const response = await axios.get(
        `http://localhost:5000/api/user/profile?${query.toString()}`
      );
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleLogout = () => {
    // Remove the token from localStorage cookies
    dispatch(logout());
    localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Include AdminNavbar at the top */}
      <AdminNavbar />

      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
        <h2 className="text-3xl font-bold text-center mb-6">Search Users</h2>

        {/* Email Input */}
        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <p className="text-center mb-4">or</p>

        {/* Name Input */}
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Search
        </button>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {/* Display Results */}
        {users.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold text-lg">Results:</h3>
            <ul className="list-disc pl-6">
              {users.map((user) => (
                <li key={user._id}>
                  <strong>{user.name}</strong> - {user.email} - {user.schoolName}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Logout Button */}
      <div className="text-center mt-8">
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserSearch;

