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
import { IstudentSession } from "@/components/BookSessionByStudent";
import { IoCaretDown } from "react-icons/io5";
import { IoIosCheckmark } from "react-icons/io";
import { toast } from "react-toastify";

export interface ISessionStudentSub {
  register: UseFormRegister<IstudentSession>;
  errors: FieldErrors<IstudentSession>;
  control?: Control<IstudentSession>;
  clearErrors: UseFormClearErrors<IstudentSession>;
  watch: UseFormWatch<IstudentSession>;
  setValue: UseFormSetValue<IstudentSession>;
  getValues: UseFormGetValues<IstudentSession>;
  setmethod?: React.Dispatch<React.SetStateAction<string>>;
  method?: string;
  setTotalAmt?: React.Dispatch<React.SetStateAction<number | undefined>>;
  totalAmt?: number | undefined;
  sessionId?: string;
  tutorName?: string;
  tutorImg?: string;
  tutorLang?: string[];
}

// the available subjects
export const AllSubject = [
  "Mathematics",
  "English Language",
  "Sciences",
  "Yoruba",
  "Igbo",
  "French",
  "Creative Writing",
];
// list of special needs
export const AllNeeds = [
  "Dyscalculia",
  "Down Syndrome",
  "Austitic disorder",
  "Celebral Palsy",
];

// component for selecting multiple subject
export const MultipleSelect: React.FC<{
  selectedItem: string[];
  handleSelectedItem: (subject: string) => void;
  itemList: string[];
  placeholder: string;
}> = ({ selectedItem, handleSelectedItem, itemList, placeholder }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

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
          {selectedItem.length === 0 ? (
            <p>{placeholder}</p>
          ) : (
            <div className=" flex w-full gap-1">
              {selectedItem.map((item, index) => (
                <div
                  className=" px-2 py-1 rounded-md text-[10px] text-white bg-slate-500"
                  key={index}
                >
                  <p>{item}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <IoCaretDown className=" flex-1 text-[20px] text-green-600 " />
      </div>
      {expanded && (
        <div className=" w-full bg-white px-3 py-3 flex flex-col h-[150px] overflow-y-auto gap-1">
          {itemList.map((item, index) => (
            <div
              onClick={() => handleSelectedItem(item)}
              className=" flex items-center gap-1 cursor-pointer"
              key={index}
            >
              <div
                className={` w-[25px] aspect-square rounded-md flex items-center justify-center ${
                  selectedItem.includes(item) ? "bg-green-800" : " bg-slate-500"
                } `}
              >
                {selectedItem.includes(item) && (
                  <IoIosCheckmark className=" text-[14px] text-white" />
                )}
              </div>
              <p className=" text-[16px] font-semibold">{item}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const StudentBookDetails: React.FC<ISessionStudentSub> = ({
  register,
  errors,
  control,
  watch,
  clearErrors,
  setValue,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string[]>([]);
  const [selectedDisability, setselectedDisability] = useState<string[]>([]);
  const Curriculum = ["Nigerian", "Canadian", "American", "British"];
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
      if (aspectSubject.length === 3) {
        return toast.error("maximum of 3 subjects is allowed");
      }
      const modifiedSubject = [...aspectSubject, subject];
      setSelectedSubject(modifiedSubject);
      setValue("subject", modifiedSubject);
    }
  };
  // function to set or remove the disability selected
  const handleSelectdisability = (disability: string) => {
    const aspectDisability = [...selectedDisability];
    // check if the subject already exists
    const isDisabilityExisting = aspectDisability.includes(disability);
    if (isDisabilityExisting) {
      const modifiedSubject = aspectDisability.filter(
        (item) => item !== disability
      );
      setselectedDisability(modifiedSubject);
      setValue("specialNeeds", modifiedSubject);
      clearErrors("specialNeeds");
    } else {
      const modifiedDisability = [...aspectDisability, disability];
      setselectedDisability(modifiedDisability);
      setValue("specialNeeds", modifiedDisability);
    }
  };
  watch("subject");
  watch("specialNeeds");

  return (
    <ScrollArea className="min-h-[500px] w-full ">
      <div className="">
        <div className="flex justify-between">
          <h3 className="text-xl md:ml-6 font-bold">Book Session</h3>
        </div>
        <div className="flex  mx-auto mt-8 mb-6 flex-col gap-3">
          <p className="text-lightGreen text-[15px] md:ml-8 font-semibold">
            Add Details
          </p>
          <p className="text-[14px] md:ml-8 font-semibold">
            Please complete the form with your details.
          </p>
        </div>

        <div className="space-y-4 md:mb-0 mb-8 my-2">
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
            <MultipleSelect
              selectedItem={selectedSubject}
              handleSelectedItem={handleSelectSubject}
              itemList={AllSubject}
              placeholder="Subject"
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

            <MultipleSelect
              selectedItem={selectedDisability}
              handleSelectedItem={handleSelectdisability}
              itemList={AllNeeds}
              placeholder="Special needs"
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
              placeholder="I want to improve in which area"
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

export default StudentBookDetails;
