/* eslint-disable react/prop-types */
import { useAuthContext } from "@/context";
import { useState } from "react";

const securityQuestions = [
  "What was the name of your first pet?",
  "What is your mother’s maiden name?",
  "What was the name of your first school?",
  "In what city were you born?",
  "What is your favorite book or movie?",
  "What was the make and model of your first car?",
  "What is your father's middle name?",
  "What was the name of your childhood best friend?",
  "What was the name of the street you grew up on?",
  "What was your dream job as a child?",
];

export default function ResetSecurity({values}) {
  const [questions, setQuestions] = useState({ question: "", answer: "" });
  const {ResetWithQuestion} = useAuthContext()



  const handleSubmit = (e) => {
    e.preventDefault();
    ResetWithQuestion({...values,...questions});
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <h1 className="text-4xl font-extrabold text-white mb-2">Security Setup</h1>
      <p className="text-blue-300 text-sm">
        Set your security questions for account recovery
      </p>

      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-lg p-8 mt-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-400 mb-6">
            Security Questions
          </h2>
        </div>
 
        <form onSubmit={handleSubmit} className="space-y-6">
          
            <div >
              <label className="block text-sm text-gray-400 mb-1">
                Security Question 
              </label>
              <select
                value={questions.question}
                onChange={(e) =>
                  setQuestions({...questions,question:e.target.value})
                }
                className="w-full bg-gray-900 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a question</option>
                {securityQuestions.map((question, idx) => (
                  <option key={idx} value={question}>
                    {question}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Your Answer"
                value={questions.answer}
                 onChange={(e) =>
                  setQuestions({...questions,answer:e.target.value})
                }
                required
                className="mt-2 w-full bg-gray-900 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
          >
            Save Security Questions
          </button>
        </form>
      </div>
    </div>
  );
}
