import StudentAcct from "@/images/student-acct.png";
import TeacherAcct from "@/images/teacher-acct.png";
import SchoolAcct from "@/images/school-acct.png";
import ParentAcct from "@/images/parent-acct.png";
import Tick from "@/images/svgs/tick.svg";
import ColoredTick from "@/images/svgs/colored-tick.svg";

export const RegisterType = [
  {
    Images: StudentAcct,
    title: "Student Account",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis",
    tickIcon: Tick,
    coloredTick: ColoredTick,
  },
  {
    Images: TeacherAcct,
    title: "Teacher Account",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis",
    tickIcon: Tick,
    coloredTick: ColoredTick,
  },
  {
    Images: SchoolAcct,
    title: "School Account",
    description: "Create your",
    link: "/login",
    linkText: "School Account",
    descriptionEnd:
      "with Schooled Afrika and have total control over the activities in your school.",
    tickIcon: Tick,
    coloredTick: ColoredTick,
  },
  {
    Images: ParentAcct,
    title: "Parent Account",
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis",
    tickIcon: Tick,
    coloredTick: ColoredTick,
  },
];
