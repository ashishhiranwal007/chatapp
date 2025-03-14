import React, { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import { Routes, Route } from "react-router-dom";
import Signuppage from './pages/Signuppage.jsx';
import Loginpage from './pages/Loginpage.jsx';
import Settingpage from './pages/Settingpage.jsx';
import Profilepage from './pages/Profilepage.jsx';
import Homepage from './pages/Homepage.jsx';
import { useAuthStore } from './Store/useAuthStore.js';
import {Loader} from 'lucide-react'
export default function App() {
  const { authuser, checkauth, isCheckingAuth } = useAuthStore();
  
  useEffect(() => {
    checkauth();
  }, [checkauth]);
  if (isCheckingAuth && !authuser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin'></Loader>
    </div>
  );
  

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/signup' element={<Signuppage />} />
        <Route path='/login' element={<Loginpage />} />
        <Route path='/setting' element={<Settingpage />} />
        <Route path='/profile' element={<Profilepage />} />
      </Routes>
    </div>
  );
}
