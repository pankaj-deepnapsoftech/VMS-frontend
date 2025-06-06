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
   
      <div className="bg-gradient-to-br from-sky-200  to-[#0e0e0ec4] p-10 w-3/4 relative overflow-x-hidden shadow-md "
      >
        <div className="w-36 mb-6">
          <img src="/logo.png" alt="Secure& logo" className="w-full" />
        </div>
        <span className="text-gray-800 text-3xl md:text-4xl font-semibold block mb-2">
          AI Powered &
        </span>
        <span className="text-gray-800 text-3xl md:text-4xl font-semibold block mb-2">
          Virtual Risk Operations Centre
        </span>
        <span className="text-blue-700 text-3xl md:text-4xl font-bold block mt-4">
          (vROC)
        </span>
      </div>


      {/* right side */}
      <div className="min-h-screen flex flex-col items-center justify-center w-1/3 bg-zinc-800 px-4">
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
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
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
              : "bg-blue-600  hover:from-gray-300 hover:to-gray-200"
              }`}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;