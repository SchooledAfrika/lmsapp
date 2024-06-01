import Image from "next/image";
import React from "react";
import Link from "next/link";

const ViewPerformance = () => {
  const performanceData = [
    {
      name: "Alex Iwobi Samuel",
      status: "Active",
      role: "Student",
      score: "82%",
    },
    {
      name: "Jane Doe",
      status: "Active",
      role: "Student",
      score: "75%",
    },
  ];

  return (
    <div>
      {performanceData.map((student, index) => (
        <div key={index}>
          <div className="block md:flex justify-between items-center p-4">
            <div className="flex gap-2 md:mb-0 mb-3">
              <Image
                src="/applicantImg.png"
                width={60}
                height={60}
                alt="Profile Image"
              />
              <div className="flex flex-col">
                <span className="text-[14px] font-bold">{student.name}</span>
                <div className="flex gap-3 mt-2">
                  <span className="text-[10px] bg-[#359C714D] px-3 font-bold py-1 rounded-[5px] text-[#359C71]">
                    {student.status}
                  </span>
                  <p className="text-[10px] font-bold px-2 text-[#FF6634] py-1 rounded-[5px] bg-[#FF66344D]">
                    {student.role}
                  </p>
                </div>
              </div>
            </div>
            <div className="font-bold hidden md:block">{student.score}</div>
            <Link
              href="/teacher-dashboard/test-and-resources/grade"
              className="underline text-[#359C71] rounded-[5px] bg-transparent hover:bg-green-200 p-2 text-[14px] font-bold"
            >
              View Performance
            </Link>
          </div>
          {index < performanceData.length - 1 && <hr />}
        </div>
      ))}
    </div>
  );
};

export default ViewPerformance;
