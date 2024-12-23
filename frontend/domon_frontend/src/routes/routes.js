
import React from 'react';
import { BrowserRouter as Router, Routes, Route ,Navigate } from 'react-router-dom';


import Header from '../components/header'
import Register from '../pages/registerPage';
import Login from '../pages/loginPage';
 import ForgetPassword from '../pages/forgetPassword';
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />}  />
        <Route path="/register" element={<Register />} /> 
        <Route path ="/forget-password" element={<ForgetPassword />} />    

      </Routes>
    </Router>
  );
};

export default AppRoutes;
