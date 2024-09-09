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
      "Create your ",
      link: "/student-account",
      linkText: "Student Account ",
      descriptionEnd:
      "with Schooled Afrika and access all you need for a better digital learning. ",
    tickIcon: "/svgs/tick.svg",
    coloredTick: "/svgs/colored-tick.svg",
  },
  {
    Images: "/teach.png",
    title: "Teacher Account",
    role: registerType.Teacher,
    description: "Create your ",
    link: "/teacher-account",
    linkText: "Teacher Account ",
    descriptionEnd:
      "with Schooled Afrika, Teach how you want, when you want and get paid.",
    tickIcon: "/svgs/tick.svg",
    coloredTick: "/svgs/colored-tick.svg",
  },
  {
    Images: "/school-acct.png",
    title: "School Account",
    role: registerType.School,
    description: "Create your ",
    link: "/school-account",
    linkText: "School Account ",
    descriptionEnd:
      "with Schooled Afrika and have total control over the activities in your school.",
    tickIcon: "/svgs/tick.svg",
    coloredTick: "/svgs/colored-tick.svg",
  },
  {
    Images: "/parent-acct.png",
    title: "Parent Account ",
    role: registerType.Parents,
    description: "Create your ",
    link: "/parent-account",
    linkText: "Parent Account ",
    descriptionEnd:
      "with Schooled Afrika. Join us as we shape the next generation of lifelong learners.",
    tickIcon: "/svgs/tick.svg",
    coloredTick: "/svgs/colored-tick.svg",
  },
];
