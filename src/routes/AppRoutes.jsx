import { Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "@/routes/PrivateRoutes/PrivateRoutes";
import {
  PageNotFound,
  ResetPassword,
  VerifyOtp,
} from "@/constants/Components-lazy-loading/components.Lazy";
import { useAuthContext } from "@/context";
import { lazy, Suspense } from "react";
import { RiskDetailsSkeletonLayout } from "@/Skeletons/RiskDetails/RiskDetailsSkeleton";

const Solutions = lazy(() => import("@/pages/Auth/Solutions"));
const Pricing = lazy(() => import("@/pages/Auth/Pricing"));
const MainLayout = lazy(() => import("@/routes/layouts/MainLayout"));
const ForgotPassword = lazy(() => import("@/pages/Auth/ForgotPassword"));
const SignIn = lazy(() => import("@/pages/Auth/SignIn"));

const AppRoutes = () => {
  const { authenticate, token } = useAuthContext();

  // Check if user is authenticated and verify their login and email
  const isAuthenticated = token && authenticate?.email_verification;

  const getRoleBasedRoutes = () => {
    if (isAuthenticated && !authenticate?.role) {
      return PrivateRoutes;
    } else if (
      isAuthenticated &&
      authenticate.role &&
      authenticate.allowed_path
    ) {
      return PrivateRoutes.filter((item) =>
        authenticate?.allowed_path.map((ite) => ite.value === item.path)
      );
    }
  };
  return (
    <Routes>
      {/* Public routes */}
      {!isAuthenticated && (
        <>
          {/* <Route path="/" element={<LandingPage />} /> */}
          <Route
            path="/"
            element={
              <Suspense>
                <SignIn />
              </Suspense>
            }
          />
          {/* <Route path="/sign-up" element={<SignUp />} /> */}
          <Route
            path="/forgot-password"
            element={
              <Suspense>
                <ForgotPassword />
              </Suspense>
            }
          />
          <Route
            path="/reset-password"
            element={
              <Suspense>
                <ResetPassword />
              </Suspense>
            }
          />
          <Route
            path="/verify-otp"
            element={
              <Suspense>
                <VerifyOtp />
              </Suspense>
            }
          />
          <Route
            path="/pricing"
            element={
              <Suspense>
                <Pricing />
              </Suspense>
            }
          />
          <Route
            path="/solutions"
            element={
              <Suspense>
                <Solutions />
              </Suspense>
            }
          />
          <Route path="/testt" element={<RiskDetailsSkeletonLayout />} />
        </>
      )}

      {/* Protected routes */}
      {isAuthenticated && (
        <Route element={<MainLayout />}>
          {getRoleBasedRoutes().map((item, index) => (
            <Route key={index} path={item.path} element={item.element}>
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
