import React, { useState } from 'react';

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
  "What was your dream job as a child?"
];

export default function SecurityQuestions() {
  const [questions, setQuestions] = useState([{ question: '', answer: '' }]);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    if (questions.length < 3) {
      setQuestions([...questions, { question: '', answer: '' }]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Security Questions:', questions);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Set Up Security Questions</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q, index) => (
          <div key={index} className="space-y-2">
            <label className="block font-medium text-gray-700">
              Security Question {index + 1}
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(index, 'question', e.target.value)
              }
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
              className="w-full p-2 border rounded-md"
              value={q.answer}
              onChange={(e) =>
                handleQuestionChange(index, 'answer', e.target.value)
              }
              required
            />
          </div>
        ))}

        {questions.length < 3 && (
          <button
            type="button"
            onClick={addQuestion}
            className="text-blue-600 hover:underline"
          >
            + Add another question
          </button>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Save Security Questions
        </button>
      </form>
    </div>
  );
}
