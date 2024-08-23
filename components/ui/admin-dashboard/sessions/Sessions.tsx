import React from 'react'
import { sessions} from "@/constants/sessions";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ViewSession from './ViewSession';
//import ViewOffer from "./viewOffer";


interface Props {
    icon: string;
    subject: string;
    name: string;
    country: string;
    email: string;
    gender: string;
    sessionType: string;
    grade: string;
    time: string;
    hours: string;
    length: string;
    days: string;
    type: string;
    location: string;
    index: number;
  }

  const SessionCard = ({
    icon,
    subject,
    name,
    country,
    gender,
    sessionType,
    grade,
    time,
    hours,
    days,
    type,
    location,
  }: Props) => {
    return (
      <div className=" w-full  font-header rounded-lg bg-white p-4 flex flex-col justify-evenly gap-3 hover:-translate-y-2 transition-transform duration-300 group">
        <div className="flex justify-center items-center">
          <Image src={`${icon}`} alt="icon" width={50} height={50} />
        </div>
        <div>
          <h2 className="text-[15px] font-titleFont font-bold tracking-wide group-hover:text-textGreen">
            {subject}
          </h2>
          <p className="text-sm font-semibold mt-3">{name}</p>
          <div className="flex text-[13px] font-medium justify-between">
            <p className=" mt-3">{grade}</p>
            <p className=" mt-3">{sessionType}</p>
            <p className=" mt-3 text-end">{type}</p>
          </div>
          <p className="text-[13px] font-medium mt-3">{location}</p>
        </div>
        <ViewSession />
      </div>
    );
  };
  

const Sessions = () => {
  return (
    <section>
    <div className="max-w-full  py-6">
      <div className="grid  grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 items-center lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-10 lgl:px-10">
        {sessions.map((session, index) => (
          <SessionCard key={session.id} {...session} index={index} />
        ))}
      </div>
    </div>
  </section>
  )
}

export default Sessions