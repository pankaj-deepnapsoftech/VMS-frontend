/* eslint-disable no-const-assign */
import { AxiosHandler, NewDecryptionToken } from "@/config/AxiosConfig";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

// eslint-disable-next-line react-refresh/only-export-components
export const authContext = createContext({
  token: "",
  authenticate: null,
  tenant: "",
  GetSecuirityQuestion: () => { },
  selectedYear: new Date().getFullYear(),
  setSelectedYear: () => { },
});

// eslint-disable-next-line react/prop-types
const AuthContextProvider = ({ children }) => {
  let navigate = useNavigate();

  const [token, setToken] = useState(Cookies.get("AT"));
  const [tenant, setTenant] = useState();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [runner, setRunner] = useState(1);
  const [authenticate, setAuthenticate] = useState(() => {
    try {
      const saved = sessionStorage.getItem("auth");
      return saved ? JSON.parse(saved) : null;
    } catch (err) {
      console.error("Error parsing session storage auth:", err);
      return null;
    }
  });
  const [updateProfileModal, setUpdateProfileModal] = useState(false);
  const [UserViaTenant, setuserViaTenant] = useState([]);
  const [getDataFromSession, setGetDataFromSession] = useState(() => {
    return sessionStorage.getItem("VROC");
  });

  const [OpenSideBar, setOpenSideBar] = useState(false);




  const Signup = async (data, navigation) => {
    const toastId = toast.loading("Loading...");

    console.log("this is context data", data);

    let newData;

    if (data.role !== "ClientSME") {
      newData = {
        Organization: data.Organization,
        email: data.email,
        full_name: data.full_name,
        password: data.password,
        phone: data.phone,
        role: data.role,
        security_questions: data.security_questions,
        employee_approve: data.employee_approve,
        email_verification: data.email_verification,
      };
    } else {
      newData = data;
    }

    setLoading(true);
    try {
      const res = await AxiosHandler.post("/auth/create", newData);

      if (!navigation) {
        AxiosHandler.defaults.headers.authorization = `Bearer ${res.data.token}`;
        Cookies.set("token", res.data.token, { expires: 1 });
        setToken(res.data.token);
        navigate("/");
      }

      toast.dismiss(toastId);
      toast.success(res.data.message);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const Forgotpassword = async (data) => {
    const toastId = toast.loading("Loading...");

    setLoading(true);
    try {
      const res = await AxiosHandler.post("/auth/verify-email", data);
      setToken(res.data.token);
      toast.dismiss(toastId);
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyotp = async (data) => {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    try {
      const res = await AxiosHandler.post("/auth/verify-otp", data);
      toast.dismiss(toastId);
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const Resetpassword = async (data, token) => {
    const toastId = toast.loading("Loading...");

    setLoading(true);
    try {
      const res = await AxiosHandler.post(
        `/auth/reset-password/${token}`,
        data
      );
      toast.dismiss(toastId);
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      //console.log(error)
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const ResendOtp = async (email) => {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    try {
      const res = await AxiosHandler.put("/auth/resend-otp", { email });
      toast.dismiss(toastId);
      toast.success(res.data.message);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const Logout = async () => {
    const toastId = toast.loading("Loading...");

    setLoading(true);
    try {
      const res = await AxiosHandler.get("/auth/logout");
      Cookies.remove("AT", res.data.token);
      toast.dismiss(toastId);
      toast.success(res.data.message);
      setAuthenticate(null);
      setGetDataFromSession(null);
      sessionStorage.removeItem("VROC");
      navigate("/");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const ChangePassword = async (data) => {
    try {
      const res = await AxiosHandler.put("/auth/change-password", data);
      console.log(res);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const ChangeStatus = async (data, id) => {
    setLoading(true);
    try {
      const res = await AxiosHandler.put(`/auth/deactivate/${id}`, data);
      toast.success(res.data.message);
      setRunner((prev) => prev + 1);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const UpdateProfile = async (data, id) => {
    setLoading(true);
    try {
      const res = await AxiosHandler.put(`/auth/update/${id}`, data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const ResetWithQuestion = async (data) => {
    setLoading(true);
    try {
      const res = await AxiosHandler.put(
        `/auth/reset-password-question/${data.email}`,
        data
      );
      window.location.href = res.data.resetLink;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const Verifyrecaptcha = async (token) => {
    setLoading(true);
    try {
      const res = await AxiosHandler.post(`/auth/verify-recaptcha`, { token });
      console.log(res);
      return res.data.success;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const GetTenantData = async (tenant) => {
    try {
      const res = await AxiosHandler.get(
        `/auth/user-by-tenant?tenant=${tenant ? tenant : ""}`
      );
      setuserViaTenant(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const GetSecuirityQuestion = async (email) => {
    try {
      const res = await AxiosHandler.get(
        `/auth/change-password-question?email=${email}`
      );
      if (res?.data?.url) {
        window.location.href = res?.data?.url;
      }
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    if (!authenticate?.role || authenticate?.part_securend) {
      const params = new URLSearchParams(window.location.search);
      setTenant(params.get("tenant") || "");
    } else {
      setTenant(authenticate?.tenant || "");
    }
  }, [location.search, authenticate]);

  return (
    <authContext.Provider
      value={{
        loading,
        verifyotp,
        ResendOtp,
        Forgotpassword,
        Resetpassword,
        Signup,
        Logout,
        token,
        authenticate,
        ChangePassword,
        ChangeStatus,
        runner,
        getDataFromSession,
        setGetDataFromSession,
        OpenSideBar,
        setOpenSideBar,
        showUserMenu,
        setShowUserMenu,
        UpdateProfile,
        setUpdateProfileModal,
        updateProfileModal,
        ResetWithQuestion,
        GetTenantData,
        UserViaTenant,
        Verifyrecaptcha,
        tenant,
        GetSecuirityQuestion,
        selectedYear,
        setSelectedYear,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
