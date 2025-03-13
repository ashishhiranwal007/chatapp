import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import { checkauth } from '../../../backend/src/controllers/auth.controller.js';

export const useAuthStore =create((set)=>({
    authuser:null,
    isSigningUp:false,
    isLogingUp:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    checkauth:async () => {
        try {
            const res = await axiosInstance.get("/auth/check-auth");
      
            set({ authUser: res.data });
            get().connectSocket();
          } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
          } finally {
            set({ isCheckingAuth: false });
          }
    }
}))
