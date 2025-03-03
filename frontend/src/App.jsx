import React from 'react'
import {Router,Route} from "react-router-dom"
import Signuppage from './pages/Signuppage.jsx';
import Loginpage from './pages/Loginpage.jsx';
import Settingspage from './pages/Settingspage.jsx';
import Profilepage from './pages/Profilepage.jsx';
import Homepage from './pages/Homepage.jsx';
export default function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/signup' element={<Signuppage/>}/>
        <Route path='/login' element={<Loginpage/>}/>
        <Route path='/setting' element={<Settingspage/>}/>
        <Route path='/profile' element={<Profilepage/>}/>
      </Routes>
    </div>
  )
}
