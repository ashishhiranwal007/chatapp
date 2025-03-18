import React, { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import { Navigate } from 'react-router-dom';
import {  Routes, Route } from "react-router-dom";

import SettingPage from './pages/Settingpage.jsx';
import ProfilePage from './pages/Profilepage.jsx';
import HomePage from './pages/Homepage.jsx';
import LoginPage from './pages/Loginpage.jsx';
import { SignUpPage } from './pages/Signuppage.jsx';
import { useAuthStore } from './store/useAuthStore.js';
import {Loader} from 'lucide-react'
import { Toaster } from 'react-hot-toast';
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
        <Route path ="/" element ={authuser ? <HomePage /> : <Navigate to ="/login" />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/setting' element={<SettingPage /> } />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
      <Toaster/>
    </div>
  );
}
