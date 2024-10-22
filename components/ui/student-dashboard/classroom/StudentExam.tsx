"use client";
import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentExamSchema } from "@/constants/studentExam";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Container from "@/components/Container";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Backwards from "../../Backwards";

export type IstudentExam = z.infer<typeof studentExamSchema>;

const StudentExam = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const id = searchParams.get("examId"); 


  // react-hook-form setup
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<IstudentExam>({
    resolver: zodResolver(studentExamSchema),
  });

 


  

  //Create a state instance for the answeredExam Object
  const [questions, setQuestions] = useState(() => {
    const initialQuestions = getValues("answeredExam");
    return (
      initialQuestions ?? [
        {
          question: "",
          answer: "",
          studentAnswer: "",
          option: ["", "", "", ""],
        },
      ]
    );
  });

  // Fetch data using React Query
  const { data, isLoading: queryLoading } = useQuery({
    queryKey: ["getStudentExams", id],
    queryFn: async () => {
      const response = await fetch(`/api/class-exam?examId=${id}`);
      const result = await response.json();
      return result;
    },
    enabled: !!id, // Ensure the query only runs if id is present
  });

  // Mutation for submitting the exam
 
  const mutation = useMutation({
    mutationKey: ["postStudentExam"],
    mutationFn: async (data: IstudentExam) => {
      const result = await fetch("/api/class-exam", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          examId: id,
          answeredExam: data.answeredExam.map((exam) => ({
            question: exam.question,
            answer: exam.answer,
            studentAnswer: exam.studentAnswer,
            options: exam.option,
          })),
        }),
      });
      

      return result;
    },
    onSuccess: async (result) => {
      queryClient.invalidateQueries({ queryKey: ["getStudentExams"] });
      if (result.ok) {
        const body = await result.json();
        const score = body.message;
        console.log(score);
        setScore(score);
        setLoading(false);
        reset();
        toast.success("You have successfully submitted exam!!");
      } else {
        setLoading(false);
        toast.error("Error submitting exam.");
      }
    },
  });

  const runSubmit = (data: IstudentExam) => {
    console.log("Form submission triggered"); // Log to indicate submission attempt
    console.log("Form data:", data); // Log the data being submitted
    setLoading(true);
    mutation.mutate(data);
  };

  
  // Update the questions state with the fetched data. This logic is to handle possible errors that may arise from name convention. The getter query object "data.test" has an entry of "options" while the poster object "data.answeredExam" has an entry of "option", this is to transform the options to option so that it doesn't cause conflict in the backend.
  useEffect(() => {
    if (data && Array.isArray(data.test)) {
      // Transform data.test to match the expected state structure
      const transformedQuestions = data.test.map((question: any) => ({
        question: question.question,
        answer: question.answer || "", // Default to empty string if not available
        studentAnswer: question.studentAnswer || "", // Default to empty string if not available
        option: question.options, // Rename options to option
      }));

      setQuestions(transformedQuestions);
      setValue("answeredExam", transformedQuestions); // Pre-fill form with transformed data
    } else {
      // Handle the case where data.test is not an array
      setQuestions([]);
      setValue("answeredExam", []);
    }
  }, [data, setValue]);

  // Handle question change
  const handleQuestionChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = e.target.value;
    setQuestions(updatedQuestions);
    setValue("answeredExam", updatedQuestions);
  };

  // Handle options change
  const handleOptionChange = (
    qIndex: number,
    oIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].option[oIndex] = event.target.value;
    setQuestions(updatedQuestions);
    setValue("answeredExam", updatedQuestions);
  };

  // Handle checkbox change (select student answer)
  const handleCheckboxChange = (qIndex: number, oIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].studentAnswer =
      updatedQuestions[qIndex].option[oIndex];
    setQuestions(updatedQuestions);
    setValue("answeredExam", updatedQuestions);
  };

  // Handle previous and next navigation
  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default form submission on button click
    if (currentIndex > 0) setCurrentIndex((index) => index - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default form submission on button click
    if (currentIndex < questions.length - 1)
      setCurrentIndex((index) => index + 1);
  };

  

   //Further check to make sure that the Id of the Exam is not undefined or null.
   if (!id) {
    toast.error("Exam ID is missing.");
    return;
  }

  return (
    <Container className="">

      <div className=" w-full flex items-center mb-6 justify-between">
        <p className=" font-bold text-black">Details</p>
        <Backwards />
      </div>
      {queryLoading ? (
        <p>Loading exam data...</p>
      ) : (
        <div className="flex md:flex-row flex-col">
          {score !== null && (
            <div>
              <p className="my-2 font-semibold text-[16px]">Your Score</p>
          <div className="border-2  border-lightGreen flex place-items-center w-[100px] h-[100px] rounded-full p-2">
            <span className="mx-auto text-2xl font-bold text-lightGreen">{score} </span>
          </div>
          </div>
           )}
        <form className="w-full flex-5 mt-6" onSubmit={handleSubmit(runSubmit)}>
          <div className="flex flex-col w-full md:w-3/4 md:mx-auto ">
            <label className="font-bold text-[18px] pb-3 mt-6 text-center">
              Answer Your Exams
            </label>
            <div className="bg-white p-5 md:mx-auto ">
              {questions.map((q, qIndex) => (
                <div
                  key={qIndex}
                  className={`${
                    qIndex === currentIndex ? "flex" : "hidden"
                  } flex-col mb-5`}
                >
                  <label className="font-bold">Question {qIndex + 1}</label>
                  <input
                    type="text"
                    name="text"
                    value={q.question}
                    onChange={(e) => handleQuestionChange(qIndex, e)} // Attach the change handler here
                    className="my-2 p-3 text-[12px] outline-none w-full md:w-[30vh] lg:w-[60vh] bg-[#F8F7F4]"
                  />
                  <label className="font-bold text-[12px]">Options</label>
                  {/* Make sure that the options array is in fact an array */}
                  {Array.isArray(q.option) &&
                    q.option.map((option, oIndex) => (
                      <label key={oIndex} className="flex items-center gap-3">
                        <input
                          type="text"
                          name="text"
                          value={option}
                          placeholder={`Option ${oIndex + 1}`}
                          onChange={(e) =>
                            handleOptionChange(qIndex, oIndex, e)
                          }
                          className="my-2 p-3 text-[12px] outline-none w-full md:w-[30vh] lg:w-[55vh] bg-[#F8F7F4]"
                        />
                        <input
                          type="checkbox"
                          name="text"
                          checked={q.studentAnswer === option}
                          onChange={() => handleCheckboxChange(qIndex, oIndex)}
                          className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-green-600 checked:border-transparent focus:outline-none"
                        />
                      </label>
                    ))}
                </div>
              ))}

              <div className="w-full flex items-center justify-between ">
                <div className="flex items-center gap-2">
                  <button
                    type="button" // Ensure this is a button, not submit
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className="cursor-pointer w-[40px] aspect-square flex items-center justify-center border rounded-md"
                  >
                    <GrFormPrevious />
                  </button>
                  <button
                    type="button" // Ensure this is a button, not submit
                    onClick={handleNext}
                    disabled={currentIndex === questions.length - 1}
                    className="cursor-pointer w-[40px] aspect-square flex items-center justify-center border rounded-md"
                  >
                    <GrFormNext />
                  </button>
                </div>
              </div>
              <Button
                className="bg-secondary hover:bg-green-800 w-full text-white text-[16px] px-6 py-7 my-5"
                type="submit" // Submit only on this button
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Exam"}
              </Button>
            </div>
          </div>

          {errors.answeredExam && (
            <small className="text-red-600">Please complete all fields</small>
          )}
        </form>
        </div>
      )}

      <ToastContainer />
    </Container>
  );
};

export default StudentExam;
