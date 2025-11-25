import Cookies from "js-cookie";
import { create } from "zustand";


export const useAuthStore = create((set) => ({
    token:Cookies.get("AT") || "",
    authenticate: sessionStorage.getItem("auth") ? JSON.parse(sessionStorage.getItem("auth")) : null,
    selectedYears:new Date().getFullYear(),
    tenant:sessionStorage.getItem('tenant') ? JSON.parse(sessionStorage.getItem('tenant'))?.value : null,

    // ===================== all functions =====================
    setToken:(token) => set(()=>({token})),
    setSelectedYear:(selectedYears) => set(() => ({selectedYears})),
    setAuthenticate:(authenticate) => set(()=>({authenticate})),
    setTenant:(tenant) => set(()=>({tenant}))

}));


