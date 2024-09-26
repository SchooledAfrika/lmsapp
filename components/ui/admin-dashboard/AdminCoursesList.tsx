"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import UpdateStudentStatus from "./students/UpdateStudentStatus";

interface Course {
  id: string;
  subject: string;
  grade: string;
  duration: string;
}

interface DetailStudent {
  studentData: {
    id: string;
    status: string;
    classes: Course[];
  };
}

const AdminCoursesList: React.FC<DetailStudent> = ({ studentData }) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold text-[25px]">Enrolled Courses</p>
          <span>Here are the courses the student registered</span>
        </div>
        <UpdateStudentStatus studentId={studentData.id} />
      </div>
      <p className="mt-5 bg-gray-200 text-[14px] p-2 rounded">Basics</p>

      <Table className="bg-white overflow-x-auto rounded-md my-6">
        <TableHeader>
          <TableRow className="text-[13px]">
            <TableHead>#</TableHead>
            <TableHead>Courses List</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {studentData.classes.map((course, index) => (
            <TableRow key={course.id}>
              <TableCell className="font-bold text-[15px]">
                <Link href={`/admin-dashboard/courses/${course.id}`}>
                  {index + 1}
                </Link>
              </TableCell>
              <TableCell className="text-[12px] font-semibold">
                {course.subject}
              </TableCell>

              <TableCell className="text-[12px] cursor-pointer font-semibold">
                {course.grade}
              </TableCell>
              <TableCell className="text-[12px] cursor-pointer font-semibold">
                {course.duration}
              </TableCell>
              <TableCell
                className={`${
                  studentData.status === "Active"
                    ? "text-green-500"
                    : "text-red-500"
                }
                   
                } text-[12px] font-semibold`}
              >
                {studentData.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminCoursesList;
