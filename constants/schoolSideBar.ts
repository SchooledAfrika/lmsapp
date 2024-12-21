import { SiGoogleclassroom } from "react-icons/si";
import {
  MdInsertChartOutlined,
  MdOutlineCalendarMonth,
  MdOutlineSettings,
  MdOutlineDisplaySettings,
} from "react-icons/md";
import { RiParentLine, RiAdminLine, RiSecurePaymentLine } from "react-icons/ri";
import {
  LiaChalkboardTeacherSolid,
  LiaGraduationCapSolid,
} from "react-icons/lia";
import { IoRadioOutline } from "react-icons/io5";
import { LuClipboardPaste } from "react-icons/lu";
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
  { path: "teachers", name: "Teachers", icon: LiaChalkboardTeacherSolid },
  { path: "payments", name: "Payments", icon: RiSecurePaymentLine },
  { path: "students", name: "Students", icon: LiaGraduationCapSolid },
  { path: "parents", name: "Parents", icon: RiParentLine },
  { path: "sessions", name: "Sessions", icon: IoRadioOutline },
  { path: "job-listing", name: "Job Listing", icon: GrGroup },
  { path: "admin-profile", name: "Admin Profile", icon: RiAdminLine },
  {
    path: "admin-setting",
    name: "Admin Settings",
    icon: MdOutlineSettings,
  },
];
