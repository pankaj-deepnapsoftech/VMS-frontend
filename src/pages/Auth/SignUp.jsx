import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaFacebook, FaChartLine, FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import { useFormik } from 'formik';
import InputField from '@/components/InputField';
import { useAuthContext } from '@/context';
import { SignUpValidation } from '@/Validation/AuthValidation';

function SignUp() {
  const { Signup, loading } = useAuthContext()


  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: { full_name: "", phone: "", email: "", password: "", role: "" },
    validationSchema: SignUpValidation,
    onSubmit: (value) => {
      console.log(value, "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
      Signup(value);
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Welcome Section */}
        <div className="w-full md:w-1/2 bg-[#015289] p-12 text-white flex flex-col">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-6">Join us !</h2>
            <h3 className="text-2xl font-semibold mb-4">Create your account today</h3>
            <p className="text-blue-100 mb-8">
              Get started with our platform and unlock a world of possibilities. Identify vulnerabilities, prioritize risks, and strengthen your security with our powerful Vulnerability Dashboard.
            </p>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Growth Analytics</h4>
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

        {/* Right Side - Sign Up Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-600">Fill in your details to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <InputField
              label={"Full Name"}
              type={"text"}
              showPassword={false}
              icon={FaUser}
              value={values.full_name}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter your Full Name"
              name="full_name"
            />
            {touched.full_name && errors.full_name && <p> {errors.full_name}</p>}

            <InputField
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
            {touched.email && errors.email && <p> {errors.email}</p>}

            <InputField
              label={"Phone Number"}
              type={"text"}
              showPassword={false}
              icon={FaPhone}
              value={values.phone}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter your Phone Number"
              name="phone"
            />
            {touched.phone && errors.phone && <p> {errors.phone}</p>}
            <InputField
              label={"Password"}
              type={"password"}
              showPassword={true}
              icon={FaLock}
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter your Password"
              name="password"
            />
            {touched.password && errors.password && <p> {errors.password}</p>}

            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Your Role
            </label>
            <select
              value={values.role}
              onChange={handleChange}
              className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
              id="role">
              <option value="" disabled> -- Select a role -- </option>
              <option value="Employee">Employee</option>
              <option value="ClientCTO">Client CTO</option>
              <option value="ClientSME">Client SME</option>
            </select>
            {touched.role && errors.role && <p> {errors.role}</p>}

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Create Account
            </button>

            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>
            {/* 
            <div className="space-y-4">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                Sign up with Google
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white px-4 py-3 rounded-lg hover:bg-[#1864D9] transition duration-200"
              >
                <FaFacebook size={20} />
                Sign up with Facebook
              </button>
            </div> */}

            <p className="text-center text-gray-600 text-sm">
              Already have an account?{' '}
              <a href="/sign-in" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;