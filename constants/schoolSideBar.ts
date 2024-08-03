import { SiGoogleclassroom } from "react-icons/si";
import {
  MdInsertChartOutlined,
  MdOutlineCalendarMonth,
  MdOutlineDisplaySettings,
} from "react-icons/md";
import {
  LiaChalkboardTeacherSolid,
  LiaGraduationCapSolid,
} from "react-icons/lia";
import { GrGroup } from "react-icons/gr";
import { IconType } from "react-icons";

export interface SchoolSideBarType {
  path: string;
  icon?: IconType;
  name: string;
}

export interface AdminSideBarType {
  path: string;
  icon?: IconType;
  name: string;
}

export const SchoolSideBar: SchoolSideBarType[] = [
  { path: "", name: "Overview", icon: MdInsertChartOutlined },
  { path: "classroom", name: "Classroom", icon: SiGoogleclassroom },
  { path: "teachers", name: "Teacher", icon: LiaChalkboardTeacherSolid },
  { path: "students", name: "Student", icon: LiaGraduationCapSolid },
  { path: "calender", name: "Calender", icon: MdOutlineCalendarMonth },
  { path: "job-listing", name: "Job Listing", icon: GrGroup },
  { path: "settings", name: "Settings", icon: MdOutlineDisplaySettings },
];

export const AdminSideBar: AdminSideBarType[] = [
  { path: "", name: "Dashboard", icon: MdInsertChartOutlined },
  { path: "courses", name: "Courses", icon: SiGoogleclassroom },
  { path: "instructors", name: "Instructors", icon: LiaChalkboardTeacherSolid },
  { path: "admin-profile", name: "Admin Profile", icon: LiaGraduationCapSolid },
  {
    path: "admin-setting",
    name: "Admin Settings",
    icon: MdOutlineCalendarMonth,
  },
];
