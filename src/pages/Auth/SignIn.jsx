import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { SignInValidation } from "@/Validation/AuthValidation";
import { useAuthContext } from "@/context";
import { Link } from "react-router-dom";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

function SignIn() {
  const { Signin, loading } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: SignInValidation,
      onSubmit: (value) => {
        Signin(value);
      },
    });

  const handleOnChange = () => {
    setDisabled(false);
  };

  return (
    <div className="flex">
      {/* left side */}
      <div className="bg-gray-400 p-8 w-2/3 relative overflow-x-hidden">
        <h2 className="text-white text-lg font-medium mb-5">GROUP-IB</h2>
        <span className="text-white text-5xl font-bold block mb-1">Products</span>
        <p className="text-sm">Group-IB's security ecosystem provides comprehensive protection for your IT infrastructure based on our unique cyber intelligence, in-depth attack analysis, and effective incident response.</p>
        <div className="flex">
          {/* left */}
          <div className="w-1/2">
            <div className="bg-gray-300 my-6 rounded-xl p-4">
              <h3 className="text-black font-black text-xl">Threat Intelligence</h3>
              <p className="mt-2.5 mb-2 text-xs">Attribution-based Threat intelligence for analysis and managing adversaries before they effect your business.</p>
              <button className="bg-blue-600 text-white rounded-lg p-2 text-xs font-medium mt-2">Try demo</button>
            </div>
            <ul className="flex flex-col gap-5 text-white font-bold text-lg">
              <li>Managed XDR</li>
              <li>Fraud Protection</li>
              <li>Digital Risk Protection</li>
            </ul>
          </div>

          {/* right */}
          <div className="w-1/2  ">
              <img src="\public\singInPhoto.png" alt="sign in photo image" className="absolute w-400 "/>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="min-h-screen flex flex-col items-center justify-center w-1/3 bg-black px-4">
        <div className="text-left mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Sign in</h1>
          <p className="text-gray-100 text-xs">
            Please sing in using your organisation SSO credentials.
          </p>
        </div>
        {/* Card Box */}
        <form onSubmit={handleSubmit} className="space-y-2 text-sm">
          {/* Email Field */}
          <div >
            <input
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
              placeholder="Email"
              className="w-full bg-input text-white rounded-lg p-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && touched.email && (
              <p className="text-sm text-red-400 mt-1">{errors.email}</p>
            )}
          </div>
          {/* Password Field */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                placeholder="Password"
                className="w-full bg-input text-white rounded-lg p-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && touched.password && (
              <p className="text-sm text-red-400 mt-1">{errors.password}</p>
            )}
          </div>
          {/* Checkbox + Forgot Password */}
          <div className="flex flex-row-reverse items-center justify-between text-sm text-gray-400">
            <Link
              to="/forgot-password"
              className="text-blue-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          {/* reCAPTCHA */}
          <div className="pt-1">
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_HUMAN_VERIFICATION}
              onChange={handleOnChange}
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || disabled}
            className={`w-full p-3 rounded-lg text-white font-medium transition-all duration-300 ${loading || disabled
              ? "bg-blue-600 cursor-not-allowed"
              : "bg-gradient-to-r from-gray-200 to-gray-100 hover:from-gray-300 hover:to-gray-200"
              }`}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-400 mt-4">
            Not registered yet?{" "}
            <Link to="/sign-up" className="text-blue-400 hover:underline">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
