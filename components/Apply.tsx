import React from "react";
import Header from "./Header";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Container from "./Container";
import { Applies } from "@/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import { FaQuoteLeft } from "react-icons/fa";
import { MdPlayArrow } from "react-icons/md";
import Footer from "./Footer";

interface Props {
  title: string;
  result: string;
  index: number;
}

const ApplyCard = ({ title, result }: Props) => {
  return (
    <div className="md:w-[180px] w-full text-white my-3  font-subtext rounded-lg md:ml-16 ml-6  py-3 px-3 md:p-3 flex flex-col justify-center gap-3">
      <div>
        <h2 className="text-base  tracking-wide">{title}</h2>
        <p className="md:text-[30px] text-lg mt-3">{result}</p>
      </div>
    </div>
  );
};

const Apply = () => {
  return (
    <div className="font-subtext overflow-hidden bg-stone-100">
      <Header />
      <div className="z-40 bg-black md:h-[80%] h-full">
        <div className="relative z-40 h-full  text-white">
          <Image
            className="w-full h-full  z-0 opacity-40   object-cover"
            src={"/apply_bg.jpg"}
            alt="background"
            width={200}
            height={200}
          />
          <div className="flex flex-col z-10 opacity-100 absolute md:top-[100px] top-8 md:left-[40px] left-4 justify-between">
            <p className="font-bold w-[144px]  font-header h-[28px] text-dimYellow">
              Join us today
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

            <Button
              asChild
              className="hidden bg-lightGreen rounded-lg hover:bg-green-500 text-white text-base mt-3 px-3 w-32  py-2 text-center lg:block"
            >
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="pt-20 pb-6 text-center">
        <h2 className="text-xl md:text-2xl font-header text-lightGreen font-bold">
          {" "}
          <span className="hidden  md:inline-flex w-20 md:w-60 mb-2 py-[.5px]  lgl:w-72 h-[.5px] bg-lightGreen mr-6"></span>
          So Many Reasons to Join Us{" "}
          <span className="hidden md:inline-flex mb-2 w-20 py-[.5px] md:w-60 lgl:w-72 h-[.5px] bg-lightGreen ml-6"></span>
        </h2>
      </div>

      <Container>
        <section className="grid font-subtext  grid-cols-1 sm:px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 items-center xl:grid-cols-3 gap-6 mt-10">
          <div className="text-center">
            <Image
              alt=""
              src={"/apply-1.png"}
              width={50}
              height={50}
              className="w-1/5 mx-auto"
            />
            <h3 className="text-lg md:text-xl sm:text-xl my-4 font-semibold">
              Teach Your Way
            </h3>

            <p className="my-4 text-base">
              Publish the subject you want, in the way you want, and always have
              control of your own lessons.
            </p>
          </div>
          <div className="text-center">
            <Image
              alt=""
              src={"/apply-2.png"}
              width={50}
              height={50}
              className="w-1/3 mx-auto"
            />
            <h3 className="md:text-xl text-lg my-4 sm:text-xl font-semibold">
              Get Rewarded
            </h3>

            <p className="my-4 text-base">
              Expand your professional network, build your expertise, and earn
              money on each paid enrollment.
            </p>
          </div>
          <div className="text-center">
            <Image
              src={"/apply-3.png"}
              width={50}
              height={50}
              alt=""
              className="w-1/5 mx-auto"
            />
            <h3 className="md:text-xl text-lg my-4 sm:text-xl font-semibold">
              Amazing Support
            </h3>

            <p className="my-4 text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
              interdum sapien, id aliquam ligula.
            </p>
          </div>
        </section>
      </Container>
      <div className="grid mx-auto  grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 overflow-hidden bg-lightGreen md:grid-cols-5 items-center lg:grid-cols-5 xl:grid-cols-5  mt-3 lgl:px-10">
        {Applies.map((apply, index) => (
          <ApplyCard key={apply.id} {...apply} index={index} />
        ))}
      </div>

      <div className="py-20 text-center">
        <h2 className="text-2xl font-header text-lightGreen font-bold">
          {" "}
          <span className="hidden  md:inline-flex w-20 md:w-60 mb-2 py-[.5px]  lgl:w-72 h-[.5px] bg-lightGreen mr-6"></span>
          How to Become a Tutor{" "}
          <span className="hidden md:inline-flex mb-2 w-20 py-[.5px] md:w-60 lgl:w-72 h-[.5px] bg-lightGreen ml-6"></span>
        </h2>
      </div>

      <section className="mx-auto max-w-4xl">
        <div
          id=" font-subtext"
          className=" mb-12 flex  flex-col-reverse items-center justify-evenly gap-6 p-6 md:flex-row"
        >
          <div className="md:w-1/3 flex flex-col gap-6 justify-between">
            <div>
              <h3 className="font-bold text-xl mb-2">Complete Registration</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
                interdum sapien, id aliquam ligula.{" "}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">Create your Subjects</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
                interdum sapien, id aliquam ligula.{" "}
              </p>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">Teach and Get Paid</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
                interdum sapien, id aliquam ligula.{" "}
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/3 lgl:w-1/3 h-80 relative group">
            <div className="absolute overflow-hidden w-full h-80 left-1 -top-3 rounded-2xl ">
              <div className="w-full  h-full relative z-20 flex pl-6 lgl:pl-0">
                <Image
                  className="rounded-lg  mx-auto h-full w-full object-cover"
                  src={"/apply-woman.jpg"}
                  alt="profileImg"
                  width={200}
                  height={200}
                />
              </div>
            </div>
            <div className=" lgl:inline-flex w-full h-80 border-2 border-lightGreen rounded-md"></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl relative">
        <div
          id=" font-subtext"
          className=" mb-12 flex  flex-col items-center justify-center  gap-6 p-6 md:flex-row-reverse"
        >
          <div className="md:w-1/2 md:translate-x-1/3 flex ml-6 flex-col gap-6 justify-between">
            <div>
              <div className="flex my-4 justify-between text-lightGreen items-center">
                <FaQuoteLeft />
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                penatibus et magnis dis parturient montes, nascetur ridiculus
                mus. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                natoque penatibus et magnis dis parturient montes, nascetur
                ridiculus mus.
              </p>
              <p className="text-lightGreen text-lg font-semibold my-3">Mrs Bukola</p>
              <p>Founder, SchooledAfrika</p>
            </div>
          </div>

          <div className="hidden  pb-8 md:flex items-end justify-center md:w-[320px]  w-1/3    aspect-square bg-[tomato] rounded-full absolute md:left-3 md:top-6 top-72  left-52 lg:translate-x-1/2">
            <div className="absolute ">
              <Image
                className=" w-[240px]  ml-6"
                src={"/happy-woman.png"}
                alt="heroboy"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="pt-20 pb-6 mt-12 text-center">
        <h2 className="text-xl md:text-2xl font-header text-lightGreen font-bold">
          {" "}
          <span className="hidden  md:inline-flex w-20 md:w-60 mb-2 py-[.5px]  lgl:w-72 h-[.5px] bg-lightGreen mr-6"></span>
          Frequently Asked Questions{" "}
          <span className="hidden md:inline-flex mb-2 w-20 py-[.5px] md:w-60 lgl:w-72 h-[.5px] bg-lightGreen ml-6"></span>
        </h2>
      </div>

  <Accordion type="single" className="md:w-5/6 w-5/6 mx-auto mb-8"  collapsible>
  <AccordionItem className="bg-white border-2 my-2 border-white p-3 rounded-md" value="item-1">
  
  <AccordionTrigger className="text-start inline"> <MdPlayArrow className="inline text-lightGreen text-xl" /> How Much Can I Make From SchooledAfrika?</AccordionTrigger>
    <AccordionContent>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem className="bg-white border-2 my-2 border-white p-3 rounded-md" value="item-1">
  
  <AccordionTrigger className="text-start inline"> <MdPlayArrow className="inline text-lightGreen text-xl" /> How Much Can I Make From SchooledAfrika?</AccordionTrigger>
    <AccordionContent>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem className="bg-white border-2 my-2 border-white p-3 rounded-md" value="item-1">
  
  <AccordionTrigger className="text-start inline"> <MdPlayArrow className="inline text-lightGreen text-xl" /> How Much Can I Make From SchooledAfrika?</AccordionTrigger>
    <AccordionContent>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem className="bg-white border-2 my-2 border-white p-3 rounded-md" value="item-1">
  
  <AccordionTrigger className="text-start inline"> <MdPlayArrow className="inline text-lightGreen text-xl" /> How Much Can I Make From SchooledAfrika?</AccordionTrigger>
    <AccordionContent>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem className="bg-white border-2 my-2 border-white p-3 rounded-md" value="item-1">
  
  <AccordionTrigger className="text-start inline"> <MdPlayArrow className="inline text-lightGreen text-xl" /> How Much Can I Make From SchooledAfrika?</AccordionTrigger>
    <AccordionContent>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </AccordionContent>
  </AccordionItem>
</Accordion>

<Footer/>

    </div>
  );
};

export default Apply;
