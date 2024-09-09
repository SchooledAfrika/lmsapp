import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "@/components/ui/input";
import { RiErrorWarningFill } from "react-icons/ri";
import Link from "next/link";
import React, { useState } from "react";
import { IoCaretDownSharp } from "react-icons/io5";
import { BiSolidUpArrow } from "react-icons/bi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IoIosCheckmark } from "react-icons/io";
import { toast } from "react-toastify";
import { IstudentClass } from "./Tables";
import { IActiveStudent } from "./OptionsDialog";
import { IoPersonAddOutline } from "react-icons/io5";

export interface IgetTeachers {
  name: string;
  id: string;
  profilePhoto: string;
}
export interface Iteacher {
  teacher: IgetTeachers;
}

// component holding the select teacher
const SelectTeacher: React.FC<{
  activeStudent: IActiveStudent[];
  schoolClassStudent: IstudentClass[];
  setSelectedStudent: React.Dispatch<React.SetStateAction<string[]>>;
  selectedStudent: string[];
}> = ({
  activeStudent,
  schoolClassStudent,
  selectedStudent,
  setSelectedStudent,
}) => {
  const [showUp, setshowUp] = useState<boolean>(false);
  // the function that handles adding or removing the selectedTeacher
  const handleSelected = (teacherId: string) => {
    // first, lets not push an existing teacher to the array collecting the teacher if a user clicks on it
    // this will help us collect teachers that that does not exist before
    const allreadexist = schoolClassStudent.find(
      (schteacher) => schteacher.id === teacherId
    );
    if (allreadexist) return;
    // spread the former state
    const previousTeacher = [...selectedStudent];
    // check if teacher already exist
    const checkIfIdExist = previousTeacher.find((item) => item === teacherId);
    // logic to remove the teacher if it already exist here
    if (checkIfIdExist) {
      const existIndex = previousTeacher.indexOf(teacherId);
      previousTeacher.splice(existIndex, 1);
      return setSelectedStudent(previousTeacher);
    } else {
      previousTeacher.push(teacherId);
      return setSelectedStudent(previousTeacher);
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
        <p className=" text-[14px]">Students</p>
        {showUp ? (
          <BiSolidUpArrow className=" text-green-700" />
        ) : (
          <IoCaretDownSharp className=" text-green-700 text-[20px]" />
        )}
      </div>
      {showUp && (
        <div className=" mt-4">
          {activeStudent.length === 0 ? (
            <div>
              <p>you have not active student</p>
            </div>
          ) : (
            <div className=" flex w-full flex-col gap-2">
              {activeStudent?.map((student, index) => (
                <div
                  onClick={() => handleSelected(student.student.id)}
                  className={` ${
                    schoolClassStudent?.find(
                      (regStudent) => regStudent.id === student.student.id
                    ) && " bg-slate-200"
                  } flex gap-3 border px-4 py-3 rounded-sm cursor-pointer`}
                  key={index}
                >
                  <div
                    className={` ${
                      selectedStudent?.includes(student.student.id) ||
                      schoolClassStudent?.find(
                        (regStudent) => regStudent.id === student.student.id
                      )
                        ? " bg-green-800"
                        : "bg-slate-500"
                    } rounded-sm w-[20px] aspect-square flex items-center justify-center text-[12px]  text-white`}
                  >
                    {selectedStudent?.includes(student.student.id) && (
                      <IoIosCheckmark />
                    )}
                    {schoolClassStudent?.find(
                      (regStudent) => regStudent.id === student.student.id
                    ) && <IoIosCheckmark />}
                  </div>
                  <p className=" text-[14px] font-semibold">
                    {student.student.name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export const AssignStudent: React.FC<{
  setShowStudent: React.Dispatch<React.SetStateAction<boolean>>;
  subject: string;
  showStudent: boolean;
  classId: string;
  SchoolClassStudent: IstudentClass[];
  activeStudent: IActiveStudent[];
}> = ({
  subject,
  showStudent,
  setShowStudent,
  activeStudent,
  SchoolClassStudent,
  classId,
}) => {
  const [selectedStudent, setSelectedStudent] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const query = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["add-student-to-class"],
    mutationFn: async () => {
      const response = await fetch("/api/class-student", {
        method: "POST",
        body: JSON.stringify({
          studentIds: selectedStudent,
          schoolClassId: classId,
        }),
      });
      return response;
    },
    onSuccess: async (response) => {
      const body = await response.json();
      if (response.ok) {
        query.invalidateQueries({
          queryKey: ["addSchool"],
        });
        setSelectedStudent([]);
        setSubmitting(false);
        toast.success(body.message);
        setShowStudent(false);
      } else {
        toast.error(body.message);
      }
    },
  });
  // here we handle the assinging teacher to class
  const handleAssign = () => {
    if (selectedStudent.length === 0) {
      return toast.error("Please select at least one teacher");
    }
    setSubmitting(true);
    mutation.mutate();
  };
  return (
    <Dialog open={showStudent} onOpenChange={() => setShowStudent(false)}>
      <DialogTrigger asChild>
        <div className=" flex gap-2 items-center">
          <IoPersonAddOutline className=" text-green-700" />
          <p className=" text-[14px] font-semibold">Assign Student</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:w-[500px] w-[380px] font-subtext">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            Assign Student
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
              schoolClassStudent={SchoolClassStudent}
              activeStudent={activeStudent}
              setSelectedStudent={setSelectedStudent}
              selectedStudent={selectedStudent}
            />
          </div>
          <div className="flex flex-col border p-6 rounded-md">
            <p className="font-semibold inline text-[14px]">
              {" "}
              <RiErrorWarningFill className="inline  text-lightGreen text-lg mr-2" />
              Can&apos;t Find Student Here?
            </p>
            <p className="text-[14px] mt-3">
              Go to{" "}
              <Link href="/school-dashboard/students" className="text-red-500">
                Students Tab
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
