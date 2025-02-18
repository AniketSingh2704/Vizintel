import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux'; 
import { logout } from "../redux";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";


const ManageUsers = () => {
    const { isAuthenticated ,user,token,identity } = useSelector((state) => state.auth);

  const [searchQuery, setSearchQuery] = useState({ email: "", name: "" });
  const [users, setUsers] = useState([]);
  const [updateData, setUpdateData] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value });
  };

  // Fetch users from API
  const handleSearch = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.get(`http://localhost:5000/api/user/profile`, { params: searchQuery });
      setUsers(response.data);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error fetching users");
      setUsers([]);
    }
    setLoading(false);
  };

  // Handle update input changes
  const handleUpdateChange = (e, userId) => {
    setUpdateData({
      ...updateData,
      [userId]: { ...updateData[userId], [e.target.name]: e.target.value },
    });
  };

  // Update user details
  const handleUpdate = async (userId, email) => {
    setLoading(true);
    setMessage("");
    try {
      await axios.put(`http://localhost:5000/api/user/manage?email=${email}`, updateData[userId]);
      setMessage("User updated successfully");
      handleSearch();
    } catch (error) {
      setMessage(error.response?.data?.message || "Error updating user");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6">

      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          name="email"
          placeholder="Search by Email"
          value={searchQuery.email}
          onChange={handleChange}
          className="border p-2"
        />
        <input
          type="text"
          name="name"
          placeholder="Search by Name"
          value={searchQuery.name}
          onChange={handleChange}
          className="border p-2"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2">Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {message && <p className="text-red-500">{message}</p>}

      {users.length > 0 && (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Email</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">School Name</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border">
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">
                  <input
                    type="text"
                    name="newname"
                    placeholder="Update Name"
                    onChange={(e) => handleUpdateChange(e, user._id)}
                    className="border p-1"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    name="newschoolName"
                    placeholder="Update School Name"
                    onChange={(e) => handleUpdateChange(e, user._id)}
                    className="border p-1"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="Update Password"
                    onChange={(e) => handleUpdateChange(e, user._id)}
                    className="border p-1"
                  />
                  <button
                    onClick={() => handleUpdate(user._id, user.email)}
                    className="bg-green-500 text-white px-2 py-1 ml-2"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
};

export default ManageUsers;
