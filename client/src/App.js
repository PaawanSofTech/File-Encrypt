import React, { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Homepage from './Components/Home/Homepage.js';
import UserPage from './Components/Home/UserPage.js';
import CompanyPage from './Components/Home/CompanyPage.js';
import SignUp from './Components/Auth/SignUp.js';
// Home route (not connected) //
// User Home route (user connected) //
// company Home route (company connected) //
// Signup route //
// Folder route (different for all the folders)

const App = () => {
  const [connected, setconnected] = useState(false);
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Homepage setconnected={setconnected} />}/>
            <Route path='/user' element={<UserPage setconnected={setconnected} />}/>
            <Route path='/company' element={<CompanyPage setconnected={setconnected} />}/>
            <Route path='/sign-up' element={<SignUp/>}/>
            {/* <Route path={`/folder/:folderName`} element={}/> */}

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
