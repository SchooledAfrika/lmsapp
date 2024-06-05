import { isContext } from "vm";

export const navData = [
  { _id: 101, title: "Find Tutors", href: "/find-tutors" },
  { _id: 102, title: "Classes", href: "/classes" },
  { _id: 103, title: "Apply to Teach", href: "/apply-to-teach" },
  { _id: 104, title: "Vacancies", href: "/vacancies" },
  { _id: 105, title: "Contact Us", href: "/contact" },
];

export const subjects = [
  {
    id: "subject-1",
    icon: "/maths.png",
    title: "Mathematics",
    tutorNum: "143 Tutors",
    duration: "100+ Hours",
    rating: "⭐ 4.8/5",
  },
  {
    id: "subject-2",
    icon: "/english.png",
    title: "English",
    tutorNum: "211 Tutors",
    duration: "160+ Hours",
    rating: "⭐ 4.7/5",
  },
  {
    id: "subject-3",
    icon: "/chem.png",
    title: "Chemistry",
    tutorNum: "73 Tutors",
    duration: "90+ Hours",
    rating: "⭐ 4.3/5",
  },
  {
    id: "subject-4",
    icon: "/fmass.png",
    title: "Further Mathematics",
    tutorNum: "53 Tutors",
    duration: "73+ Hours",
    rating: "⭐ 4.6/5",
  },
  {
    id: "subject-5",
    icon: "/lit.png",
    title: "Literature",
    tutorNum: "81 Tutors",
    duration: "107+ Hours",
    rating: "⭐ 4.8/5",
  },
  {
    id: "subject-6",
    icon: "/agric.png",
    title: "Agriculture",
    tutorNum: "56 Tutors",
    duration: "82+ Hours",
    rating: "⭐ 4.4/5",
  },
  {
    id: "subject-7",
    icon: "/bio.png",
    title: "Biology",
    tutorNum: "114 Tutors",
    duration: "89+ Hours",
    rating: "⭐ 4.5/5",
  },
  {
    id: "subject-8",
    icon: "/account.png",
    title: "Accounting",
    tutorNum: "68 Tutors",
    duration: "79+ Hours",
    rating: "⭐ 4.7/5",
  },
  {
    id: "subject-9",
    icon: "/govt.png",
    title: "Government",
    tutorNum: "143 Tutors",
    duration: "207+ Hours",
    rating: "⭐ 4.9/5",
  },
  {
    id: "subject-10",
    icon: "/crs.png",
    title: "CRS",
    tutorNum: "44 Tutors",
    duration: "62+ Hours",
    rating: "⭐ 4.5/5",
  },
  {
    id: "subject-11",
    icon: "/phy.png",
    title: "Physics",
    tutorNum: "138 Tutors",
    duration: "113+ Hours",
    rating: "⭐ 4.8/5",
  },
  {
    id: "subject-12",
    icon: "/yoruba.png",
    title: "Yoruba",
    tutorNum: "23 Tutors",
    duration: "75+ Hours",
    rating: "⭐ 4.6/5",
  },
];

export const moreSubjects = [
 
  {
    id: "more-1",
    icon: "/igbo.png",
    title: "Igbo",
    tutorNum: "38 Tutors",
    duration: "76+ Hours",
    rating: "⭐ 4.6/5",
  },
  {
    id: "more-2",
    icon: "/hausa.png",
    title: "Hausa",
    tutorNum: "23 Tutors",
    duration: "75+ Hours",
    rating: "⭐ 4.6/5",
  },
];

