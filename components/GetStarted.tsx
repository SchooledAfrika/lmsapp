import React from "react";
import Container from "./Container";
// import FadeIn from "./FadeIn";
import { BsSendArrowUp } from "react-icons/bs";

const GetStarted = () => {
  return (
    <Container>
      <div className="-mx-6 hidden md:block rounded-full bg-dimYellow px-6 py-20  sm:mx-0 sm:py-32 md:px-12">
        <div className="flex sm:justify-between justify-evenly sm:flex-row flex-col sm:gap-16  gap-2 mx-auto">
          <div className=" mx-6 text-justify flex-1 font-poppins">
            <h2 className=" text-2xl font-medium text-black [text-wrap:balance] sm:text-3">
              Lorem
            </h2>
            <p className="text-black my-6 font-normal leading-[20px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
              interdum sapien, id aliquam ligula. Maecenas eget neque id ligula
              egestas blandit.
            </p>
          </div>
          <div className="mt-8 flex flex-1 flex-wrap items-center gap-x-6 sm:gap-4">
            <div className="relative mt-6 w-full mb-6 sm:w-5/6">
              <input
                type="email"
                placeholder="Enter Email..."
                autoComplete="email"
                aria-label="Email address"
                className="block w-full font-header shadow-2xl bg-white  rounded-3xl border border-gray-100 bg-transparent px-12 py-4 pl-6 pr-20 text-base/6 text-black ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-100 "
              />
              <div className="absolute overflow-hidden inset-y-1 right-1 flex justify-end">
                <button
                  type="submit"
                  aria-label="Submit"
                  className="flex aspect-square h-full items-center justify-center rounded-full bg-dimOrange text-white transition hover:bg-dimYellow"
                >
                  <BsSendArrowUp className="w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default GetStarted;
