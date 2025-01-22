import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "@/pages/Auth/SignIn";
import SignUp from "@/pages/Auth/SignUp";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import MainLayout from "@/routes/layouts/MainLayout";
import { PrivateRoutes } from "@/routes/PrivateRoutes/PrivateRoutes";
import { VerifyOtp } from "@/constants/Components lazy loading/components.Lazy";
import { useAuthContext } from "@/context";

const AppRoutes = () => {
  const { loginVerify, emailVerify, role, token } = useAuthContext();
  return (
    <Routes>
      {!token || !loginVerify || !emailVerify ? (
        <>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
        </>
      ) : (
        // Redirect to "/verify-otp" if the token is present
        <Route path="*" element={<Navigate to="/" replace />} />
      )}
   
      { token && loginVerify && emailVerify ? <Route element={<MainLayout />}>
        {PrivateRoutes.map((item, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
      </Route> :  <Route path="*" element={<Navigate to="/sign-in" replace />} />}
    </Routes>
  );
};

export default AppRoutes;
