"use client";
import { moreSubjects, subjects } from "@/constants/index";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Container from "./Container";

interface Props {
  icon: string;
  title: string;
  tutorNum: string;
  duration: string;
  rating: string;
  index: number;
}

const PopularSubjectsCard = ({
  icon,
  title,
  tutorNum,
  duration,
  rating,
}: Props) => {
  return (
    <div className="md:w-[180px] w-full  font-subtext rounded-lg bg-white p-6 flex flex-col justify-evenly gap-3 hover:-translate-y-2 transition-transform duration-300 group">
      <div className="flex justify-center items-center">
        <Image src={`${icon}`} alt="icon" width={50} height={50} />
      </div>
      <div>
        <h2 className="text-sm font-titleFont font-semibold tracking-wide group-hover:text-textGreen">
          {title}
        </h2>
        <p className="text-sm mt-3">{tutorNum}</p>
        <div className="flex justify-between">
          <p className="text-sm mt-3">{duration}</p>
          <p className="text-sm mt-3 text-end">{rating}</p>
        </div>
      </div>
    </div>
  );
};

const PopularSubjects = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <Container>
      <div className="max-w-full mx-auto px-4 py-24">
        <div className="w-full flex flex-col items-center">
          <h2 className="text-2xl font-header text-lightGreen font-bold">
            {" "}
            <span className="hidden  md:inline-flex w-20 md:w-60 mb-2 py-[.5px]  lgl:w-72 h-[.5px] bg-lightGreen mr-6"></span>
            Popular Subjects{" "}
            <span className="hidden md:inline-flex mb-2 w-20 py-[.5px] md:w-60 lgl:w-72 h-[.5px] bg-lightGreen ml-6"></span>
          </h2>
        </div>
        <div className="grid  grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center lg:grid-cols-6 xl:grid-cols-6 gap-6 mt-10 lgl:px-10">
          {subjects.map((subject, index) => (
            <PopularSubjectsCard key={subject.id} {...subject} index={index} />
          ))}
        </div>

        {showMore && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            ></motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="grid   grid-cols-1 md:grid-cols-4 items-center lg:grid-cols-6 xl:grid-cols-6 gap-6 mt-10 lgl:px-10">
                {moreSubjects.map((moreSubject, index) => (
                  <PopularSubjectsCard
                    key={moreSubject.id}
                    {...moreSubject}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}

        <div className="mt-12 flex items-center justify-center">
          {showMore ? (
            <button
              onClick={() => setShowMore(false)}
              className="w-36 h-12 rounded-md text-textGreen text-[13px] border border-textGreen hover:bg-hoverColor duration-300"
            >
              Show Less
            </button>
          ) : (
            <button
              onClick={() => setShowMore(true)}
              className="w-36 font-header h-12 rounded-md text-white bg-dimOrange text-[13px] border border-textGreen hover:bg-gold duration-300"
            >
              Explore all Subjects
            </button>
          )}
        </div>
      </div>
    </Container>
  );
};

export default PopularSubjects;
