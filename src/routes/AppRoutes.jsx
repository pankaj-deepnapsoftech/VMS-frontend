import { Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "@/routes/PrivateRoutes/PrivateRoutes";
import {
  PageNotFound,
  ResetPassword,
  VerifyOtp,
} from "@/constants/Components-lazy-loading/components.Lazy";
import { lazy, Suspense, useEffect } from "react";
import MainLayoutSkeleton from "@/Skeletons/MainLayout/MainLayoutSkeleton";
import { useAuthStore } from "@/store/AuthStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { GetLogedInUser } from "@/services/Auth.service";

const Solutions = lazy(() => import("@/pages/Auth/Solutions"));
const Pricing = lazy(() => import("@/pages/Auth/Pricing"));
const MainLayout = lazy(() => import("@/routes/layouts/MainLayout"));
const ForgotPassword = lazy(() => import("@/pages/Auth/ForgotPassword"));
const SignIn = lazy(() => import("@/pages/Auth/SignIn"));

const AppRoutes = () => {
  const { authenticate, token, setAuthenticate } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ["login-user", { token }],
    queryFn: () => GetLogedInUser(),
    enabled: !!token,
    placeholderData: keepPreviousData
  })


  // Check if user is authenticated and verify their login and email
  const isAuthenticated = token && (authenticate?.email_verification || data?.email_verification);

  console.log("this is just testing ==========>>>>",!isAuthenticated)

  const getRoleBasedRoutes = () => {
    if (isAuthenticated && !authenticate?.role) {
      return PrivateRoutes;
    } else if (
      isAuthenticated &&
      authenticate.role &&
      authenticate.allowed_path
    ) {
      return PrivateRoutes.filter((item) =>
        authenticate.allowed_path.some((ite) => ite.value === item.path)
      );
    }
    return []; // Always return an array
  };

  useEffect(() => {
    if (data) {
      setAuthenticate(data)
    }
  }, [data])

  if (isLoading) {
    return "loading..."
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public routes */}
        {!isAuthenticated && (
          <>
            <Route path="/" element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/test" element={<MainLayoutSkeleton />} />
          </>
        )}

        {/* Protected routes */}
        {isAuthenticated && (
          <Route
            element={
              <Suspense fallback={<MainLayoutSkeleton />}>
                <MainLayout />
              </Suspense>
            }
          >
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

        {/* 404 fallback */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
