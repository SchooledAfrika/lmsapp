import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaEnvelopeCircleCheck } from "react-icons/fa6";

const Contact = () => {
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
              Reach out to us.
            </p>
            <h3 className="md:text-[40px] md:leading-[42px] text-xl w-[300px] md:w-[668px] font-bold font-subtext">
              Lorem ipsum dolor sit amet, consectutuer adipsig elit.
            </h3>
            <p className="w-[300px] md:w-[668px] font-subtext md:font-[300px] mt-3 leading-[20px] md:leading-[32px]">
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
              interdum sapien, id aliquam ligula. Maecenas eget neque id ligula
              egestas blandit. Suspendisse potenti.
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
                interdum sapien,
              </span>
            </li>
            <li className="border-dotted border-l-2  border-lightGreen text-lightGreen">
              <FaPhoneSquareAlt className="-ml-[0.7rem] mt-4 text-lightGreen text-xl" />
              <span className="ml-3 text-black font-bold">Phone Number</span>
            </li>

            <li className="border-dotted border-l-2  border-lightGreen text-lightGreen">
              <span className="ml-3 text-black text-sm">
                +23491************
              </span>
            </li>

            <li className="border-dotted border-l-2  border-lightGreen text-lightGreen">
              <FaEnvelopeCircleCheck className="-ml-[0.7rem] mt-4 text-lightGreen text-xl" />
              <span className="ml-3 text-black font-bold">Email Address</span>
            </li>

            <li className="border-dotted border-l-2  border-lightGreen text-lightGreen">
              <span className="ml-3 text-black text-sm">
                Schookafrika@gmail.edu.ng
              </span>
            </li>
          </ul>
        </div>

        {/* Form starts */}
        <div className="md:w-[35%] w-[90%] overflow-hidden md:h-[650px] h-[800px] z-40 bg-white absolute top-[493px] md:left-[700px] left-[25px] rounded-xl">
          <h3 className="font-subtext font-bold my-6 mx-4">
            Get in Touch With Us
          </h3>
          <p className="mx-4 mb-12 text-md font-subtext">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
          </p>
          <form className="w-full">
            <div className="md:flex hidden md:flex-row flex-col w-full items-center justify-between">
              <div>
                <label className=" ml-4 mt-12 text-sm">
                  Name<span className="text-red-600">*️</span>
                </label>
                <br />
                <input
                  type="text"
                  className="ml-4  mb-2 p-2 mr-3 rounded-md bg-stone-200"
                />
              </div>
              <div>
                <label className="  mt-12 text-sm">
                  Phone Number<span className="text-red-600">*️</span>
                </label>
                <br />
                <input
                  type="phone"
                  className="mr-12 mb-2  p-2 rounded-md bg-stone-200"
                />
              </div>
            </div>
            <label className="ml-4 md:hidden block mt-8 text-sm">
              Name<span className="text-red-600">*️</span>
            </label>
            <br />
            <input
              type="text"
              className="w-[90%] md:hidden block mb-6 rounded-md ml-4 bg-stone-200  p-2"
            />
            <label className="ml-4 mt-8 md:hidden block text-sm">
              Phone Number<span className="text-red-600">*️</span>
            </label>
            <br />
            <input
              type="phone"
              className="w-[90%] md:hidden block mb-6 rounded-md ml-4 bg-stone-200  p-2"
            />
            <label className="ml-4 mt-3 text-sm">
              Email Address<span className="text-red-600">*️</span>
            </label>
            <br />
            <input
              type="email"
              className="w-[90%] mb-6 rounded-md ml-4 bg-stone-200  p-2"
            />
            <label className="ml-4 mt-8 text-sm">
              Message<span className="text-red-600">*️</span>
            </label>
            <br />
            <textarea
              cols={30}
              className="bg-stone-200 mb-6 rounded-md ml-4 p-6 w-[90%]"
            ></textarea>

            <Button className="ml-4 my-6 bg-lightGreen hover:bg-green-500 rounded-md text-white text-base mt-3 px-3 w-[90%]  py-2 text-center lg:block">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
