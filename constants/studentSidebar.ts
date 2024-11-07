import { IconType } from "react-icons";
import {
  MdInsertChartOutlined,
  MdOutlineCalendarMonth,
  MdOutlineDisplaySettings,
} from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { GoChecklist } from "react-icons/go";
import {
  LiaChalkboardTeacherSolid,
  LiaGraduationCapSolid,
  LiaClipboardListSolid,
  LiaMoneyCheckAltSolid,
} from "react-icons/lia";
import { PiCirclesFour } from "react-icons/pi";
import { FaUserGraduate } from "react-icons/fa";

export interface StudentSideBarType {
  path: string;
  icon?: IconType;
  name: string;
}

export const StudentSideBar: StudentSideBarType[] = [
  { path: "", name: "Overview", icon: MdInsertChartOutlined },
  { path: "classroom", name: "Classroom", icon: SiGoogleclassroom },
  { path: "sessions", name: "Sessions", icon: GoChecklist },
  {
    path: "test-and-resources",
    name: "test & Resources",
    icon: LiaClipboardListSolid,
  },
  { path: "courses", name: "Courses", icon: PiCirclesFour },
  { path: "calender", name: "Calender", icon: MdOutlineCalendarMonth },
  { path: "transactions", name: "Transactions", icon: LiaMoneyCheckAltSolid },
  {
    path: "student-settings",
    name: "Settings",
    icon: MdOutlineDisplaySettings,
  },
];
