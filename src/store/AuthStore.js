import Cookies from "js-cookie";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      // ===== Auth =====
      token: Cookies.get("AT") || "",
      authenticate: null,
      tenant: null,
      selectedYears: new Date().getFullYear(),

      // ===== UI States =====
      showUserMenu: false,
      updateProfileModal: false,
      OpenSideBar: false,

      // ===== VROC Module Selection =====
      getDataFromSession: "",

      // ========== Actions ==========
      setToken: (token) => set({ token }),
      setAuthenticate: (authenticate) => set({ authenticate }),
      setTenant: (tenant) => set({ tenant }),
      setSelectedYear: (selectedYears) => set({ selectedYears }),

      setShowUserMenu: (value) => set({ showUserMenu: value }),
      setUpdateProfileModal: (value) =>
        set({ updateProfileModal: value }),
      setOpenSideBar: (value) => set({ OpenSideBar: value }),

      setGetDataFromSession: (value) =>
        set({ getDataFromSession: value }),
    }),

    {
      name: "AUTH_STORE",              // storage key
      getStorage: () => sessionStorage // use sessionStorage
    }
  )
);
