import React from 'react';
import { BrowserRouter as BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import store from './redux'; 

import Navbar from './components/NavbarH';
import MainSection from './components/MainSection';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from './PublicRoute';
import Contact from './components/Contact';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AdminProtectedRoute from './AdminProtectedRoute';
import ManageUsers from './components/ManageUsers';
import UserSearch from './components/UserSearch';

const App = () => {
  return (
    <Provider store={store}> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainSection />} />
          <Route path="/login" element={<PublicRoute><Login/></PublicRoute>} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/Admindashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
          <Route path="/UserSearch" element={<AdminProtectedRoute><UserSearch /></AdminProtectedRoute>} />
          <Route path="/ManageUsers" element={<AdminProtectedRoute><ManageUsers /></AdminProtectedRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
