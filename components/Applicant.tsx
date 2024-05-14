import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import ApplicantsTable from "./ApplicantsTable";
import Container from "./Container";

const Applicant = () => {
  return (
    <section className="my-[80px] md:my-4">
      <Container>
        <div className="flex justify-between items-center mb-5">
          <Link href={""}>
            <Button className="bg-secondary text-white py-5 my-3">
              Expire Opportunity
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex ">
              <input
                type="checkbox"
                className="accent-lightGreen text-white mr-1"
              />
              <p className="mr-3 text-[12px]">All Status</p>
            </div>
            <div className="flex ">
              <input
                type="checkbox"
                className="accent-lightGreen text-white mr-1"
              />
              <p className="mr-3 text-[12px]">Active</p>
            </div>
            <div className="flex ">
              <input
                type="checkbox"
                className="accent-lightGreen text-white mr-1"
              />
              <p className="mr-3 text-[12px]">Pending</p>
            </div>
            <Link
              href="/school-dashboard/job-listing"
              className="cursor-pointer"
            >
              <Image src="/closeAlt.svg" alt="cancel" width={15} height={15} />
            </Link>
          </div>
        </div>
        <ApplicantsTable />
      </Container>
    </section>
  );
};

export default Applicant;
