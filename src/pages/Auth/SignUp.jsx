import React, { useState } from 'react';
import {
  FaEye, FaEyeSlash, FaFacebook, FaChartLine, FaUser, FaEnvelope, FaPhone, FaObjectGroup, FaBuilding, FaUserFriends,
  FaShieldAlt,
  FaUserShield,
  FaVirus,
  FaLock,
  FaFingerprint,
  FaShieldVirus,
  FaSatelliteDish,
  FaCloud
} from 'react-icons/fa';
import { useFormik } from 'formik';
import InputField from '@/components/InputField';
import { useAuthContext } from '@/context';
import { SignUpValidation } from '@/Validation/AuthValidation';
import { FaCompass } from 'react-icons/fa6';
import { MdBusiness } from 'react-icons/md';
import { BiNetworkChart } from 'react-icons/bi';

function SignUp() {
  const { Signup, loading } = useAuthContext()


  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: { full_name: "", phone: "", email: "", password: "", role: "", Organization: "" },
    validationSchema: SignUpValidation,
    onSubmit: (value) => {
      Signup(value);
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Welcome Section */}
        <div className="h-[80%] border-r-4 mt-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header Section */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-4">
                <FaShieldAlt className="h-14 w-14 text-blue-600" />
                <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 tracking-tight ml-2">
                  SECURE&
                </h1>
              </div>
              <p className="text-xl text-gray-600  ml-14 font-light">
                Beyond security, a Strategy
              </p>
            </div>

            {/* Main Title */}
            <div className="text-center mb-20">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 leading-tight">
                AI POWERED RISK PRIORITIZATION AND
                <br />
                REMEDIATION PLATFORM
              </h2>
            </div>

            {/* Illustration Section */}
            <div className="relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 z-0">
                <BiNetworkChart className="w-full h-full text-blue-100 opacity-30" />
              </div>

              {/* Main Content */}
              <div className="relative z-10">
                {/* Central Visualization */}
                <div className="flex justify-center items-center gap-20">
                  {/* Threat Side */}
                  <div className="relative">
                    <div className="animate-pulse">
                      <FaVirus className="h-20 w-20 text-red-500" />
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-40 h-40 border-2 border-red-200 rounded-full animate-ping opacity-20" />
                      <div className="w-32 h-32 border-2 border-red-300 rounded-full animate-ping opacity-30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      <div className="w-24 h-24 border-2 border-red-400 rounded-full animate-ping opacity-40 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  {/* Protection Visualization */}
                  <div className="bg-white p-8 rounded-xl shadow-xl relative group hover:shadow-2xl transition-all duration-300">
                    <FaUserShield className="h-20 w-20 text-blue-600" />
                    <div className="absolute -top-3 -right-3 transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                      <FaShieldVirus className="h-10 w-10 text-green-500" />
                    </div>
                    <div className="absolute -bottom-3 -right-3">
                      <FaLock className="h-8 w-8 text-blue-400" />
                    </div>
                  </div>
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
            {touched.full_name && errors.full_name && <p className='text-red-700 text-xs'> {errors.full_name}</p>}

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
            {touched.email && errors.email && <p className='text-red-700 text-xs'> {errors.email}</p>}

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
            {touched.phone && errors.phone && <p className='text-red-700 text-xs'> {errors.phone}</p>}
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
            {touched.password && errors.password && <p className='text-red-700 text-xs'> {errors.password}</p>}

            {/* <InputField
              label={"Department Name"}
              type={"text"}
              showPassword={false}
              icon={FaUserFriends}
              value={values.department}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter your Department Name"
              name="department"
            />
            {touched.department && errors.department && <p className='text-red-700 text-xs'> {errors.department}</p>} */}

            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select Your Role
            </label>
            <select
              value={values.role}
              onChange={handleChange}
              className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition'
              id="role">
              <option value="" disabled> -- Select a role -- </option>
              <option value="Assessor">Assessor</option>
              <option value="ClientCISO">Client CISO</option>
              <option value="ClientSME">Client SME</option>
            </select>
            {touched.role && errors.role && <p className='text-red-700 text-xs'> {errors.role}</p>}



            {values.role === "ClientCISO" && <InputField
              label={"Organization Name"}
              type={"text"}
              showPassword={false}
              icon={FaBuilding}
              value={values.Organization}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter your Organization Name"
              name="Organization"
            />
              // {touched.Organization && errors.Organization && <p> {errors.Organization}</p>}
            }

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