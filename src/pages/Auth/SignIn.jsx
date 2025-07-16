import { useAuthContext } from "@/context";
import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { BsEyeSlash } from "react-icons/bs";
import "./../Css/SignInAnimation.css";

const SignIn = () => {
  const { Signin } = useAuthContext();
  const [togglePassword, setTogglePassword] = useState(false);
  const [disable, setDisable] = useState(true);
  const [showHeading, setShowHeading] = useState(false);
  const [cardVisible, setCardVisible] = useState(true);

  const { values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (value) => {
      Signin(value);
    },
  });

  const handleCaptcha = () => {
    setDisable(false);
  };


  const cards = [
    {
      title: "Threat & Vulnerability Management (TVM)",
      desc: "Proactively identify, assess, and mitigate security weaknesses across your infrastructure. Our TVM solutions empower you to stay ahead of potential breaches by continuously monitoring for threats and vulnerabilities, ensuring your digital assets remain secure.",
    },

    {
      title: "Attack Surface Management (ASM)",
      desc: "Understand and control your evolving attack surface. ASM provides a continuous, outside-in view of your organization's digital assets, revealing potential entry points for attackers and enabling you to proactively shrink your risk.",
    },
    {
      title: "Risk Quantification, Prioritisation & Remediation",
      desc: "Translate technical vulnerabilities into clear business risks. Our approach to risk quantification helps you understand the financial impact of potential cyber incidents, enabling data-driven prioritization of remediation efforts for maximum security ROI.",
    },
  ];

  const ANIMATION_DURATION = 6000;

  const [currentAnimatingCardIndex, setCurrentAnimatingCardIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentAnimatingCardIndex((prev) =>
        prev + 1 < cards.length ? prev + 1 : 0
      );
    }, ANIMATION_DURATION);

    return () => clearTimeout(timer);
  }, [currentAnimatingCardIndex]);


  return (
    <div className="flex min-h-screen bg-[url('/Svg/background.svg')] bg-no-repeat bg-cover bg-center bg-black">
      {/* Left side */}
      <div
        className="flex-[3] text-white relative  hidden lg:block bg-gradient-to-tr from-[#2b2973] via-transparent to-black "

      >
        <img src="/logo.png" className="h-10 my-10 px-10" />
        <h2 className="text-5xl font-bold ml-10 pt-24">Products</h2>
        <p className="ml-10 pb-5 text-gray-500 z-10">
          Explore our powerful security products that simplify complex threats and protect what matters most.
        </p>
        <img
          src="/bg5.png"
          className=" size-96 2xl:size-[600px] absolute top-[32%] 2xl:top-[20%] right-0"
        />


        <div className="relative space-y-3 ">
          {cards.map((card, index) => {
            const isActive = currentAnimatingCardIndex === index;

            return (
              <div
                key={index}
                className={`transition-all duration-500 ml-10 rounded-2xl text-white shadow-lg  relative py-3
          ${isActive ? "max-w-md p-6 bg-white/30 backdrop-blur-md" : "bg-transparent max-w-md px-6"} 
        `}
              >
                {isActive && (
                  <div className="flex space-x-1 mb-4">
                    <div className={`w-2 h-2 rounded-full  ${index === 0 ? "bg-gray-200" : "bg-gray-400"} `} />
                    <div className={`w-2 h-2 rounded-full ${index === 1 ? "bg-gray-200" : "bg-gray-400"}  `} />
                    <div className={`w-2 h-2 rounded-full ${index === 2 ? "bg-gray-200" : "bg-gray-400"} `} />
                  </div>
                )}
                <h2 className={`text-lg font-semibold mb-2 ${isActive ? "" : "text-white"}`}>
                  {card.title}
                </h2>
                {isActive && (
                  <>
                    <p className="text-sm text-gray-300 mb-6">{card.desc}</p>
                    <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md">
                      Try Now
                    </button>
                    <div className="absolute bottom-[1.5px] left-0 bg-gray-400 h-2 rounded-b-2xl  w-full overflow-hidden">
                      <div className="bg-yellow-300 h-full rounded-xl fill-animation"></div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right side */}
      <div
        className=" flex-[2] text-white flex flex-col items-center justify-center border-l border-light  px-2 lg:pl-20 "
        style={{ backgroundPosition: "right 0 1000px" }}
      >
        <h2 className=" text-2xl xl:text-4xl 2xl:text-5xl font-medium py-3 ">
          Welcome to Secure End
        </h2>
        <p className=" text-sm lg:text-lg 2xl:text-xl text-gray-500 pb-5">
          Login to the Virtual Risk Operation Center(VROC)
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start w-fit gap-5 xl:py-10"
        >
          <div className="flex flex-col w-96 2xl:w-[600px]">
            <label htmlFor="email" className=" text-sm lg:test-base 2xl:text-xl text-gray-400 pb-2">
              Email Address
            </label>
            <input
              id="email"
              type="text"
              name="email"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="bg-transparent h-12 2xl:h-[60px] text-sm lg:test-base 2xl:text-xl w-full border border-gray-500 rounded px-3"
            />
          </div>

          <div className="flex flex-col w-96 2xl:w-[600px] relative">
            <label
              htmlFor="password"
              className=" text-sm lg:test-base 2xl:text-xl text-gray-400 pb-2"
            >
              Password
            </label>
            <input
              id="password"
              type={togglePassword ? "text" : "password"}
              name="password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Enter your password"
              className="bg-transparent h-12 text-sm lg:test-base 2xl:h-[60px] 2xl:text-xl w-full border border-gray-500 rounded px-3"
            />
            <div
              className="absolute top-[60%] right-5 -translate-y-[20%] cursor-pointer"
              onClick={() => setTogglePassword(!togglePassword)}
            >
              {togglePassword ? <Eye /> : <EyeOff />}
            </div>
          </div>

          <div className="pt-1">
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_HUMAN_VERIFICATION}
              onChange={handleCaptcha}
            />
          </div>

          <label className="flex gap-3 select-none">
            <input type="checkbox" className="" /> Remember Me
          </label>

          <button
            disabled={disable}
            type="submit"
            className="bg-button w-96 text-sm lg:test-base 2xl:w-[600px] h-12 2xl:h-[60px] 2xl:text-xl rounded my-5"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
