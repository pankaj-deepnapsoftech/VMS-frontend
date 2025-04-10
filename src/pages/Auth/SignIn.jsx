import { useFormik } from 'formik';
import { Eye, EyeOff, Wallet2 } from 'lucide-react';
import { SignInValidation } from '@/Validation/AuthValidation';
import { useAuthContext } from '@/context';
import { Link } from 'react-router-dom';
import { useState } from 'react';


function SignIn() {
  const { Signin, loading } = useAuthContext();
  const [showPassword,setShowPassword] = useState(false);

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: SignInValidation,
    onSubmit: (value) => {
      Signin(value)
    }

  })

  return (
    <div className="min-h-screen w-full flex bg-[#0a192f]">
      {/* Left Panel - Login Form */}
      <div className="w-full md:w-[480px] p-8 flex flex-col justify-between">
        {/* Logo and Language Section */}
        <div className="flex justify-between items-center">
        <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Scalable Image"
              style={{ width: "15%", height: "auto" }}
            />
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 text-transparent bg-clip-text">
              Secure&
            </span>
          </Link>

        </div>

        {/* Login Form */}
        <form className="my-auto w-full max-w-md" onSubmit={handleSubmit} >
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back </h1>
          <p className="text-gray-400 mb-8">
            Step into the world of digital assets and decentralized systems.
          </p>

          {/* Metamask Button */}


        

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">Email</label>
            <input
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              name='email'
              className="w-full bg-[#1a2942] rounded-lg p-3 text-white border border-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
              placeholder="mail@example.com"
            />
            {errors.email && touched.email && <p className='text-red-400 p-2'>{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="mb-6 ">
            <div className='relative' >

            <label className="block text-gray-400 text-sm mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              name='password'
              className="w-full bg-[#1a2942] rounded-lg p-3 text-white border border-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
            />
            <div className='absolute top-[40%] right-2 text-white p-2 cursor-pointer ' onClick={()=>setShowPassword(!showPassword)} >
              {!showPassword ? <Eye size={20} /> : <EyeOff size={20}/>}
            </div>
            </div>
            {errors.password && touched.password && <p className='text-red-400 p-2' >{errors.password}</p>}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-700 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-0 bg-[#1a2942]"
              />
              <span className="text-gray-400 text-sm">Remember me?</span>
            </label>
            <Link to={"/forgot-password"} className="text-emerald-500 text-sm hover:text-emerald-400 transition-colors">
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button disabled={loading} type='submit' className="w-full bg-emerald-500 text-white rounded-lg p-3 font-medium hover:bg-emerald-600 transition-colors">
            Login
          </button>

          {/* Sign Up Link */}
          <p className="text-gray-400 text-sm mt-6">
            Not registered yet?{' '}
            <Link to="/sign-up" className="text-emerald-500 hover:text-emerald-400 transition-colors">
              Create an account
            </Link>
          </p>
        </form>

        {/* Footer */}
        <div className="text-gray-400 text-sm">
          © Secure& All rights reserved.
        </div>
      </div>

      {/* Right Panel - Particle Globe Background */}
      <div className="hidden md:block flex-1 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center">
        <div className="w-full h-full bg-[#0a192f]/80 backdrop-blur-sm"></div>
      </div>
    </div>
  );
}

export default SignIn;
