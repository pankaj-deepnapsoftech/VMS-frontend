import InputField from '@/components/InputField';
import { useAuthContext } from '@/context';
import { ResetPasswordValidation } from '@/Validation/AuthValidation';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash, FaFacebook, FaChartLine, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function ResetPassword() {
  const {Resetpassword,loading} = useAuthContext()
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [showPassword, setShowPassword] = useState(false);
  

 const {values,errors,touched,handleBlur,handleChange,handleSubmit}=useFormik({
  initialValues:{password:"" },
  validationSchema:ResetPasswordValidation,
  onSubmit:(value)=>{
    Resetpassword(value)
  }
 })

 

 useEffect(()=>{
    if(!queryParams.get("token") && !queryParams.get("testing") ){
        navigate("/sign-in")
     }
 },[queryParams.get("token"),queryParams.get("testing")])


 
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Sign In Form */}
        
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h1>
            <p className="text-gray-600"> Please enter your New Password</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
          {/* <InputField
              label={"Email Address"}
              type={"email"}
              showPassword={false}
              icon={FaEnvelope}
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter your Email Address"
              name="email"
            />
            {touched.email && errors.email && <p> {errors.email}</p>} */}

            <InputField
              label={" New Password"}
              type={"password"}
              showPassword={true}
              icon={FaLock}
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter your New Password"
              name="password"
            />
            {touched.password && errors.password && <p> {errors.password}</p>}
           

           
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
              disabled={loading}
            >
            Reset Password
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>
{/* 
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition duration-200">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                Sign up with Google
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white px-4 py-3 rounded-lg hover:bg-[#1864D9] transition duration-200">
                <FaFacebook size={20} />
                Sign up with Facebook
              </button>
            </div> */}

            <p className="text-center text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up
              </Link>
            </p>
          </form>
        </div>

        {/* Right Side - Welcome Section */}
        <div className="w-full md:w-1/2 bg-[#015289] p-12 text-white flex flex-col">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-6">Welcome back!</h2>
            <h3 className="text-2xl font-semibold mb-4">Please sign in to your account</h3>
            <p className="text-blue-100 mb-8">
            Monitor vulnerabilities, prioritize risks, and streamline remediation efforts with our intuitive Vulnerability Dashboard.
            </p>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Vulnerabilities Report</h4>
                <FaChartLine className="text-blue-200" />
              </div>
              <div className="space-y-4">
                <div className="h-32 flex items-end gap-2">
                  {[60, 45, 75, 50, 65, 40, 55, 70, 45, 60].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-white/20 rounded-t"
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-blue-200">
                  <span>Jan</span>
                  <span>Dec</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;