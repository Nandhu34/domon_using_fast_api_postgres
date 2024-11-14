
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Header from '../components/header'
import Login from '../pages/registerPage';
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
        
      </Routes>
    </Router>
  );
};

export default AppRoutes;
