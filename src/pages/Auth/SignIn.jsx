import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const SignIn = () => {
  return (
    <div className="flex h-screen">
      {/* left side */}
      <div
        className="flex-[3] text-white"
        style={{
          backgroundImage: "url('/bgleft.png'), url('/bg5.png')",
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundPosition: "left center, right center",
          backgroundSize: "auto, auto",
          backgroundColor: "black",
        }}
      >
        <h2 className="mt-60 text-5xl font-bold ml-10">Products</h2>
        <p className="ml-10 pb-5 text-gray-500">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, odit
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta, odit
          eos!
        </p>
        <div className="max-w-md p-6 ml-10 rounded-2xl bg-gradient-to-br from-[#2b2f58] to-[#2a3250] border-s-4 text-white shadow-lg relative mb-20">
          <div className="flex space-x-1 mb-4">
            <div className="w-2 h-2 rounded-full bg-gray-400" />
            <div className="w-2 h-2 rounded-full bg-gray-400" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
          </div>

          <h2 className="text-lg font-semibold mb-2">
            Threat & Vulnerability Management
          </h2>

          <p className="text-sm text-gray-300 mb-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry’s standard dummy text
          </p>

          <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md">
            Try Now
          </button>
        </div>  
        <div className="flex flex-col font-semibold gap-5 ml-10">
          <div>Threat and Vulnerability Management (TVM)</div>
          <div>Attack Surface Management (ASM)</div>
          <div>Risk Quantification, Prioritisation & Remediation</div>
        </div>
      </div>

      {/* right side */}
      <div className="bg-black flex-[2] text-white flex flex-col  justify-center border-l pl-20">
        <h2 className="text-4xl 2xl:text-6xl font-medium py-3 ">
          Welcome to Secure End
        </h2>
        <p className="text-lg 2xl:text-2xl text-gray-500 pb-5">
          Logic to the Virtual Risk Operation Center(VROC)
        </p>
        <form className="flex flex-col items-start  w-full gap-5 xl:py-10">
          <div className="flex flex-col  w-96 2xl:w-[600px]">
            <label htmlFor="email" className="2xl:text-2xl text-gray-400 pb-2">
              Email Address
            </label>
            <input
              id="email"
              type="text"
              placeholder="Enter your email address"
              className=" bg-transparent h-12 2xl:h-[60px] 2xl:text-2xl w-full border border-gray-500 rounded px-3 "
            />
          </div>
          <div className="flex flex-col  w-96 2xl:w-[600px]">
            <label
              htmlFor="password"
              className="2xl:text-2xl text-gray-400 pb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="text"
              placeholder="Enter your password"
              className="bg-transparent h-12 2xl:h-[60px] 2xl:text-2xl w-full border border-gray-500 rounded px-3 "
            />
          </div>
          <div className="pt-1">
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_HUMAN_VERIFICATION}
              onChange={() => {}}
            />
          </div>
          <label className="flex gap-3 select-none">
            <input type="checkbox" className="" /> Remember Me
          </label>
          <button className="bg-button w-96 2xl:w-[600px] h-12 2xl:h-[60px] 2xl:text-2xl rounded my-5">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
