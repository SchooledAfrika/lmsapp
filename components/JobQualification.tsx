"use client";
import React, { useState, useEffect } from "react";
import { IJobSub } from "./JobDescription";

const JobQualification: React.FC<IJobSub> = ({
  getValues,
  setValue,
  errors,
}) => {
  const [qualifications, setQualifications] = useState<string[]>(() => {
    const initialQualifications = getValues("qualifications");
    return initialQualifications ?? [""];
  });

  useEffect(() => {
    const initialQualifications = getValues("qualifications");
    if (initialQualifications) {
      setQualifications(initialQualifications);
    }
  }, [getValues]);

  const handleAddedQualification = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newQualification = [...qualifications, ""];

    setQualifications(newQualification);
    setValue("responsibility", newQualification);
  };

  const handleQualificationChange = (
    qIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newQualification = [...qualifications];
    newQualification[qIndex] = event.target.value;
    setQualifications(newQualification);
    setValue("qualifications", newQualification);
  };

  return (
    <section className="w-full md:w-2/3 flex flex-col gap-3">
      <label className="font-bold text-[18px]">Job Qualifications</label>
      <div className=" flex flex-col gap-2">
        <div className=" flex flex-col gap-1">
          {qualifications.map((qualification, qIndex) => (
            <label key={qIndex} className="flex items-center gap-3">
              <input
                type="text"
                name="qualifications"
                value={qualification}
                placeholder={`qualification ${qIndex + 1}`}
                onChange={(e) => handleQualificationChange(qIndex, e)}
                className=" p-4 text-[12px] rounded-md outline-none w-full  bg-[#fff]"
              />
            </label>
          ))}
        </div>
        {errors.qualifications && (
          <small className=" text-red-600">
            please enter job Qualifications
          </small>
        )}
        <div className=" w-full flex items-center justify-between ">
          <button
            type="button"
            onClick={handleAddedQualification}
            className="font-bold text-[12px] hover:bg-green-200 rounded px-2 py-3 transform ease-in-out duration-500 transition-all"
          >
            Add More Qualifications +
          </button>
        </div>
      </div>
    </section>
  );
};

export default JobQualification;
