import React, { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './Components/Home/Homepage.js';
// import SignUp from './Components/Auth/SignUp.js';
 const App = () => {
  const [connected, setconnected] = useState(false);
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Homepage setconnected={setconnected} />}/>
            {/* <Route path='/sign-up' element={}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
