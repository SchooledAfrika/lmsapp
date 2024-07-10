"use client";
import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaEnvelopeCircleCheck } from "react-icons/fa6";
import { contactSchema } from "@/constants/formsSchema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// type of the schema created
type Icontact = z.infer<typeof contactSchema>;
const Contact = () => {
  // initialization of the react-hool-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Icontact>({ resolver: zodResolver(contactSchema) });
  // function to handle submission to the backend
  const runSubmit = async (data: Icontact) => {
    const response = await fetch("/api/get-intouch", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const info = await response.json();
      toast.success(info.message);
      reset();
    } else {
      toast.error("message sent failed");
    }
  };

  return (
    <div className="font-subtext  overflow-hidden bg-stone-100">
      <div className="z-40 bg-black md:h-[80%] mb-16 h-full">
        <div className="relative z-40 h-[600px]  text-white">
          <Image
            className="w-full h-full  z-0 opacity-40   object-cover"
            src={"/contact-bg.jpg"}
            alt="background"
            width={200}
            height={200}
          />
          <div className="flex flex-col mt-8 z-10 opacity-100 absolute md:top-[100px] top-8 md:left-[40px] left-4 justify-between">
            <p className="font-bold w-[144px]  font-header h-[28px] text-dimYellow">
              Contact Us.
            </p>
            <h3 className="md:text-[40px] md:leading-[42px] text-xl w-[300px] md:w-[668px] font-bold font-subtext">
              Reach out to us.
            </h3>
            <p className="w-[300px] md:w-[668px] font-subtext md:font-[300px] mt-3 leading-[20px] md:leading-[32px]">
              {" "}
              We Are Just One Click Away! For any Questions, Request Or Remark,
              Send a Message and We will get back as soon as we can! We are here
              for you.
            </p>
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col justify-between">
        {/* Address and location */}
        <div className="w-full ml-10 md:mt-10 mt-[35rem] mb-10 flex flex-col md:flex-row gap-16">
          <ul className="md:w-1/2 w-[80%] flex flex-col leading-[40px]">
            <li className="border-dotted border-l-2  border-lightGreen text-lightGreen">
              <FaLocationDot className="-ml-[0.7rem] text-lightGreen text-xl" />
              <span className="ml-3 text-black font-bold">Address</span>
            </li>

            <li className="border-dotted border-l-2  border-lightGreen text-lightGreen">
              <span className="ml-3 text-black text-sm">
                Ikorodu, Lagos. Nigeria
              </span>
            </li>
            <li className="border-dotted border-l-2  border-lightGreen text-lightGreen">
              <FaPhoneSquareAlt className="-ml-[0.7rem] mt-4 text-lightGreen text-xl" />
              <span className="ml-3 text-black font-bold">Phone Number</span>
            </li>

            <li className="border-dotted border-l-2  border-lightGreen text-lightGreen">
              <span className="ml-3 text-black text-sm">+2347025005584</span>
            </li>

            <li className="border-dotted border-l-2  border-lightGreen text-lightGreen">
              <FaEnvelopeCircleCheck className="-ml-[0.7rem] mt-4 text-lightGreen text-xl" />
              <span className="ml-3 text-black font-bold">Email Address</span>
            </li>

            <li className="border-dotted border-l-2  border-lightGreen text-lightGreen">
              <span className="ml-3 text-black text-sm">
                schooledafrika@gmail.edu.ng
              </span>
            </li>
          </ul>
        </div>

        {/* Form starts */}
        <div className="md:w-[35%] w-[90%] overflow-hidden  py-3 z-40 bg-white absolute top-[493px] md:left-[700px] left-[25px] rounded-xl">
          <h3 className="font-subtext font-bold my-6 mx-4">
            Get in Touch With Us
          </h3>
          <p className="mx-4 mb-12 text-md font-subtext">
            We Are Just A Click Away!{" "}
          </p>
          <form
            onSubmit={handleSubmit(runSubmit)}
            className="w-full flex flex-col gap-4 px-4"
          >
            <div className="flex gap-4 md:gap-2  flex-col md:flex-row w-full md:items-center md:justify-between">
              <div className=" flex-1">
                <label className="text-sm">
                  Name<span className="text-red-600">*️</span>
                </label>
                <br />
                <input
                  {...register("name")}
                  type="text"
                  name="name"
                  className=" p-2 mr-3 rounded-md bg-stone-200 w-full"
                />
                {errors.name && (
                  <small className=" text-red-500">{errors.name.message}</small>
                )}
              </div>
              <div className="flex-1">
                <label className="  mt-12 text-sm">
                  Phone Number<span className="text-red-600">*️</span>
                </label>
                <br />
                <input
                  {...register("phoneNo")}
                  type="phone"
                  name="phoneNo"
                  className=" p-2 rounded-md bg-stone-200 w-full"
                />
                {errors.phoneNo && (
                  <small className=" text-red-500">
                    {errors.phoneNo.message}
                  </small>
                )}
              </div>
            </div>
            <div>
              <label className=" mt-3 text-sm">
                Email Address<span className="text-red-600">*️</span>
              </label>
              <input
                {...register("email")}
                name="email"
                type="text"
                className="w-full rounded-md  bg-stone-200  p-2"
              />
              {errors.email && (
                <small className=" text-red-500">{errors.email.message}</small>
              )}
            </div>
            <div>
              <label className=" mt-8 text-sm">
                Message<span className="text-red-600">*️</span>
              </label>
              <br />
              <textarea
                {...register("message")}
                cols={30}
                name="message"
                className="bg-stone-200  rounded-md h-[200px]  p-2 w-full"
              ></textarea>
              {errors.message && (
                <small className=" text-red-500">
                  {errors.message.message}
                </small>
              )}
            </div>

            <Button
              disabled={isSubmitting}
              type="submit"
              className=" bg-lightGreen hover:bg-green-500 rounded-md text-white text-base mt-3 px-3 w-full  py-2 text-center lg:block"
            >
              {isSubmitting ? "submitting..." : "submit"}
            </Button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;
