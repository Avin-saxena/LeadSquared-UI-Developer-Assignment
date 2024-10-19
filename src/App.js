import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import EasyLevel from './components/EasyLevel';
import MediumLevel from './components/MediumLevel';
import HardLevel from './components/HardLevel';
import './App.css';



function App() {
  

  return (
    <Router>
    <Navbar />
    <Routes>
      <Route path="/easy" element={<EasyLevel />} />
      <Route path="/medium" element={<MediumLevel />} />
      <Route path="/hard" element={<HardLevel />} />
      <Route path="/" element={<Navigate to="/easy" />} />
    </Routes>
  </Router>
);
}

export default App;
