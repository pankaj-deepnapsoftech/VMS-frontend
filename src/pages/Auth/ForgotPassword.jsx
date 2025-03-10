import InputField from '@/components/InputField';
import { useAuthContext } from '@/context';
import { ForgotPasswordValidation } from '@/Validation/AuthValidation';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { BiNetworkChart } from 'react-icons/bi';
import { FaEnvelope, FaChartLine, FaArrowLeft, FaUserShield, FaShieldVirus, FaLock, FaVirus, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const { Forgotpassword, loading } = useAuthContext()

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: { email: "" },
    validationSchema: ForgotPasswordValidation,
    onSubmit: (value) => {
      Forgotpassword(value)
    }
  })


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Welcome Section */}
        <div className="w-full md:w-1/2 bg-white p-12 text-white flex flex-col">
          <div className="h-screen border-r-4 ">
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
        </div>

        {/* Right Side - Reset Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <a
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-8"
          >
            <FaArrowLeft className="mr-2" />
            Back to Sign In
          </a>
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password?</h1>
              <p className="text-gray-600">
                Enter your email address and we'll send you instructions to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

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

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Send Reset Instructions
              </button>
            </form>
          </>
          {/* {!isSubmitted ? (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password?</h1>
                <p className="text-gray-600">
                  Enter your email address and we'll send you instructions to reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
               
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

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Send Reset Instructions
                </button>
              </form>
            </>
          ) :
           (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Check Your Email</h2>
              <p className="text-gray-600 mb-8">
                We've sent password reset instructions to:
                <br />
                <span className="font-medium text-gray-800">{email}</span>
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition duration-200"
                >
                  Try another email
                </button>
                <p className="text-sm text-gray-600">
                  Didn't receive the email?{' '}
                  <button
                    onClick={handleSubmit}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Click to resend
                  </button>
                </p>
              </div>
            </div>
          )} */}

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600 text-sm">
              Remember your password?{' '}
              <Link to="/sign-in" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;