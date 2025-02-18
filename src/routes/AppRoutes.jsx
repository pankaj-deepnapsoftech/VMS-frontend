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
import UnauthorizedAccessPage from "@/pages/UnauthorizedAccess";
import { ClientCisoRoutes } from "./PrivateRoutes/ClientCisoRoutes";

const AppRoutes = () => {
  const { authenticate, token } = useAuthContext();

  // Check if user is authenticated and verify their login and email
  const isAuthenticated = token && authenticate?.email_verification;

  const getRoleBasedRoutes = () => {
    if (!authenticate?.role)
      return [{ path: "/", element: <UnauthorizedAccessPage /> }];

    switch (authenticate.role) {
      case "Admin":
        return PrivateRoutes;
      case "Assessor":
        return authenticate.employee_approve
          ? EmployeeRoutes
          : [{ path: "/", element: <UnauthorizedAccessPage /> }];
      case "ClientSME":
        return ClientSmeRoutes;
      case "ClientCISO":
        return ClientCisoRoutes;
      default:
        return [{ path: "/", element: <UnauthorizedAccessPage /> }];
    }
  };

  return (
    <Routes>
      {/* Public routes */}
      {!isAuthenticated && (
        <>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
        </>
      )}

      {/* Protected routes */}
      {isAuthenticated ? (
        <Route element={<MainLayout />}>
          {getRoleBasedRoutes().map((item, index) => (
            <Route key={index} path={item.path} element={item.element} />
          ))}
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      )}

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
