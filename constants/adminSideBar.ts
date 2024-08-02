import { StudentSideBarType } from "./studentSidebar";
import { MdInsertChartOutlined, MdOutlineCalendarMonth } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import {
  LiaChalkboardTeacherSolid,
  LiaClipboardListSolid,
} from "react-icons/lia";
import { PiCirclesFour } from "react-icons/pi";

export const AdminSideBar: StudentSideBarType[] = [
  { path: "", name: "Dashboard", icon: MdInsertChartOutlined },
  { path: "courses", name: "Courses", icon: SiGoogleclassroom },
  { path: "instructors", name: "Instructors", icon: LiaChalkboardTeacherSolid },
  {
    path: "admin-profile",
    name: "Admin Profile",
    icon: LiaClipboardListSolid,
  },
  { path: "messages", name: "Messages", icon: PiCirclesFour },
  { path: "settings", name: "Settings", icon: MdOutlineCalendarMonth },
];
