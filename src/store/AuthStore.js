import Cookies from "js-cookie";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  token: Cookies.get("AT") || "",
  authenticate: sessionStorage.getItem("auth")
    ? JSON.parse(sessionStorage.getItem("auth"))
    : null,
  selectedYears: new Date().getFullYear(),
  tenant: sessionStorage.getItem("tenant")
    ? JSON.parse(sessionStorage.getItem("tenant"))?.value
    : null,

  //========== UserProfile in MainLayout ========================
  showUserMenu: false,
  setShowUserMenu: (value) => set(() => ({ showUserMenu: value })),

  //==============updateProfileModal in MainLayout ======================
  updateProfileModal: false,
  setUpdateProfileModal: (value) => set(() => ({ updateProfileModal: value })),

  //============ SideBar ====================================
  OpenSideBar: false,
  setOpenSideBar: (value) => set(() => ({ OpenSideBar: value })),

  //======== VROC MODULE SELECTION =======================
  getDataFromSession: sessionStorage.getItem("VROC") || "",
  setGetDataFromSession: (value) => {
    sessionStorage.setItem("VROC", value);
    set({ getDataFromSession: value });
  },

  // ===================== all functions =====================
  setToken: (token) => set(() => ({ token })),
  setSelectedYear: (selectedYears) => set(() => ({ selectedYears })),
  setAuthenticate: (authenticate) => set(() => ({ authenticate })),
  setTenant: (tenant) => set(() => ({ tenant })),
}));
