import { SiGoogleclassroom } from "react-icons/si";
import {
  MdInsertChartOutlined,
  MdOutlineCalendarMonth,
  MdOutlineDisplaySettings,
} from "react-icons/md";
import {
  LiaClipboardListSolid,
  LiaGraduationCapSolid,
  LiaMoneyCheckAltSolid,
} from "react-icons/lia";
import { IoBriefcaseOutline } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";
import { IconType } from "react-icons";
import { GoChecklist } from "react-icons/go";
import { PiCirclesFour } from "react-icons/pi";


export interface TeacherSideBarType {
  path: string;
  icon?: IconType;
  name: string;
}

export const TeacherSideBar: TeacherSideBarType[] = [
  { path: "", name: "Overview", icon: MdInsertChartOutlined },
  { path: "classroom", name: "Classroom", icon: SiGoogleclassroom },
  // { path: "students", name: "Student", icon: LiaGraduationCapSolid },
  { path: "one-on-one-section", name: "1 on 1 Section", icon: GoChecklist },
  {
    path: "test-and-resources",
    name: "test & Resources",
    icon: LiaClipboardListSolid,
  },
  { path: "courses", name: "Courses", icon: PiCirclesFour },
  { path: "open-offers", name: "Open Offers", icon: IoBriefcaseOutline },
  { path: "calender", name: "Calender", icon: MdOutlineCalendarMonth },
  { path: "finance", name: "Finances", icon: LiaMoneyCheckAltSolid },
  { path: "setting", name: "Settings", icon: MdOutlineDisplaySettings },
];
