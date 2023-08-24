import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './Components/Home/Homepage.js';
 const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/home' element={<Homepage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
