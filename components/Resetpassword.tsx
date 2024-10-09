"use client";
import React, { useEffect, useState } from "react";
import { LeftRecover } from "./RecoverPassword";
import { useParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { IoMdCheckmark } from "react-icons/io";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";

// component to display successful message
const SuccessfulMessage = () => {
  return (
    <div className=" flex flex-col gap-3 items-center">
      <div className=" w-[150px] h-[150px] rounded-full border-[5px] border-green-700 text-green-700 flex text-[40px] items-center justify-center">
        <IoMdCheckmark />
      </div>
      <div>
        <p className=" text-[18px]">
          Password Reset successful!!!{" "}
          <Link className=" underline text-blue-700" href={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

// the right side for the reset below
const RightReset = () => {
  const { token } = useParams();
  const [password, setpassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [successful, setSuccessful] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  // initialize our mutation function here
  const mutation = useMutation({
    mutationKey: ["conformreset"],
    mutationFn: async () => {
      const response = await fetch("/api/confirm-reset", {
        method: "POST",
        body: JSON.stringify({ password, jwtstring: token }),
      });
      return response;
    },
    onSuccess: async (response) => {
      if (response.ok) {
        setSuccessful(true);
      }
    },
  });

  //   function to trigger submission below
  const handleSubmit = () => {
    if (!password || !confirmPassword)
      return toast.error("both password and confirm password must be provided");
    if (password !== confirmPassword)
      return toast.error("passwords do not match");
    setSubmitting(true);
    mutation.mutate();
  };

  return (
    <div className=" flex-1 flex items-center justify-center flex-col w-full ">
      {successful ? (
        <SuccessfulMessage />
      ) : (
        <div className=" w-full flex flex-col items-center">
          <p className=" font-bold text-[25px] mb-6">Reset password</p>
          <div className=" flex flex-col items-center gap-3 w-full">
            <div className=" w-3/5 border rounded-md border-black p-2">
              <input
                placeholder="enter password..."
                className=" w-full outline-none"
                type="password"
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div className=" w-3/5 border rounded-md border-black p-2">
              <input
                placeholder="confirm password..."
                className=" w-full outline-none"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            disabled={submitting}
            onClick={handleSubmit}
            className=" mt-4 transition-all ease-in-out duration-700 hover:bg-[#40c7c7] cursor-pointer w-3/5 bg-[#29abab] rounded-md flex items-center justify-center py-3 text-white font-bold"
          >
            {submitting ? <p>Submitting...</p> : <p>Submit</p>}
          </button>
        </div>
      )}
    </div>
  );
};

const ExpiredToken = () => {
  return (
    <div className=" flex w-full h-[calc(100vh-70px)] items-center justify-center">
      <div className=" flex flex-col gap-2 items-center">
        <Image
          src="/expired.png"
          alt="expired token"
          width={200}
          height={200}
          priority
          className=" rounded-full"
        />
        <p className=" text-red-500">
          token generated more than 1hr automatically expires
        </p>
      </div>
    </div>
  );
};

const Resetpassword = () => {
  const { token } = useParams();
  const [expired, setExpired] = useState<boolean>(false);
  useEffect(() => {
    if (token) {
      try {
        const decoded: any = jwtDecode(token as string);
        // Check if token has expired
        if (decoded.exp * 1000 < Date.now()) {
          setExpired(true);
        }
      } catch (error) {
        setExpired(true); // Set expired to true if decoding fails
      }
    }
  }, [token]);
  return (
    <div>
      {expired ? (
        <ExpiredToken />
      ) : (
        <div className=" flex w-full h-[calc(100vh-70px)] bg-white max-xs:flex max-xs:items-center max-xs:justify-center">
          <LeftRecover />
          <RightReset />
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default Resetpassword;
