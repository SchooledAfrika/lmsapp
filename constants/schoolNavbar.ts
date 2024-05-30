export interface Subtype {
  title: string;
  description: string;
}

export interface SchoolNavType {
  title: string;
  description: string;
  path: string;
  subDetails?: Subtype;
}

export const SchoolNavbar: SchoolNavType[] = [
  {
    title: "Welcome to Your School Dashboard",
    description: "Manage your school at a go! Just a click!",
    path: "overview",
  },
  {
    title: "Classroom",
    description: "Get your classroom ready",
    path: "classroom",
    subDetails: {
      title: " Single class here",
      description: " this is for single class path",
    },
  },
  {
    title: "Teachers",
    description: "Organize your teachers and review their data",
    path: "teachers",
    subDetails: {
      title: " Single teacher here",
      description: " this is for single teacher path",
    },
  },
  {
    title: "Students",
    description: "Organize your students and review their data",
    path: "students",
    subDetails: {
      title: " Single student here",
      description: " this is for single student path",
    },
  },
  {
    title: "Calendar",
    description: "View schedules of your teachers and students",
    path: "calender",
  },
  {
    title: "Job Listing",
    description: "View, update and delete jobs here.",
    path: "job-listing",
  },
  {
    title: "Settings",
    description: "Edit your settings here",
    path: "settings",
  },
];
export const TeacherNavbar: SchoolNavType[] = [
  {
    title: "Welcome to Your Dashboard",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing eli",
    path: "overview",
  },
  {
    title: "Classroom",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing eli",
    path: "classroom",
    subDetails: {
      title: " Single class here",
      description: " this is for single class path",
    },
  },
  {
    title: "Students",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing eli",
    path: "students",
    subDetails: {
      title: " Single student here",
      description: " this is for single student path",
    },
  },
  {
    title: "1 on 1 Sections",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing eli",
    path: "one-on-one-section",
    subDetails: {
      title: " Single 1-on-1 section details",
      description: " this is for single 1-on-1 section path",
    },
  },
  {
    title: "Calendar",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing eli",
    path: "calender",
  },
  {
    title: "Test & Resources",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing eli",
    path: "test-and-resources",
  },
  {
    title: "Settings",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing eli",
    path: "setting",
  },
  {
    title: "Courses",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing eli",
    path: "courses",
  },
  {
    title: "Finances",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing eli",
    path: "finance",
  },
];
