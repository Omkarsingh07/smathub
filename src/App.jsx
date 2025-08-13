import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './landingPage/landing';
import Dashboard from './content/dashboard';
import Instagram from './content/instagram';
import Facebook from './content/facebook';
import Youtube from './content/youtube';
import SmartScheduling from './calender/smart-scheduling';
import Authantication from './authantication/auth';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
  
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/instagram" element={<Instagram />} />
      <Route path="/facebook" element={<Facebook />} />
      <Route path="/youtube" element={<Youtube />} />
      <Route path="/smart-scheduling" element={<SmartScheduling />} />
      <Route path="/auth" element={<Authantication />} />
    </Routes>
  );
}

export default App;
