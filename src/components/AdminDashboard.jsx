// frontend/src/components/AdminDashboard.js

import React from 'react';
import { useSelector } from 'react-redux'; 




const AdminDashboard = () => {
    const { isAuthenticated,user,token,name,identity } = useSelector((state) => state.auth);

  return (
    <div className="AdminDashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome to your admin dashboard!</p>
      <h1>{user}</h1>
      <h1>{name}</h1>
      <h1>{token}</h1>
      <h1>{identity == 1 ?'admin':'user'}</h1>

      
    </div>
  );
};

export default AdminDashboard;
