import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RiErrorWarningFill } from "react-icons/ri";
import Link from "next/link";
import React, { useState } from "react";
import { IteacherClass } from "./Tables";
import { IoCaretDownSharp } from "react-icons/io5";
import { BiSolidUpArrow } from "react-icons/bi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IoIosCheckmark } from "react-icons/io";
import { toast } from "react-toastify";

export interface IgetTeachers {
  name: string;
  id: string;
}
export interface Iteacher {
  teacher: IgetTeachers;
}

// component holding the select teacher
const SelectTeacher: React.FC<{
  onlyTeachers: IgetTeachers[];
  schoolClassTeacher: IteacherClass[];
  setSeletecTeachers: React.Dispatch<React.SetStateAction<string[]>>;
  selectedTeachers: string[];
}> = ({
  onlyTeachers,
  schoolClassTeacher,
  selectedTeachers,
  setSeletecTeachers,
}) => {
  const [showUp, setshowUp] = useState<boolean>(false);
  // the function that handles adding or removing the selectedTeacher
  const handleSelected = (teacherId: string) => {
    const previousTeacher = [...selectedTeachers];
    // check if teacher already exist
    const checkIfIdExist = previousTeacher.find((item) => item === teacherId);
    // logic to remove the teacher if it already exist here
    if (checkIfIdExist) {
      // first, lets not push an existing teacher to the array collecting the teacher if a user clicks on it
      // this will help us collect teachers that that does not exist before
      const allreadexist = schoolClassTeacher.find(
        (schteacher) => schteacher.id === teacherId
      );
      if (allreadexist) return;
      const existIndex = previousTeacher.indexOf(teacherId);
      previousTeacher.splice(existIndex, 1);
      return setSeletecTeachers(previousTeacher);
    } else {
      previousTeacher.push(teacherId);
      return setSeletecTeachers(previousTeacher);
    }
  };

  return (
    <div className=" w-full p-3 rounded-md border flex flex-col">
      <div
        onClick={(e) => {
          e.stopPropagation();
          setshowUp((value) => !value);
        }}
        className=" flex items-center justify-between w-full cursor-pointer"
      >
        <p className=" text-[14px]">Teachers</p>
        {showUp ? (
          <BiSolidUpArrow className=" text-green-700" />
        ) : (
          <IoCaretDownSharp className=" text-green-700 text-[20px]" />
        )}
      </div>
      {showUp && (
        <div className=" mt-4">
          {onlyTeachers.length === 0 ? (
            <div>
              <p>you have not active teacher</p>
            </div>
          ) : (
            <div className=" flex w-full flex-col gap-2">
              {onlyTeachers.map((teacher, index) => (
                <div
                  onClick={() => handleSelected(teacher.id)}
                  className=" flex gap-3 border px-4 py-3 rounded-sm cursor-pointer"
                  key={index}
                >
                  <div
                    className={` ${
                      selectedTeachers.includes(teacher.id) ||
                      schoolClassTeacher.find(
                        (regTeacher) => regTeacher.id === teacher.id
                      )
                        ? " bg-green-800"
                        : "bg-slate-500"
                    } rounded-sm w-[20px] aspect-square flex items-center justify-center text-[12px]  text-white`}
                  >
                    {selectedTeachers.includes(teacher.id) && (
                      <IoIosCheckmark />
                    )}
                    {schoolClassTeacher.find(
                      (regTeacher) => regTeacher.id === teacher.id
                    ) && <IoIosCheckmark />}
                  </div>
                  <p className=" text-[14px] font-semibold">{teacher.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export const AssignDialog: React.FC<{
  setShowdialog: React.Dispatch<React.SetStateAction<boolean>>;
  subject: string;
  SchoolClassTeacher: IgetTeachers[];
  id: string;
  showDialog: boolean;
  onlyTeachers: IgetTeachers[];
  classId: string;
}> = ({
  subject,
  showDialog,
  setShowdialog,
  onlyTeachers,
  SchoolClassTeacher,
  classId,
}) => {
  const [selectedTeachers, setSeletecTeachers] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const query = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["add-teacher-to-class"],
    mutationFn: async () => {
      const response = await fetch("/api/class-teacher", {
        method: "POST",
        body: JSON.stringify({
          teacherIds: selectedTeachers,
          schoolClassId: classId,
        }),
      });
      return response;
    },
    onSuccess: async (response) => {
      const body = await response.json();
      if (response.ok) {
        query.invalidateQueries({ queryKey: ["addSchool"] });
        setSeletecTeachers([]);
        setSubmitting(false);
        toast.success(body.message);
        setShowdialog(false);
      } else {
        toast.error(body.message);
      }
    },
  });
  // here we handle the assinging teacher to class
  const handleAssign = () => {
    if (selectedTeachers.length === 0) {
      return toast.error("Please select at least one teacher");
    }
    setSubmitting(true);
    mutation.mutate();
  };
  return (
    <Dialog open={showDialog} onOpenChange={() => setShowdialog(false)}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border font-bold px-3 text-[12px] rounded-lg border-lightGreen hover:text-lightGreen"
        >
          Assign
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] w-[380px] font-subtext">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            Assign Teacher
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 font-header py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="name"
              type="text"
              value={subject}
              className="col-span-6 font-semibold w-full"
            />
          </div>
          <div className="w-full">
            <SelectTeacher
              schoolClassTeacher={SchoolClassTeacher}
              onlyTeachers={onlyTeachers}
              setSeletecTeachers={setSeletecTeachers}
              selectedTeachers={selectedTeachers}
            />
          </div>
          <div className="flex flex-col border p-6 rounded-md">
            <p className="font-semibold inline text-[14px]">
              {" "}
              <RiErrorWarningFill className="inline  text-lightGreen text-lg mr-2" />
              Can&apos;t Find Teacher Here?
            </p>
            <p className="text-[14px] mt-3">
              Go to{" "}
              <Link href="/find-tutors" className="text-red-500">
                Teachers Tab
              </Link>{" "}
              to invite them to your school
            </p>
          </div>
        </div>
        <DialogFooter className="">
          <Button
            onClick={handleAssign}
            type="submit"
            disabled={submitting}
            className="w-full py-8 text-lg bg-lightGreen hover:bg-green-700"
          >
            {submitting ? "Assigning teacher..." : "Assign teacher"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
