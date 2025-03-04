import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import { checkauth } from '../../../backend/src/controllers/auth.controller';

export const useAuthStore =create((set)=>({
    authuser:null,
    isSigningUp:false,
    isLogingUp:false,
    isUpdatingProfile:false,
    isCheckinhAuth:true,
    checkAuth:async()=>{
        try {
            console.log("hi");
            
            const res =await axiosInstance.get("/auth/check-auth");
            set({authuser:res.data})
        } catch (error) {
            console.log("error in checkauth :",error);
            set({authuser:null});
        }
        finally{
            set({isCheckingAuth:false});
        }
    }
}))
