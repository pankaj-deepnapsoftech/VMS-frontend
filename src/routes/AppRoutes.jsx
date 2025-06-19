import { Routes, Route } from "react-router-dom";
import SignIn from "@/pages/Auth/SignIn";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import MainLayout from "@/routes/layouts/MainLayout";
import { PrivateRoutes } from "@/routes/PrivateRoutes/PrivateRoutes";
import {
  PageNotFound,
  ResetPassword,
  VerifyOtp,
} from "@/constants/Components-lazy-loading/components.Lazy";
import { useAuthContext } from "@/context";
import UnauthorizedAccessPage from "@/pages/UnauthorizedAccess";
import Pricing from "@/pages/Auth/Pricing";
import Solutions from "@/pages/Auth/Solutions";
import LandingPage from "@/pages/Auth/LandingPage";
import Addtanent from "@/pages/Addtanent";
import JiraDataTable from "@/pages/JiraDataTable";


const AppRoutes = () => {
  const { authenticate, token } = useAuthContext();

  // Check if user is authenticated and verify their login and email
  const isAuthenticated = token && authenticate?.email_verification;

  const getRoleBasedRoutes = () => {
    
    if(isAuthenticated  && !authenticate?.role){
      return PrivateRoutes
    } else if (isAuthenticated && authenticate.role && authenticate.allowed_path) {
      return PrivateRoutes.filter((item)=>authenticate?.allowed_path.map((ite)=> ite.value === item.path))
    }

  };

  return (
    <Routes>
      {/* Public routes */}
      {!isAuthenticated && (
        <>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          {/* <Route path="/sign-up" element={<SignUp />} /> */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/JiraDataTable" element={<JiraDataTable />} />

    
        </>
      )}

      {/* Protected routes */}
      {isAuthenticated && (
        <Route element={<MainLayout />}>
          {getRoleBasedRoutes().map((item, index) => (
            <Route key={index} path={item.path} element={item.element} >
              {item.children &&
                item.children.map((child, i) => (
                  <Route key={i} path={child.path} element={child.element} />
                ))}
            </Route>            

          ))}
        </Route>
      )}

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
