
import React from 'react';
import { BrowserRouter as Router, Routes, Route ,Navigate } from 'react-router-dom';

import Register from '../pages/registerPage';
import Login from '../pages/loginPage';
import ForgetPassword from '../pages/forgetPassword';
import ResetPassword from '../pages/resetPassword'
import HomePage from '../pages/homePage';
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> 
       <Route path="/" element={<Navigate to="/login" replace />}  /> 
       <Route path="/register" element={<Register />} />  
       <Route path ="/forget-password" element={<ForgetPassword />} />     
       <Route path ="/reset-password/:token" element={<ResetPassword />} />
       <Route path ="home" element={<HomePage />}  />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