export const Classes = [
  {
    id: "class-1",
    className: "Alpha",
    classes: "Grade 12",
    tutor: "Adeyemi Samuel",
    rating: "⭐ 4.9/5",
    pricing: "$50.00",
    subject: "Chemistry",
    icon: "/chem.png",
    timing: "Mon, Wed, Fri | 10am - 12pm",
  },
  {
    id: "class-2",
    className: "Daisy",
    classes: "Grade 11",
    tutor: "David Olushola",
    rating: "⭐ 4.6/5",
    pricing: "$45.00",
    subject: "Government",
    icon: "/govt.png",
    timing: "Mon, Wed, Fri | 12pm - 2pm",
  },
  {
    id: "class-3",
    className: "West Point",
    classes: "Grade 10",
    tutor: "Qudus Abdullah",
    rating: "⭐ 4.6/5",
    pricing: "$45.00",
    subject: "Accounting",
    icon: "/account.png",
    timing: "Mon, Wed, Fri | 12pm - 2pm",
  },
  {
    id: "class-4",
    className: "Alpha",
    classes: "Grade 12",
    tutor: "Adeyemi Samuel",
    rating: "⭐ 4.9/5",
    pricing: "$50.00",
    subject: "Chemistry",
    icon: "/chem.png",
    timing: "Mon, Wed, Fri | 10am - 12pm",
  },
  {
    id: "class-5",
    className: "Daisy",
    classes: "Grade 11",
    tutor: "David Olushola",
    rating: "⭐ 4.6/5",
    pricing: "$45.00",
    subject: "Government",
    icon: "/govt.png",
    timing: "Mon, Wed, Fri | 12pm - 2pm",
  },
  {
    id: "class-6",
    className: "West Point",
    classes: "Grade 10",
    tutor: "Qudus Abdullah",
    rating: "⭐ 4.6/5",
    pricing: "$45.00",
    subject: "Accounting",
    icon: "/account.png",
    timing: "Mon, Wed, Fri | 12pm - 2pm",
  },
];


export const Applies = [
  {
    id: "apply-1",
    title: "Students",
    result: "10,000+",
  },
  {
    id: "apply-2",
    title: "Tutors",
    result: "3,000+",
  },
  
  {
    id: "apply-3",
    title: "Subjects",
    result: "200+",
  },
  {
    id: "apply-4",
    title: "Schools",
    result: "800+",
  },
  {
    id: "apply-5",
    title: "Enrollments",
    result: "10,000+",
  },
];

export const feedbacks = [
  {
    id: "feedback-1",
    content:
      "SchooledAfrika's flexible system of learning has made life easier for me. I now have to focus on my work and still be assured that my children are recieving the best of tutulege.",
    rating: "⭐⭐⭐⭐⭐",
    name: "Maurice Odo",
  },
  {
    id: "feedback-2",
    content:
      "SchooledAfrika has made my life a lot easier, their services, especially their great customer service is laudable. I recommend them to any parent and student.",
    rating: "⭐⭐⭐⭐⭐",
    name: "Austine David",
  },
  {
    id: "feedback-3",
    content:
      "I am very happy and grateful that SchooledAfrika is continually contributing towards the community growth in various way like sharing the courses which is very helpful to crack or grow the subject specific knowledge. Materials are being used to increase interest in education.",
    rating: "⭐⭐⭐⭐⭐",
    name: "Promise Bamigboye",
  },
];

export const PopularCourses = [
  {
    id: "course-1",
    icon: "/course-1.png",
    classes: "Model 1",
    subject: "Introduction to SchooledAfrika",
    plan: "Basic Plan",
    pricingFree: "Free",

    
  },
  {
    id: "course-2",
    icon: "/course-1.png",
    classes: "Model 1", 
    subject: "Element of SchooledAfrika",
    plan: "Premium",
    pricing: "Locked",
  },
  {
    id: "course-3",
    icon: "/course-1.png",
    classes: "Model 1",
    subject: "Getting Acquainted with live lessons",
    plan: "Premium",
    pricing: "Locked",
  },
  {
    id: "course-4",
    icon: "/course-1.png",
    classes: "Model 1",
    subject: "Introduction to SchooledAfrika",
    plan: "Premium",
    pricing: "Locked",
  },
  {
    id: "course-5",
    icon: "/course-1.png",
    classes: "Model 1",
    subject: "Introduction to SchooledAfrika",
    plan: "Premium",
    pricing: "Locked",
  },
  {
    id: "course-6",
    icon: "/course-1.png",
    classes: "Model 1",
    subject: "Introduction to SchooledAfrika",
    plan: "Premium",
    pricing: "Locked",
  },
];

