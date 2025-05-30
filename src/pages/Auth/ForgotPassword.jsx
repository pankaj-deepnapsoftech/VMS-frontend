import { useAuthContext } from "@/context";
import { ForgotPasswordValidation } from "@/Validation/AuthValidation";
import { useFormik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ResetSecurity from "./ResetSecuirity";

function ForgotPassword() {
  const { Forgotpassword, loading } = useAuthContext();
  const [stateChange,setStateChange] = useState(false)

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, } =
    useFormik({
      initialValues: { email: ""},
      validationSchema: ForgotPasswordValidation,
      onSubmit: (value) => {
        Forgotpassword(value);
      },
    });

  

  return !stateChange  ? (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <h1 className="text-4xl font-extrabold text-white mb-2">
        Forgot Password
      </h1>
      <p className="text-blue-300 text-sm text-center max-w-md">
        Enter your email address and we&apos;ll send you instructions to reset
        your password.
      </p>

      {/* Card */}
      <div className="w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-xl p-8 mt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="mail@example.com"
              className="w-full bg-gray-900 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.email && touched.email && (
              <p className="text-sm text-red-400 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <button
            type="button"
            // eslint-disable-next-line no-undef
            onClick={() => {if(values.email.trim() ){
              setStateChange(true)
            } else{
              alert("email is reaquired")
            }
           }}
            className="w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
          >
            Reset Password with Questions
          </button>

          {/* Back to Sign In */}
          <p className="text-center text-sm text-gray-400 mt-4">
            Back to{" "}
            <Link to="/sign-in" className="text-blue-400 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  ) : <ResetSecurity values={values} />;
}

export default ForgotPassword;
