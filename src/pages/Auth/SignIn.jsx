import { useFormik } from "formik";
import { Eye, EyeOff, Wallet2 } from "lucide-react";
import { SignInValidation } from "@/Validation/AuthValidation";
import { useAuthContext } from "@/context";
import { Link } from "react-router-dom";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

function SignIn() {
  const { Signin, loading } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [disabled,setDisabled] = useState(true)

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: SignInValidation,
      onSubmit: (value) => {
        Signin(value);
      },
    });

    const handleOnChnage = (val) => {
      setDisabled(false)
    }

  return (
    <div className="min-h-screen w-full flex bg-[#0a192f]">
      {/* Left Panel - Login Form */}
      <div className="w-full md:w-[480px] p-8 flex flex-col justify-between">

        {/* Logo and Language Section */}
        <div className="flex justify-between items-center">
          {/* <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Scalable Image"
              style={{ width: "30%", height: "auto" }}
            />
          </Link> */}
        </div>

        {/* Login Form */}
        <form className="my-auto w-full max-w-md" onSubmit={handleSubmit}>
          {/* Email Input */}
          <span className="text-3xl font-bold block pb-10 bg-blue-300 text-transparent bg-clip-text">
            Sign In
          </span>
          <div className="mb-4 ">
            <label className="block text-gray-400 text-sm mb-2">Email</label>
            <input
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
              className="w-full bg-[#1a2942] rounded-lg p-3 text-white border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
              placeholder="Enter email"
            />
            {errors.email && touched.email && (
              <p className="text-red-400 p-2">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-6 ">
            <div className="relative">
              <label className="block text-gray-400 text-sm mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                placeholder="Enter password"
                className="w-full bg-[#1a2942] rounded-lg p-3 text-white border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
              />
              <div
                className="absolute top-[40%] right-2 text-white p-2 cursor-pointer "
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </div>
            </div>
            {errors.password && touched.password && (
              <p className="text-red-400 p-2">{errors.password}</p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center  justify-between mb-6">
           
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-700 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0 bg-[#1a2942]"
              />
              <span className="text-gray-400 text-sm">Remember me?</span>
            </label>
            <Link
              to={"/forgot-password"}
              className="text-white text-sm hover:text-blue-400 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div>
          <ReCAPTCHA
              sitekey="6Lex_jArAAAAAD33jbEHS_Qldtzkz7-iOEqA0kLO"
              onChange={handleOnChnage}
            />,
          </div>

          {/* Login Button */}
          <button
            disabled={loading || disabled}
            type="submit"
            className="w-full bg-gradient-to-t from-[#0371c0] to-blue-400 text-white rounded-lg p-3 font-medium hover:"
          >
            Login
          </button>

          {/* Sign Up Link */}
          <p className="text-gray-400 text-sm mt-6">
            Not registered yet?{" "}
            <Link
              to="/sign-up"
              className="text-white hover:text-blue-400 transition-colors"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>

      {/* Right Panel - Particle Globe Background */}
      <div className="hidden md:block flex-1 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center">
        <div className="w-full h-full bg-[#0a192f]/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center px-4 mt-24">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-blue-200">
              Step into the world of digital assets and decentralized systems.
            </p>
            <img src="/logo.png" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
