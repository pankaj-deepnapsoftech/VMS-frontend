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

export default function SecurityQuestions() {
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);
  const { UpdateProfile,authenticate } = useAuthContext();


  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    if (questions.length < 3) {
      setQuestions([...questions, { question: "", answer: "" }]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    UpdateProfile({security_questions: questions },authenticate._id);
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-modalBg backdrop-blur-sm z-40" />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div className="w-full max-w-lg bg-gray-800 rounded-2xl shadow-2xl p-6 relative animate-fadeIn">
          {/* Close Button */}
        

          <h2 className="text-2xl font-bold text-blue-400 text-center mb-4">
            Security Questions
          </h2>
          <p className="text-blue-300 text-sm text-center mb-6">
            Set your security questions for account recovery
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {questions.map((q, index) => (
              <div key={index}>
                <label className="block text-sm text-gray-400 mb-1">
                  Security Question {index + 1}
                </label>
                <select
                  value={q.question}
                  onChange={(e) =>
                    handleQuestionChange(index, "question", e.target.value)
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
                  value={q.answer}
                  onChange={(e) =>
                    handleQuestionChange(index, "answer", e.target.value)
                  }
                  required
                  className="mt-2 w-full bg-gray-900 text-white rounded-lg px-4 py-3 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            {questions.length < 3 && (
              <button
                type="button"
                onClick={addQuestion}
                className="text-blue-400 hover:underline text-sm"
              >
                + Add another question
              </button>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
            >
              Save Security Questions
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
