import Image from "next/image";
import Link from "next/link";
import React from "react";
import Container from "./Container";
import { Button } from "./ui/button";

interface JobDescriptionProps {
  onClickCurrentView: (view: string) => any;
}

const JobDescription: React.FC<JobDescriptionProps> = ({
  onClickCurrentView,
}) => {
  const handleDescriptionView = () => {
    onClickCurrentView("responsibility");
  };

  return (
    <section className="my-[80px] md:my-6">
      <Container>
        <div className="flex justify-between items-center mb-5">
          <span className="font-bold">Details</span>
          <Link href="/school-dashboard/job-listing" className="cursor-pointer">
            <Image src="/closeAlt.svg" alt="cancel" width={15} height={15} />
          </Link>
        </div>
        <div >
          <div>
            <div className="flex gap-10">
              <span className="bg-[#359C71] px-[7px] rounded-full text-white">
                1
              </span>
              <p className="text-[#359C71] font-bold">Job Description</p>
            </div>
            <p className="border-l-2 border-[#E9ECEB] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#E9ECEB] rounded-full px-[7px] text-white">
                2
              </span>
              <p>Responsibilities</p>
            </div>
            <p className="border-l-2 border-[#E9ECEB] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#E9ECEB] rounded-full px-[7px] text-white">
                3
              </span>
              <p>Qualifications</p>
            </div>
            <p className="border-l-2 border-[#E9ECEB] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#E9ECEB] rounded-full px-[7px] text-white">
                4
              </span>
              <p>Finalization</p>
            </div>
          </div>
          <div>
            <form className="flex flex-col pl-[0] md:pl-[100px] mt-[40px] md:mt-[0]">
              <label className="font-bold text-[18px]">
                What does the job entail ?
              </label>
              <div className="flex flex-col md:flex-row gap-3 w-full">
                <input
                  type="text"
                  name="text"
                  placeholder="Job Title"
                  className="my-2 p-4 outline-none rounded-[8px] w-full md:w-[30vh] lg:w-[40vh] bg-white"
                />
                <input
                  type="text"
                  name="text"
                  placeholder="Role Type"
                  className="my-2 p-4 outline-none rounded-[8px] w-full md:w-[30vh] lg:w-[40vh] bg-white"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-3 w-full">
                <input
                  type="text"
                  name="text"
                  placeholder="State"
                  className="my-2 p-4 outline-none rounded-[8px] w-full md:w-[30vh] lg:w-[40vh] bg-white"
                />
                <input
                  type="text"
                  name="text"
                  placeholder="Grade"
                  className="my-2 p-4 outline-none rounded-[8px] w-full md:w-[30vh] lg:w-[40vh] bg-white"
                />
              </div>
              <textarea
                rows={6}
                cols={7}
                className="p-4 outline-none my-1"
                placeholder="Job Description"
              ></textarea>
              <div className="flex flex-col md:flex-row gap-3 w-full">
                <input
                  type="text"
                  name="text"
                  placeholder="Salary Range (Minimum)"
                  className="my-2 p-4 outline-none rounded-[8px] w-full md:w-[30vh] lg:w-[40vh] bg-white"
                />
                <input
                  type="text"
                  name="text"
                  placeholder="Salary Range (Maximum)"
                  className="my-2 p-4 outline-none rounded-[8px] w-full md:w-[30vh] lg:w-[40vh] bg-white"
                />
              </div>
              <Button
                onClick={handleDescriptionView}
                className="bg-secondary w-full text-white text-[16px] px-6 py-7 my-3"
              >
                Proceed
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default JobDescription;
