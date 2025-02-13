
import React from 'react';
import { BrowserRouter as Router, Routes, Route ,Navigate } from 'react-router-dom';

import Register from '../pages/registerPage';
import Login from '../pages/loginPage';
import ForgetPassword from '../pages/forgetPassword';
import ResetPassword from '../pages/resetPassword'
import HomePage from '../pages/homePage';
import AboutUs from '../pages/aboutus';
import globalErrorHandler from "../global_error_handler";


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> 
       <Route path="/" element={<Navigate to="/login" replace />}  /> 
       <Route path="/register" element={<Register />} />  
       <Route path ="/forget-password" element={<ForgetPassword />} />     
       <Route path ="/reset-password/:token" element={<ResetPassword />} />
       <Route path ="/home" element={<HomePage />}  />
       <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
