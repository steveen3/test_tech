import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';

import {
  
  LandingPage,
  Locataire,
  
  
  
} from './pages'



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/locataire" element={<Locataire/>}/>
        
        
        
      </Routes>
    </Router>
  );
}

export default App;
