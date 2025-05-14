import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { bookDemoSchema } from "../Validation/BookDemoValidation";
import axios from "axios";
import { AxiosHandler } from "@/config/AxiosConfig";
import { IoClose } from "react-icons/io5";

// eslint-disable-next-line react/prop-types
const BookDemo = ({closeModal,isOpen}) => {

  if(!isOpen){
    return null
  }

  const initialValues = {
    fullName: "",
    phoneNumber: "",
    email: "",
    preferredDate: "",
    message: "",
  };

  const handleSubmit = async (values, actions) => {
    try {
      const response = await AxiosHandler.post("/book-demo/add-book-demo",values)
      console.log("Submitted successfully:", response.data);
      actions.resetForm();
      alert("Demo booked successfully!");
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#1c1c1e]/40 text-white px-4 py-10 fixed top-0 left-0 w-full z-50">
      <div className="w-full sm:w-11/12 md:w-3/4 lg:w-2/5 mx-auto bg-[#2e2f31] p-6 md:p-8 rounded-2xl shadow-lg mt-20">
      <div className="text-end" >
        <button className="p-2 hover:bg-gray-700 rounded-lg" onClick={closeModal} >
          <IoClose size={20} />
        </button>
      </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          Book a Free Demo
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={bookDemoSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <Field
                    type="text"
                    name="fullName"
                    placeholder="Your Name *"
                    className="w-full bg-[#2e2f31] border border-gray-600 rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-400 text-sm mt-1"
                  />
                </div>

                <div className="w-full">
                  <Field
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number *"
                    className="w-full bg-[#2e2f31] border border-gray-600 rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-red-400 text-sm mt-1"
                  />
                </div>
              </div>

              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  className="w-full bg-[#2e2f31] border border-gray-600 rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  type="date"
                  name="preferredDate"
                  className="w-full bg-[#2e2f31] border border-gray-600 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="preferredDate"
                  component="div"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  as="textarea"
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  className="w-full bg-[#2e2f31] border border-gray-600 rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-gradient-to-tr from-[#383b40] text-xl rounded-lg relative h-16 w-40 overflow-hidden text-gray-300 shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-[#1b1d1f] before:duration-300 hover:text-white hover:before:h-64 hover:before:-translate-y-32"
                >
                  <span className="relative z-10">Submit</span>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BookDemo;
