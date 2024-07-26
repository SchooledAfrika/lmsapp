"use client";
import React, { useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
interface TestPaperProps {
  onChangeComponent: (view: string) => void;
}

const TestPaper = () => {
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], answer: undefined },
  ]);

  const handleAddQuestion = (e: any) => {
    e.preventDefault();
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], answer: undefined },
    ]);
  };

  const handleQuestionChange = (
    index: any,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuestions = [...questions];
    newQuestions[index].question = e.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex: any, oIndex: any, event: any) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleCheckboxChange = (qIndex: any, oIndex: any) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answer = oIndex;
    setQuestions(newQuestions);
  };

  const data = ["Option A", "Option B", "Option C", "Option D"];

  return (
    <div className="flex flex-col pl-[0] mt-[40px] md:mt-[0]">
      <label className="font-bold text-[18px] pb-3">Set up your Test !</label>
      <div className=" bg-[#FFFFFF] p-5">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="flex flex-col mb-5">
            <label className="font-bold">Question {qIndex + 1}</label>
            <input
              type="text"
              name="text"
              value={q.question}
              placeholder="Your Question here"
              onChange={(e) => handleQuestionChange(qIndex, e)}
              className="my-2 p-3 text-[12px] outline-none w-full md:w-[30vh] lg:w-[60vh] bg-[#F8F7F4]"
            />
            <label className="font-bold text-[12px]">Options</label>
            {q.options.map((option, oIndex) => (
              <label key={oIndex} className="flex items-center gap-3">
                <input
                  type="text"
                  name="text"
                  value={option}
                  placeholder={`Option ${oIndex + 1}`}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                  className="my-2 p-3 text-[12px] outline-none w-full md:w-[30vh] lg:w-[55vh] bg-[#F8F7F4]"
                />
                <input
                  type="checkbox"
                  name="preferences"
                  checked={q.answer === oIndex}
                  onChange={() => handleCheckboxChange(qIndex, oIndex)}
                  className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-green-600 checked:border-transparent focus:outline-none"
                />
              </label>
            ))}
          </div>
        ))}
        <div className=" w-full flex items-center justify-between ">
          <div className=" flex items-center gap-2">
            <div className=" cursor-pointer w-[40px] aspect-square flex items-center justify-center border rounded-md">
              <GrFormPrevious />
            </div>
            <div className=" cursor-pointer w-[40px] aspect-square flex items-center justify-center border rounded-md">
              <GrFormNext />
            </div>
          </div>
          <button
            onClick={handleAddQuestion}
            className="font-bold text-[12px] hover:bg-green-200 rounded px-2 py-3 transform ease-in-out duration-500 transition-all"
          >
            Add More Questions +
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestPaper;
