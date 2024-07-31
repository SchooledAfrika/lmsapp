"use client";
import React, { useState, useEffect } from "react";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { IExamSubSub } from "./TestType";

const TestPaper: React.FC<IExamSubSub> = ({ getValues, setValue, errors }) => {
  const [questions, setQuestions] = useState(() => {
    const initialQuestions = getValues("test");
    return (
      initialQuestions ?? [
        { question: "", answer: "", options: ["", "", "", ""] },
      ]
    );
  });
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const initialQuestions = getValues("test");
    if (initialQuestions) {
      setQuestions(initialQuestions);
    }
  }, [getValues]);

  const handleAddQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newQuestions = [
      ...questions,
      { question: "", options: ["", "", "", ""], answer: "" },
    ];
    setQuestions(newQuestions);
    setValue("test", newQuestions);
    setCurrentIndex((index) => index + 1);
  };

  const handleQuestionChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuestions = [...questions];
    newQuestions[index].question = e.target.value;
    setQuestions(newQuestions);
    setValue("test", newQuestions);
  };

  const handleOptionChange = (
    qIndex: number,
    oIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = event.target.value;
    setQuestions(newQuestions);
    setValue("test", newQuestions);
  };

  const handleCheckboxChange = (qIndex: number, oIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answer = newQuestions[qIndex].options[oIndex];
    setQuestions(newQuestions);
    setValue("test", newQuestions);
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      return;
    } else {
      setCurrentIndex((index) => index - 1);
    }
  };
  const handleNext = () => {
    if (currentIndex === questions.length - 1) {
      return;
    } else {
      setCurrentIndex((index) => index + 1);
    }
  };

  return (
    <div className="flex flex-col pl-[0] mt-[40px] md:mt-[0]">
      <label className="font-bold text-[18px] pb-3">Set up your Test!</label>
      <div className=" bg-[#FFFFFF] p-5">
        {questions.map((q, qIndex) => (
          <div
            key={qIndex}
            className={` ${
              qIndex === currentIndex ? "flex" : "hidden"
            } flex-col mb-5`}
          >
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
                  onChange={() => handleCheckboxChange(qIndex, oIndex)}
                  className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-green-600 checked:border-transparent focus:outline-none"
                />
              </label>
            ))}
          </div>
        ))}
        <div className=" w-full flex items-center justify-between ">
          <div className=" flex items-center gap-2">
            <div
              onClick={handlePrev}
              className=" cursor-pointer w-[40px] aspect-square flex items-center justify-center border rounded-md"
            >
              <GrFormPrevious />
            </div>
            <div
              onClick={handleNext}
              className=" cursor-pointer w-[40px] aspect-square flex items-center justify-center border rounded-md"
            >
              <GrFormNext />
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddQuestion}
            className="font-bold text-[12px] hover:bg-green-200 rounded px-2 py-3 transform ease-in-out duration-500 transition-all"
          >
            Add More Questions +
          </button>
        </div>
      </div>
      {errors.test && (
        <small className=" text-red-600">
          error occured, enter all field and the right option
        </small>
      )}
    </div>
  );
};

export default TestPaper;
