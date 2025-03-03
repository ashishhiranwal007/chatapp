import {create} from 'zustand';

export const useAuthStore =create((set)=>({
    authuser:null,
    isCheckinhAuth:true
}))