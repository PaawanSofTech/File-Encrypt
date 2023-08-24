import './App.scss'
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './Components/Home/Homepage.js';
import SignUp from './Components/Auth/SignUp.js';
 const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/home' element={<Homepage/>}/>
            <Route path='/sign-up' element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
