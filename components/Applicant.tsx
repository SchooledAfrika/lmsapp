import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import ApplicantsTable from "./ApplicantsTable";
import Container from "./Container";
import Backwards from "./ui/Backwards";

const Applicant = () => {
  return (
    <section className="my-[80px] md:my-4">
      <div className="">
        <div className="flex justify-end items-center mb-5 mt-4">
          <Backwards />
        </div>
        <ApplicantsTable />
      </div>
    </section>
  );
};

export default Applicant;
