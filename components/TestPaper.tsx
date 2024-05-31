"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import { Button } from "./ui/button";

interface TestPaperProps {
  onChangeComponent: (view: string) => void;
}

const TestPaper: React.FC<TestPaperProps> = ({ onChangeComponent }) => {
  const handleTestSettings = () => {
    onChangeComponent("TestSettings");
  };

  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], selectedOption: null },
  ]);

  const handleAddQuestion = (e: any) => {
    e.preventDefault();
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], selectedOption: null },
    ]);
  };

  const handleQuestionChange = (index: any, event: any) => {
    const newQuestions = [...questions];
    newQuestions[index].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex: any, oIndex: any, event: any) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleCheckboxChange = (qIndex: any, oIndex: any) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].selectedOption = oIndex;
    setQuestions(newQuestions);
  };

  const data = ["Option A", "Option B", "Option C", "Option D"];

  return (
    <section>
      <Container>
        <div className="flex justify-between items-center mb-5">
          <span className="font-bold">Details</span>
          <Link
            href="/teacher-dashboard/test-and-resources/details"
            className="cursor-pointer"
          >
            <Image src="/closeAlt.svg" alt="cancel" width={15} height={15} />
          </Link>
        </div>
        <div className="flex flex-col md:flex-row  mb-[50px]">
          <div>
            <div className="flex gap-10">
              <span className="bg-[#359C71] px-[7px] rounded-full text-white">
                1
              </span>
              <p className="text-[#359C71] font-bold">Choose Type</p>
            </div>
            <p className="border-l-2 border-[#359C71] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#359C71] rounded-full px-[7px] text-white">
                2
              </span>
              <p className="text-[#359C71] font-bold">Test Paper</p>
            </div>
            <p className="border-l-2 border-[#E9ECEB] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#E9ECEB] rounded-full px-[7px] text-white">
                3
              </span>
              <p>Settings</p>
            </div>
            <p className="border-l-2 border-[#E9ECEB] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#E9ECEB] rounded-full px-[7px] text-white">
                4
              </span>
              <p>Finalization</p>
            </div>
          </div>
          <form className="flex flex-col pl-[0] md:pl-[100px] mt-[40px] md:mt-[0]">
            <label className="font-bold text-[18px] pb-3">
              Set up your Test !
            </label>
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
                        checked={q.selectedOption === oIndex}
                        onChange={() => handleCheckboxChange(qIndex, oIndex)}
                        className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-green-600 checked:border-transparent focus:outline-none"
                      />
                    </label>
                  ))}
                </div>
              ))}
              <button
                onClick={handleAddQuestion}
                className="font-bold text-[12px] w-full hover:bg-green-200 rounded p-4"
              >
                Add More Questions +
              </button>
              <Button
                onClick={handleTestSettings}
                className="bg-secondary w-full text-white text-[16px] px-6 py-7 my-3"
              >
                Proceed
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default TestPaper;
