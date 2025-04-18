import { useFormik } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import { useAuthContext, useScheduleAssessmentContext } from '@/context';
import { Link } from 'react-router-dom';
import { SignUpValidation } from '@/Validation/AuthValidation';
import { useEffect, useState } from 'react';


function SignIn() {
  const { Signup, loading } = useAuthContext()
    const { GetOrgnization,  getOrgnizationData  } = useScheduleAssessmentContext();
    console.log("getOrgnizationData",getOrgnizationData)
  


      useEffect(() => {
      
          GetOrgnization();
       
      }, [])
    const [showPassword,setShowPassword] = useState(false);

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
    initialValues: { full_name: "", phone: "", email: "", password: "", role: "", Organization: "", owner:"" },
    validationSchema: SignUpValidation,
    onSubmit: (value) => {
      console.log("value : ",value)
      Signup(value)
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
        <form className="my-auto w-full max-w-md py-16" onSubmit={handleSubmit} >
          <h1 className="text-3xl font-bold text-white mb-2">Create New Account</h1>
          <p className="text-gray-400 mb-8">
            Step into the world of digital assets and decentralized systems.
          </p>

          {/* Metamask Button */}




          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">Full Name</label>
            <input
              type="text"
              value={values.full_name}
              onChange={handleChange}
              onBlur={handleBlur}
              name='full_name'
              className="w-full bg-[#1a2942] rounded-lg p-3 text-white border border-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
              placeholder="mail@example.com"
            />
            {errors.full_name && touched.full_name && <p className='text-red-400 p-2'>{errors.full_name}</p>}
          </div>

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

          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2">Phone</label>
            <input
              type="number"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              name='phone'
              className="w-full bg-[#1a2942] rounded-lg p-3 text-white border border-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
              placeholder="Enter Your Phone Number"
            />
            {errors.phone && touched.phone && <p className='text-red-400 p-2'>{errors.phone}</p>}
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



          <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-2">Role</label>
            <select
              value={values.role}
              onChange={handleChange}
              className='w-full bg-[#1a2942] rounded-lg p-3 text-white border border-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors'
              id="role">
              <option value="" disabled>Select a role</option>
              <option value="Assessor">Assessor</option>
              <option value="ClientCISO">Client CISO</option>
              <option value="ClientSME">Client SME</option>
            </select>

            {errors.role && touched.role && <p className='text-red-400 p-2' >{errors.role}</p>}
          </div>

          {values.role === "ClientCISO" && <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-2">Organization</label>
            <input
              type="text"
              value={values.Organization}
              onChange={handleChange}
              onBlur={handleBlur}
              name='Organization'
              className="w-full bg-[#1a2942] rounded-lg p-3 text-white border border-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
            />
            {errors.Organization && touched.Organization && <p className='text-red-400 p-2' >{errors.Organization}</p>}
          </div>}

          {values.role==="ClientSME" && <div>
            <label
										htmlFor="Select_Org"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Select Orgnization
									</label>
									<select
										name='owner'
										value={values.owner}
										onChange={handleChange}
										className='w-full bg-[#1a2942] rounded-lg p-3 text-white border border-gray-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors'
										id="Select_Org">
										<option value="" disabled> -- Select Orgnization -- </option>
										{getOrgnizationData?.map((itm, idx) => (<option key={idx} value={itm._id}>{itm.Organization}</option>))}
									</select>
									{touched.owner && errors.owner && <p className='text-red-700 text-xs'> {errors.owner}</p>}</div>}

          {/* Login Button */}
          <button disabled={loading} type='submit' className="w-full bg-emerald-500 text-white rounded-lg p-3 font-medium hover:bg-emerald-600 transition-colors my-10">
            Sign Up
          </button>

          {/* Sign Up Link */}
          <p className="text-gray-400 text-sm mt-6">
            Already have an account{' '}
            <Link to="/sign-in" className="text-emerald-500 hover:text-emerald-400 transition-colors">
              Back to login
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
