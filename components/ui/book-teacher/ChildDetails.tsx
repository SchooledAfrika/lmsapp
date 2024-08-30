import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UseFormClearErrors,
  UseFormRegister,
  FieldErrors,
  Control,
  Controller,
  UseFormWatch,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";
import { Isession } from "@/components/BookSessionByParents";
import { IoCaretDown } from "react-icons/io5";
import { IoIosCheckmark } from "react-icons/io";

export interface ISessionSub {
  register: UseFormRegister<Isession>;
  errors: FieldErrors<Isession>;
  control?: Control<Isession>;
  clearErrors: UseFormClearErrors<Isession>;
  watch: UseFormWatch<Isession>;
  setValue: UseFormSetValue<Isession>;
  getValues: UseFormGetValues<Isession>;
  setmethod?: React.Dispatch<React.SetStateAction<string>>;
  method?: string;
  tutorName?: string;
  tutorImg?: string;
  tutorLang?: string;
}

// component for selecting multiple subject
export const MultipleSubject: React.FC<{
  selectedSubject: string[];
  handleSelectedSubject: (subject: string) => void;
}> = ({ selectedSubject, handleSelectedSubject }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  // the available subjects
  const Subject = [
    "CHEMISTRY",
    "PHYSICS",
    "BIOLOGY",
    "GOVERNMENT",
    "ENGLISH",
    "LITERATURE",
    "CRS",
    "MATHEMATICS",
  ];
  const togleExpand = () => {
    setExpanded((prev) => !prev);
  };
  return (
    <div className=" w-full flex flex-col gap-2">
      <div
        onClick={togleExpand}
        className=" cursor-pointer w-full flex items-center bg-white border border-slate-500 rounded-md pl-3 py-3"
      >
        <div className=" flex-12">
          {selectedSubject.length === 0 ? (
            <p>Subject</p>
          ) : (
            <div className=" flex w-full gap-1">
              {selectedSubject.map((subject, index) => (
                <div
                  className=" px-2 py-1 rounded-md text-[10px] text-white bg-slate-500"
                  key={index}
                >
                  <p>{subject}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <IoCaretDown className=" flex-1 text-[20px] text-green-600 " />
      </div>
      {expanded && (
        <div className=" w-full bg-white px-3 py-3 flex flex-col h-[150px] overflow-y-auto gap-1">
          {Subject.map((subject, index) => (
            <div
              onClick={() => handleSelectedSubject(subject)}
              className=" flex items-center gap-1 cursor-pointer"
              key={index}
            >
              <div
                className={` w-[25px] aspect-square rounded-md flex items-center justify-center ${
                  selectedSubject.includes(subject)
                    ? "bg-green-800"
                    : " bg-slate-500"
                } `}
              >
                {selectedSubject.includes(subject) && (
                  <IoIosCheckmark className=" text-[14px] text-white" />
                )}
              </div>
              <p className=" text-[16px] font-semibold">{subject}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ChildDetails: React.FC<ISessionSub> = ({
  register,
  errors,
  control,
  watch,
  clearErrors,
  setValue,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string[]>([]);
  const Curriculum = ["MONTESSORI", "BRITISH", "NIGERIAN"];
  // function to set or remove the subject selected
  const handleSelectSubject = (subject: string) => {
    const aspectSubject = [...selectedSubject];
    // check if the subject already exists
    const isSubjectExisting = aspectSubject.includes(subject);
    if (isSubjectExisting) {
      const modifiedSubject = aspectSubject.filter((item) => item !== subject);
      setSelectedSubject(modifiedSubject);
      setValue("subject", modifiedSubject);
      clearErrors("subject");
    } else {
      const modifiedSubject = [...aspectSubject, subject];
      setSelectedSubject(modifiedSubject);
      setValue("subject", modifiedSubject);
    }
  };
  watch("subject");

  return (
    <ScrollArea className="min-h-[500px] w-full ">
      <div className="">
        <div className="flex justify-between">
          <h3 className="text-xl md:ml-6 font-bold">Book Session</h3>
        </div>
        <div className="flex  mx-auto mt-8 mb-6 flex-col gap-3">
          <p className="text-lightGreen text-[15px] md:ml-8 font-semibold">
            Add Child Details
          </p>
          <p className="text-[14px] md:ml-8 font-semibold">
            Please complete the form with your child's details.
          </p>
        </div>

        <div className="space-y-4 md:mb-0 mb-8 my-2">
          <div className="border md:ml-8  justify-between px-3 flex flex-col py-2  rounded-md ">
            <p className="font-bold text-[14px] mb-1">Child Id</p>
            <input
              {...register("childId")}
              onChange={() => clearErrors("childId")}
              type="text"
              className="py-3 px-6 text-black rounded-md border text-[13px] w-full "
              placeholder="Child Name"
            />
            {errors.childId && (
              <small className="text-red-600">{errors.childId.message}</small>
            )}
          </div>
          <div className="flex  flex-col border md:ml-8   px-3  py-2  rounded-md gap-1">
            <Controller
              control={control}
              name="grade"
              render={({ field }) => (
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    clearErrors("grade");
                  }}
                >
                  <SelectTrigger className=" w-full py-6">
                    <SelectValue placeholder="Grade" />
                  </SelectTrigger>

                  <SelectContent className=" font-subtext font-medium">
                    <ScrollArea className="h-[200px] w-full ">
                      <SelectGroup>
                        <SelectItem value="Grade1">Grade 1</SelectItem>
                        <SelectItem value="Grade2">Grade 2</SelectItem>
                        <SelectItem value="Grade3">Grade 3</SelectItem>
                        <SelectItem value="Grade4">Grade 4</SelectItem>
                        <SelectItem value="Grade5">Grade 5</SelectItem>
                        <SelectItem value="Grade6">Grade 6</SelectItem>
                        <SelectItem value="Grade7">Grade 7</SelectItem>
                        <SelectItem value="Grade8">Grade 8</SelectItem>
                        <SelectItem value="Grade9">Grade 9</SelectItem>
                        <SelectItem value="Grade10">Grade 10</SelectItem>
                        <SelectItem value="Grade11">Grade 11</SelectItem>
                        <SelectItem value="Grade12">Grade 12</SelectItem>
                      </SelectGroup>
                    </ScrollArea>
                  </SelectContent>
                </Select>
              )}
            />

            {errors.grade && (
              <small className="text-red-600">{errors.grade.message}</small>
            )}
          </div>
          <div className="flex flex-col border md:ml-8  justify-between px-3  py-2  rounded-md gap-1">
            <p className="font-bold text-[14px] mb-1">Select Subject</p>
            <MultipleSubject
              selectedSubject={selectedSubject}
              handleSelectedSubject={handleSelectSubject}
            />
            {errors.subject && (
              <small className="text-red-600">{errors.subject.message}</small>
            )}
          </div>

          <div className="flex flex-col border md:ml-8  justify-between px-3  py-2  rounded-md gap-1">
            <p className="font-bold text-[14px] mb-1">Select Curriculum</p>

            <Controller
              control={control}
              name="curriculum"
              render={({ field }) => (
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    clearErrors("curriculum");
                  }}
                >
                  <SelectTrigger className=" w-full py-6">
                    <SelectValue placeholder="Curriculum" />
                  </SelectTrigger>

                  <SelectContent className=" font-subtext font-medium">
                    <ScrollArea className="h-[200px] w-full ">
                      <SelectGroup>
                        {Curriculum.map((item, index) => (
                          <SelectItem key={index} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </ScrollArea>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.subject && (
              <small className="text-red-600">{errors.subject.message}</small>
            )}
          </div>

          <div className="border md:ml-8  justify-between px-3 flex flex-col py-2  rounded-md ">
            <p className="font-bold text-[14px] mb-1">Special Needs</p>

            <textarea
              {...register("specialNeeds")}
              onChange={() => clearErrors("specialNeeds")}
              rows={6}
              cols={5}
              className="py-3 px-6 text-black rounded-md border text-[13px] w-full "
              placeholder="Dyscalculia, Down syndrome, Autistic disorder, Cerebral plalsy etc."
            />
            {errors.specialNeeds && (
              <small className="text-red-600">
                {errors.specialNeeds.message}
              </small>
            )}
          </div>

          <div className="border md:ml-8  justify-between px-3 flex flex-col py-2  rounded-md ">
            <p className="font-bold text-[14px] mb-1">Learning Goals</p>

            <textarea
              {...register("goals")}
              onChange={() => clearErrors("goals")}
              rows={6}
              cols={5}
              className="py-3 px-6 text-black rounded-md border text-[13px] w-full "
              placeholder="I want my child to improve in his/her grade(s)."
            />
            {errors.goals && (
              <small className="text-red-600">{errors.goals.message}</small>
            )}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default ChildDetails;
