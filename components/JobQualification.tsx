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

  const [currentIndex, setCurrentIndex] = useState<number>(0);

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
    setValue("qualifications", newQualification);
    setCurrentIndex((index) => index + 1);
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
    <section className="my-[80px] md:my-6">
      <div className="md:pl-[100px] w-full">
        <label className="font-bold text-[18px]">Job Qualifications</label>
        {qualifications.map((qualification, qIndex) => (
          <label key={qIndex} className="flex items-center gap-3">
            <input
              type="text"
              name="qualifications"
              value={qualification}
              placeholder={`qualification ${qIndex + 1}`}
              onChange={(e) => handleQualificationChange(qIndex, e)}
              className="my-2 p-4 text-[12px] rounded-md outline-none w-full md:w-[500px] bg-[#fff]"
            />
          </label>
        ))}

        <div className="w-full flex items-center justify-between">
          <button
            type="button"
            onClick={handleAddedQualification}
            className="font-bold text-[12px] hover:bg-green-200 rounded px-2 py-3 transform ease-in-out duration-500 transition-all"
          >
            Add More Qualifications +
          </button>
        </div>

        {errors.qualifications && (
          <small className="text-red-600">
            Please enter job qualifications
          </small>
        )}
      </div>
    </section>
  );
};

export default JobQualification;
