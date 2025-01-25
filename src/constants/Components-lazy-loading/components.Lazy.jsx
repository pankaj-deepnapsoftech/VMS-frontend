import {  lazy } from "react";

// coponents 
export const Header = lazy(()=>import("@components/Header/Header"));
export const Loader = lazy(()=>import("@components/Loader/Loader"));
export const Footer = lazy(()=>import("@components/Loader/Loader"));

export const SignIn = lazy(()=>import("@pages/Auth/SignIn"));
export const SignUp = lazy(()=>import("@pages/Auth/SignUp"));
export const ForgotPassword = lazy(()=>import("@pages/Auth/ForgotPassword"));
export const ResetPassword = lazy(()=>import("@pages/Auth/ResetPassword"));
export const VerifyOtp = lazy(()=>import("@pages/Auth/VerifyOtp"));

export const Home = lazy(()=>import("@pages/Home"));
export const Services = lazy(()=>import("@pages/Services"));
export const VulnerableCls = lazy(()=>import("@pages/VulnerableCls"));
export const Exceptions = lazy(()=>import("@pages/Exceptions"));
export const Remedition = lazy(()=>import("@pages/Remedition"));
export const AllVulnerability = lazy(()=>import("@pages/AllVulnerablity"));





export const PageNotFound = lazy(()=>import("@pages/PageNotFound"));
