import { useState } from "react";
import axios from "axios";

const UserSearch = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      setError("");
      setUsers([]);

      // Construct query parameters
      const query = new URLSearchParams();
      if (email) query.append("email", email);
      if (name) query.append("name", name);

      const response = await axios.get(`http://localhost:5000/api/getusers?${query.toString()}`);
      setUsers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-xl font-bold mb-4">Search Users</h2>

      {/* Email Input */}
      <input
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />

      {/* Name Input */}
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Search
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Display Results */}
      {users.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold">Results:</h3>
          <ul className="list-disc pl-5">
            {users.map((user) => (
              <li key={user._id}>
                <strong>{user.name}</strong> - {user.email}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
