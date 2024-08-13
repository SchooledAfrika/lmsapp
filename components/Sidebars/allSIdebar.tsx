import Link from "next/link";
import { CommonDashboardContext } from "@/providers/Statecontext";
import { AdminDashboardContext } from "@/providers/Admincontext";
import { useContext } from "react";
import {
  AdminSideBar,
  AdminSideBarType,
  SchoolSideBar,
  SchoolSideBarType,
} from "@/constants/schoolSideBar";
import { TeacherSideBar } from "@/constants/teacherSidebar";
import { StudentSideBar } from "@/constants/studentSidebar";
import { ParentSideBar } from "@/constants/parentsSideBar";

interface Isidebar {
  findpath: string;
}
export const SchoolSideBarComponent = ({ findpath }: Isidebar) => {
  const { showSideBar, setShowSideBar } = useContext(CommonDashboardContext);
  return (
    <div className=" w-full flex flex-col space-y-2">
      {SchoolSideBar.map((item: SchoolSideBarType, index) => (
        <Link
          onClick={() => {
            setShowSideBar(false);
          }}
          href={`/school-dashboard/${item.path}`}
          className={` w-full p-2 cursor-pointer flex items-center space-x-2 ${
            findpath === item.path && "bg-green-800 text-white"
          } rounded-md ease-in-out transform duration-200 ${
            findpath !== item.path && "hover:text-green-700"
          }`}
          key={index}
        >
          <div className=" text-[20px]">{item.icon && <item.icon />}</div>
          <p className=" text-[16px]">{item.name}</p>
        </Link>
      ))}
    </div>
  );
};

export const TeacherSideBarComponent = ({ findpath }: Isidebar) => {
  const { showSideBar, setShowSideBar } = useContext(CommonDashboardContext);
  return (
    <div className=" w-full flex flex-col space-y-2">
      {TeacherSideBar.map((item: SchoolSideBarType, index) => (
        <Link
          onClick={() => {
            setShowSideBar(false);
          }}
          href={`/teacher-dashboard/${item.path}`}
          className={` w-full p-2 cursor-pointer flex items-center space-x-2 ${
            findpath === item.path && "bg-green-800 text-white"
          } rounded-md ease-in-out transform duration-200 ${
            findpath !== item.path && "hover:text-green-700"
          }`}
          key={index}
        >
          <div className=" text-[20px]">{item.icon && <item.icon />}</div>
          <p className=" text-[14px]">{item.name}</p>
        </Link>
      ))}
    </div>
  );
};
export const StudentSideBarComponent = ({ findpath }: Isidebar) => {
  const { showSideBar, setShowSideBar } = useContext(CommonDashboardContext);
  return (
    <div className=" w-full flex flex-col space-y-2">
      {StudentSideBar.map((item: SchoolSideBarType, index) => (
        <Link
          onClick={() => {
            setShowSideBar(false);
          }}
          href={`/student-dashboard/${item.path}`}
          className={` w-full p-2 cursor-pointer flex items-center space-x-2 ${
            findpath === item.path && "bg-green-800 text-white"
          } rounded-md ease-in-out transform duration-200 ${
            findpath !== item.path && "hover:text-green-700"
          }`}
          key={index}
        >
          <div className=" text-[20px]">{item.icon && <item.icon />}</div>
          <p className=" text-[14px]">{item.name}</p>
        </Link>
      ))}
    </div>
  );
};
// work on the parents side bar
export const ParentSideBarComponent = ({ findpath }: Isidebar) => {
  const { showSideBar, setShowSideBar } = useContext(CommonDashboardContext);
  return (
    <div className=" w-full flex flex-col space-y-2">
      {ParentSideBar.map((item: SchoolSideBarType, index) => (
        <Link
          onClick={() => {
            setShowSideBar(false);
          }}
          href={`/parents-dashboard/${item.path}`}
          className={` w-full p-2 cursor-pointer flex items-center space-x-2 ${
            findpath === item.path && "bg-green-800 text-white"
          } rounded-md ease-in-out transform duration-200 ${
            findpath !== item.path && "hover:text-green-700"
          }`}
          key={index}
        >
          <div className=" text-[20px]">{item.icon && <item.icon />}</div>
          <p className=" text-[14px]">{item.name}</p>
        </Link>
      ))}
    </div>
  );
};

export const AdminSideBarComponent = ({ findpath }: Isidebar) => {
  const { showSideBar, setShowSideBar } = useContext(AdminDashboardContext);
  return (
    <div className="w-full flex flex-col space-y-2">
      {AdminSideBar.map((item: AdminSideBarType, index) => (
        <Link
          onClick={() => {
            setShowSideBar(false);
          }}
          href={`/admin-dashboard/${item.path}`}
          className={`w-full p-2 cursor-pointer flex items-center space-x-2 ${
            findpath === item.path && "bg-green-800 text-white"
          } rounded-md ease-in-out transform duration-200 ${
            findpath !== item.path && "hover:text-green-700"
          }`}
          key={index}
        >
          <div className="text-[20px]">{item.icon && <item.icon />}</div>
          <p className="text-[16px]">{item.name}</p>
        </Link>
      ))}
    </div>
  );
};
