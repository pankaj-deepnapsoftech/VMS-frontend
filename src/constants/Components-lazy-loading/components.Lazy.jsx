import { lazy } from "react";

// components 
export const Header = lazy(() => import("@components/Header/Header"));
export const Loader = lazy(() => import("@components/Loader/Loader"));
export const Footer = lazy(() => import("@components/Loader/Loader"));


export const SignIn = lazy(() => import("@pages/Auth/SignIn"));
export const SignUp = lazy(() => import("@pages/Auth/SignUp"));
export const ForgotPassword = lazy(() => import("@pages/Auth/ForgotPassword"));
export const ResetPassword = lazy(() => import("@pages/Auth/ResetPassword"));
export const VerifyOtp = lazy(() => import("@pages/Auth/VerifyOtp"));


export const Home = lazy(() => import("@pages/Home"));
export const Services = lazy(() => import("@/pages/ApplicationVulnerability"));
export const VulnerableCls = lazy(() => import("@/pages/InfrastructureVulnerability"));
export const Exceptions = lazy(() => import("@pages/Exceptions"));
export const Remedition = lazy(() => import("@pages/Remedition"));
export const VulnerabilityData = lazy(() => import("@/pages/VulnerablityData"));
export const AllCustomer = lazy(() => import("@pages/AllCustomer"));


export const PageNotFound = lazy(() => import("@pages/PageNotFound"));
