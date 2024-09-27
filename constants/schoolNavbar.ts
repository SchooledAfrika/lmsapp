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
    description: "Your classroom in one click.",
    path: "overview",
  },
  {
    title: "Classroom",
    description: "Organize your classes easily with one click.",
    path: "classroom",
    subDetails: {
      title: " Single class here",
      description: " this is for single class path",
    },
  },
  {
    title: "Students",
    description: "Manage your students and their activities more easily.",
    path: "students",
    subDetails: {
      title: " Single student here",
      description: " this is for single student path",
    },
  },
  {
    title: "1 on 1 Sections",
    description: "An Overview of all the sections you have for easy access and management",
    path: "one-on-one-section",
    subDetails: {
      title: " Single 1-on-1 section details",
      description: " this is for single 1-on-1 section path",
    },
  },
  {
    title: "Calendar",
    description: "Keep a tab on your classes",
    path: "calender",
  },
  {
    title: "Test & Resources",
    description: "Create tests and assessments in less than 5 minute.",
    path: "test-and-resources",
  },
  {
    title: "Settings",
    description: "Edit your settings, set it all up.",
    path: "setting",
  },
  {
    title: "Courses",
    description: "Skill up with our courses.",
    path: "courses",
  },
  {
    title: "Open Offers",
    description: "Keep track of your open job offers.",
    path: "open-offers",
  },
  {
    title: "Finances",
    description: "Monitor your earnings according to your performance",
    path: "finance",
  },
];
export const StudentNavbar: SchoolNavType[] = [
  {
    title: "Welcome to Your Dashboard",
    description: "All you need for a better digital learning. You are one click away from your academic success dream.",
    path: "overview",
  },
  {
    title: "Classroom",
    description: "Overview of all your classes.",
    path: "classroom",
    subDetails: {
      title: " Single class here",
      description: " this is for single class path",
    },
  },
  {
    title: "Teachers",
    description: "Know your teachers and review their data",
    path: "teachers",
    subDetails: {
      title: " Single teacher here",
      description: " this is for single teacher path",
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
    description: "Get into class you're enrolled in.",
    path: "one-on-one-section",
    subDetails: {
      title: " Single 1-on-1 section details",
      description: " this is for single 1-on-1 section path",
    },
  },
  {
    title: "Calendar",
    description: "Know your schedule.",
    path: "calender",
  },
  {
    title: "Test & Resources",
    description: "Your Test and Worksheet.",
    path: "test-and-resources",
  },
  {
    title: "Settings",
    description: "Edit your settings",
    path: "setting",
  },
  {
    title: "Courses",
    description: "Take a video lesson Now!.",
    path: "courses",
  },
  {
    title: "Transactions",
    description: "Your financial record.",
    path: "transactions",
  },
];
export const ParentsNavbar: SchoolNavType[] = [
  {
    title: "Welcome to Your Dashboard",
    description: "Let's discover and shape the next generation of lifelong learners together in our digital world.",
    path: "overview",
  },
  {
    title: "Sessions",
    description: "See the classes your ward is enrolled in",
    path: "sessions",
    subDetails: {
      title: " Single class here",
      description: " this is for single class path",
    },
  },
  {
    title: "Teachers",
    description: "Hire the right Teacher for your kid.",
    path: "teachers",
    subDetails: {
      title: " Single teacher here",
      description: " this is for single teacher path",
    },
  },
  {
    title: "Assessments",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing eli",
    path: "assessment",
    subDetails: {
      title: " Single student here",
      description: " this is for single student path",
    },
  },

  {
    title: "Calendar",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing eli",
    path: "calender",
  },
  {
    title: "Courses",
    description: "free videos + knowledge equals SMART STUDENTS.",
    path: "courses",
  },
  {
    title: "Transactions",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing eli",
    path: "transactions",
  },
];

export const AdminNavbar: SchoolNavType[] = [
  {
    title: "Welcome to the Admin Dashboard",
    description: "Begin to manage SchooledAfrika.",
    path: "overview",
  },
  {
    title: "Courses",
    description: "",
    path: "courses",
    subDetails: {
      title: "",
      description: "",
    },
  },
 
  {
    title: "Teachers",
    description: "",
    path: "teachers",
    subDetails: {
      title: "",
      description: "",
    },
  },
  {
    title: "Payments",
    description: "",
    path: "payments",
  },
  {
    title: "Students",
    description: "",
    path: "students",
  },
  {
    title: "Parents",
    description: "",
    path: "parents",
  },
  {
    title: "Sessions",
    description: "",
    path: "sessions",
  },
  {
    title: "Admin Profile",
    description: "",
    path: "admin-profile",
  },
  {
    title: "Admin Settings",
    description: "",
    path: "setting",
  },
 
];
