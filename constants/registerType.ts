export enum registerType {
  Student = "Student",
  Teacher = "Teacher",
  School = "School",
  Parents = "Parents",
}
// types for the register
interface Iregister {
  Images: string;
  title: string;
  role: registerType;
  description: string;
  tickIcon: string;
  coloredTick: string;
  link?: string;
  linkText?: string;
  descriptionEnd?: string;
}

export const RegisterType: Iregister[] = [
  {
    Images: "/student-acct.png",
    title: "Student Account",
    role: registerType.Student,
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis",
    tickIcon: "/svgs/tick.svg",
    coloredTick: "/svgs/colored-tick.svg",
  },
  {
    Images: "/teacher-acct.png",
    title: "Teacher Account",
    role: registerType.Teacher,
    description: "Create your",
    link: "/teacher-account",
    linkText: "Teacher Account",
    descriptionEnd:
      "with Schooled Afrika, Teach how you want, when you want and get paid.",
    tickIcon: "/svgs/tick.svg",
    coloredTick: "/svgs/colored-tick.svg",
  },
  {
    Images: "/school-acct.png",
    title: "School Account",
    role: registerType.School,
    description: "Create your",
    link: "/login",
    linkText: "School Account",
    descriptionEnd:
      "with Schooled Afrika and have total control over the activities in your school.",
    tickIcon: "/svgs/tick.svg",
    coloredTick: "/svgs/colored-tick.svg",
  },
  {
    Images: "/parent-acct.png",
    title: "Parent Account",
    role: registerType.Parents,
    description:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis",
    tickIcon: "/svgs/tick.svg",
    coloredTick: "/svgs/colored-tick.svg",
  },
];
