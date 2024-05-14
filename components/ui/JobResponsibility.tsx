import { useState } from "react";
import Container from "../Container";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./button";

interface JobResponsibilityProps {
  onClickCurrentView: (view: string) => void;
}

const JobResponsibility: React.FC<JobResponsibilityProps> = ({
  onClickCurrentView,
}) => {
  const handleResponsibleView = () => {
    onClickCurrentView("qualification");
  };
  const [inputs, setInputs] = useState(["", "", "", "", ""]);

  const addInputField = () => {
    setInputs([...inputs, ""]);
  };

  const handleInputChange = (index: any, event: any) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
  };

  return (
    <section className="my-[80px] md:my-6">
      <Container>
        <div className="flex justify-between mb-5">
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
                What is lorem ipsum dolor sit ?
              </label>
              {inputs.map((input, index) => (
                <input
                  key={index}
                  type="text"
                  value={input}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Responsibility"
                  className="my-2 p-4 outline-none rounded-[8px] w-full md:w-[40vh] lg:w-[80vh] bg-white"
                />
              ))}
              <button
                onClick={addInputField}
                className="p-4 mt-2 font-bold rounded text-[12px] hover:bg-green-200"
              >
                Add More Responsibilities +
              </button>
              <Button
                onClick={handleResponsibleView}
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

export default JobResponsibility;
