import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "@/pages/Auth/SignIn";
import SignUp from "@/pages/Auth/SignUp";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import MainLayout from "@/routes/layouts/MainLayout";
import { PrivateRoutes } from "@/routes/PrivateRoutes/PrivateRoutes";
import { VerifyOtp } from "@/constants/Components lazy loading/components.Lazy";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route element={<MainLayout />} >
        {PrivateRoutes.map((item, index) => (
          <Route key={index} path={item.path} element={item.element} />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
