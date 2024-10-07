"use client";
import Image from "next/image";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";

// the left side of the page
export const LeftRecover = () => {
  return (
    <div className=" hidden sm:flex sm:flex-1 h-full items-center justify-center">
      <Image
        src="/repass1.avif"
        alt="resetImage"
        width={200}
        height={200}
        priority
        className=" w-2/3"
      />
    </div>
  );
};
// the right part of the page
const RightRecover = () => {
  const [email, setEmail] = useState<string>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  //   react query to submit the email to backend
  const mutation = useMutation({
    mutationKey: ["resetpassword"],
    mutationFn: async () => {
      const response = await fetch("/api/generate-reset-jwt", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      return response;
    },
    onSuccess: (response) => {
      setSubmitting(false);
      if (response.ok) {
        toast.success("Check your email for reset password link");
      } else {
        toast.error("This email is not registered, please try again");
      }
    },
  });
  // function that triger email submission to the backed
  const handleSend = () => {
    // below is the regex for checking valid email
    // we check if email is not inputted
    // and also check if the user is passing correct email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) return toast.error("enter your email");
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) return toast.error("Please enter a valid email");
    setSubmitting(true);
    mutation.mutate();
  };
  return (
    <div className=" flex-1 h-full flex items-center justify-center flex-col">
      <div className=" max-w-[90%] sm:max-w-[70%] flex items-center justify-center flex-col gap-3">
        <p className=" text-[24px] font-bold mb-4">Forgot Password</p>
        <div className=" flex flex-col items-center gap-4">
          <p className=" text-center  text-[14px] text-slate-600">
            Don't worry Resetting your password is easy, just tell us the email
            address you registered with schooledafrika
          </p>
          <div className=" w-3/4 border rounded-md border-black p-2">
            <input
              placeholder=" enter email"
              className=" w-full outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className=" flex items-center flex-col mt-3 justify-center gap-1">
          <button
            onClick={handleSend}
            className=" transition-all ease-in-out duration-700 hover:bg-[#40c7c7] cursor-pointer w-3/4 bg-[#29abab] rounded-md flex items-center justify-center py-3 text-white font-bold"
          >
            {submitting ? <p>Sending...</p> : <p>Send</p>}
          </button>
          <div className=" w-full pl-4">
            <p className=" text-[14px]">
              Schooledafrika is securely protected and the{" "}
              <span className=" text-green-700">Privacy Policy</span> and{" "}
              <span className=" text-green-700">Terms of Service</span> apply
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
// the main component for recovering password
const RecoverPassword = () => {
  return (
    <div className=" flex w-full h-[calc(100vh-70px)] bg-white max-xs:flex max-xs:items-center max-xs:justify-center">
      <LeftRecover />
      <RightRecover />
      <ToastContainer />
    </div>
  );
};

export default RecoverPassword;
