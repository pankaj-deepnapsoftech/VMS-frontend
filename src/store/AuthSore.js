import Cookies from "js-cookie";
import { create } from "zustand";


export const useAuthStore = create((set) => ({
    token:Cookies.get("AT") || "",
    authenticate: sessionStorage.getItem("auth") ? JSON.parse(sessionStorage.getItem("auth")) : null,
    selectedYears:"",
    tenant:"",

    // ================== all functions ==================
    setToken:(token) => set(()=>({token})),
    setSelectedYear:(selectedYears) => set(() => ({selectedYears}))




}));


