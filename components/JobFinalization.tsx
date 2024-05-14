import Link from "next/link";
import Container from "./Container";
import Image from "next/image";
import { Button } from "./ui/button";

const JobFinalization: React.FC = () => {
  return (
    <section className="my-[80px] md:my-6">
      <Container>
        <div className="flex justify-between items-center mb-5">
          <span className="font-bold">Details</span>
          <Link href="/school-dashboard/job-listing" className="cursor-pointer">
            <Image src="/closeAlt.svg" alt="cancel" width={15} height={15} />
          </Link>
        </div>
        <div className="flex flex-col md:flex-row  mb-[50px]">
          <div>
            <div className="flex gap-10">
              <span className="bg-[#359C71] px-[7px] rounded-full text-white">
                1
              </span>
              <p className="text-[#359C71] font-bold">Job Description</p>
            </div>
            <p className="border-l-2 border-[#359C71] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#359C71] rounded-full px-[7px] text-white">
                2
              </span>
              <p className="text-[#359C71] font-bold">Responsibilities</p>
            </div>
            <p className="border-l-2 border-[#359C71] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#359C71] rounded-full px-[7px] text-white">
                3
              </span>
              <p className="text-[#359C71] font-bold">Qualifications</p>
            </div>
            <p className="border-l-2 border-[#359C71] h-[40px] md:h-[80px] ml-[10px]"></p>
            <div className="flex gap-10">
              <span className="bg-[#359C71] rounded-full px-[7px] text-white">
                4
              </span>
              <p className="text-[#359C71] font-bold">Finalization</p>
            </div>
          </div>
          <div>
            <form className="flex flex-col pl-[0] md:pl-[100px] mt-[40px] md:mt-[0]">
              <label className="font-bold text-[18px]">
                What is lorem ipsum dolor sit ?
              </label>
              <div className="w-full md:w-[38vw]">
                <textarea
                  rows={6}
                  cols={7}
                  className="p-4 outline-none my-1 !w-full"
                  placeholder="Additional Notes"
                ></textarea>
              </div>

              <Button className="bg-secondary w-full text-white text-[16px] px-6 py-7 my-3">
                Proceed
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default JobFinalization;
