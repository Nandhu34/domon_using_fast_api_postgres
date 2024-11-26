
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Header from '../components/header'
import Register from '../pages/registerPage';
import Login from '../pages/loginPage';
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />        
      </Routes>
    </Router>
  );
};

export default AppRoutes;
