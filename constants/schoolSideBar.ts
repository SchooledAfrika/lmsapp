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

export const SchoolSideBar: SchoolSideBarType[] = [
  { path: "", name: "Overview", icon: MdInsertChartOutlined },
  { path: "classroom", name: "Classroom", icon: SiGoogleclassroom },
  { path: "teachers", name: "Teacher", icon: LiaChalkboardTeacherSolid },
  { path: "students", name: "Student", icon: LiaGraduationCapSolid },
  { path: "calender", name: "Calender", icon: MdOutlineCalendarMonth },
  { path: "job-listing", name: "Job Listing", icon: GrGroup },
  { path: "settings", name: "Settings", icon: MdOutlineDisplaySettings },
];
