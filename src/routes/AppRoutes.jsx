import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "@/pages/Auth/SignIn";
import SignUp from "@/pages/Auth/SignUp";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import MainLayout from "@/routes/layouts/MainLayout";
import { PrivateRoutes } from "@/routes/PrivateRoutes/PrivateRoutes";
import {
  PageNotFound,
  ResetPassword,
  VerifyOtp,
} from "@/constants/Components-lazy-loading/components.Lazy";
import { useAuthContext } from "@/context";
import { EmployeeRoutes } from "./PrivateRoutes/employeeRoutes";
import { ClientSmeRoutes } from "./PrivateRoutes/clientSmeRoutes";

const AppRoutes = () => {
  const { authenticate, token } = useAuthContext();

  // Check if user is authenticated and verify their login and email
  const isAuthenticated = token && authenticate?.email_verification;

  return (
    <Routes>
      {/* Public routes */}
      {!isAuthenticated ? (
        <>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
        </>
      ) : (
        <Route path="/*" element={<Navigate to="/" replace />} />
      )}

      {/* Protected routes */}
      {isAuthenticated  ? (
        <Route element={<MainLayout />}>
          {(authenticate.role === "Admin"  ? PrivateRoutes :authenticate.role === "Assessor" && authenticate.employee_approve ? EmployeeRoutes : authenticate.role === "ClientSME"  ? ClientSmeRoutes : [{path:"/",element:<PageNotFound />}]).map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}
        </Route>
      ) : (
        <Route path="/*" element={<Navigate to="/sign-in" replace />} />
      )}

      
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
