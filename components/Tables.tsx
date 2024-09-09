"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { TableSkeleton } from "@/components/TableSkeleton";
import { AssignDialog } from "./AssignDialog";
import OptionsDialog from "./OptionsDialog";
import { IgetTeachers, Iteacher } from "./AssignDialog";
import { useConversion } from "@/data-access/conversion";
import { LoadingTable, NoItem } from "./TeachersTable";

export interface IteacherClass {
  name: string;
  id: string;
  profilePhoto?: string;
}

export interface IstudentClass {
  name: string;
  id: string;
}
export interface IStudent {
  student: IstudentClass;
}
interface Iclass {
  id: string;
  grade: string;
  name: string;
  subject: string;
  time: string;
  createdAt: string;
  SchoolClassStudent: IStudent[];
  SchoolClassTeacher: Iteacher[];
}

// each row component here
const Eachclass: React.FC<{ item: Iclass; onlyTeachers: IgetTeachers[] }> = ({
  item,
  onlyTeachers,
}) => {
  const [showDialog, setShowdialog] = useState<boolean>(false);
  const [showStudent, setShowStudent] = useState<boolean>(false);
  const { getInitials } = useConversion();
  // here, we flatten the kind of array we are getting which contains the teachers info
  const classTeacher: IgetTeachers[] = item.SchoolClassTeacher.map(
    (teacher: Iteacher) => teacher.teacher
  );
  const previewTeacher = classTeacher.slice(0, 3);

  // here we flatten the array we are getting from the students
  const classStudent: IstudentClass[] = item.SchoolClassStudent.map(
    (student: IStudent) => student.student
  );
  return (
    <TableRow key={item.id} className="">
      <TableCell className="text-[12px] font-bold">
        <div className=" flex items-center gap-1">
          <Image
            src={`/${item?.subject.toLowerCase()}.png`}
            alt="icon"
            width={25}
            height={25}
            className="w-[30px] h-[30px] mr-1"
          />
          <p>{item.subject}</p>
        </div>
      </TableCell>
      <TableCell className="text-[12px]  font-semibold">{item.name}</TableCell>
      <TableCell className="text-[12px]   font-semibold">
        {item.grade}
      </TableCell>
      <TableCell className="border-lightGreen   cursor-pointer text-[11px]  font-bold text-lightGreen rounded-xl">
        {classTeacher?.length === 0 ? (
          <div onClick={() => setShowdialog(true)}>
            <AssignDialog
              setShowdialog={setShowdialog}
              subject={item?.subject}
              classId={item?.id}
              SchoolClassTeacher={classTeacher}
              id={item?.id}
              showDialog={showDialog}
              onlyTeachers={onlyTeachers}
              title="Assign"
            />
          </div>
        ) : (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowdialog(true);
            }}
            className=" relative flex w-[100px] h-[40px] "
          >
            {previewTeacher?.map((oneTeacher, index) => (
              <div
                className={`text-black w-[30px] absolute rounded-md h-[30px] transition-all rotate-45 flex items-center justify-center ${
                  index == 0
                    ? "left-0 bg-yellow-500 "
                    : index == 1
                    ? "left-6 bg-orange-500"
                    : "left-9 bg-green-800"
                }`}
                key={index}
              >
                <p>{getInitials(oneTeacher?.name)}</p>
              </div>
            ))}
            <AssignDialog
              setShowdialog={setShowdialog}
              subject={item?.subject}
              classId={item?.id}
              SchoolClassTeacher={classTeacher}
              id={item?.id}
              showDialog={showDialog}
              onlyTeachers={onlyTeachers}
              title=""
            />
          </div>
        )}
      </TableCell>
      <TableCell className="text-[12px]  font-semibold">
        {item.SchoolClassStudent.length}
      </TableCell>
      <TableCell className="  text-[16px] float-right pr-3  text-lightGreen cursor-pointer">
        <OptionsDialog
          setShowStudent={setShowStudent}
          subject={item?.subject}
          SchoolClassStudent={classStudent}
          showStudent={showStudent}
          classId={item.id}
        />
      </TableCell>
    </TableRow>
  );
};

// the main component below here
const Tables = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["addSchool"],
    queryFn: async () => {
      const response = await fetch("/api/class-action");
      const result = await response.json();
      return result;
    },
  });
  const { data: allTeachers, isPending } = useQuery({
    queryKey: ["get-school-teacher-class"],
    queryFn: async () => {
      const response = await fetch("/api/class-teacher");
      const result = await response.json();
      return result;
    },
  });
  //   if is loading or pending
  if (isLoading && isPending) {
    return (
      <div className=" mt-4">
        <LoadingTable />
      </div>
    );
  }

  // if is error
  if (isError) {
    return <div className=" flex-1">{error.message}</div>;
  }

  const onlyTeachers: IgetTeachers[] = allTeachers.map(
    (teacher: Iteacher) => teacher.teacher
  );

  return (
    <div>
      {Array.isArray(data) && (
        <div>
          {data.length === 0 ? (
            <NoItem itemName="Class" />
          ) : (
            <Table className="bg-white overflow-x-auto    rounded-md mt-12">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[12px]">Subject</TableHead>
                  <TableHead className=" text-[12px]">Name</TableHead>
                  <TableHead className="text-[12px]">Grade</TableHead>
                  <TableHead className="text-[12px]">Teacher</TableHead>
                  <TableHead className="text-[12px]">Students</TableHead>
                  {/* <TableHead className="text-[12px]">Students</TableHead> */}
                  <TableHead className="text-right text-[12px]">
                    Options
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(data) &&
                  data?.map((item: Iclass, index) => (
                    <Eachclass
                      item={item}
                      key={index}
                      onlyTeachers={onlyTeachers}
                    />
                  ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}
    </div>
  );
};

export default Tables;
