import React, { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './Components/Home/Homepage.js';
import LandingPage from './Components/Home/LandingPage.js';

const App = () => {
  const [connected, setconnected] = useState(false);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/file-guardian' element={<LandingPage/>}/>
          <Route path='/' element={<Homepage setconnected={setconnected} />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
