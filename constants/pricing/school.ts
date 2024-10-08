export interface eachPrice {
  planName: string;
  amt: number;
  details: string[];
  duration?: string;
  expireIn?: number;
}
// this is the current plans for the eacher
// for monthly plans
export const teacherMonthlyPlan: eachPrice[] = [
  {
    planName: "BASIC",
    amt: 2.5,
    details: [
      "unlimitted classes",
      "session profile",
      "unlimitted students",
      "Can't create course",
      " No access to school afrika course",
    ],
    duration: "Monthly",
    expireIn: 1,
  },
  {
    planName: "PRO",
    amt: 7,
    details: [
      "unlimitted class",
      "Session profile",
      "unlimitted students",
      "Can create course",
      "Access to school afrika course",
    ],
    duration: "Monthly",
    expireIn: 1,
  },
];
export const teacherSemiAnnualPlan: eachPrice[] = [
  {
    planName: "BASIC",
    amt: 15,
    details: [
      "unlimitted classes",
      "session profile",
      "unlimitted students",
      "Can't create course",
      " No access to school afrika course",
    ],
    duration: "Semi-Annual",
    expireIn: 6,
  },
  {
    planName: "PRO",
    amt: 40,
    details: [
      "unlimitted class",
      "Session profile",
      "unlimitted students",
      "Can create course",
      "Access to school afrika course",
    ],
    duration: "Semi-Annual",
    expireIn: 6,
  },
];
export const teacherYearlyPlan: eachPrice[] = [
  {
    planName: "Basic",
    amt: 25,
    details: [
      "unlimitted classes",
      "session profile",
      "unlimitted students",
      "Can't create course",
      " No access to school afrika course",
    ],
    duration: "Yearly",
    expireIn: 12,
  },
  {
    planName: "PRO",
    amt: 80,
    details: [
      "unlimitted class",
      "Session profile",
      "unlimitted students",
      "Can create course",
      "Access to school afrika course",
    ],
    duration: "Yearly",
    expireIn: 12,
  },
];
// the plan below was used before,
// and it may be removed later
export const monthlyPlans: eachPrice[] = [
  {
    planName: "Basic Bundle",
    amt: 0,
    details: [
      "1 teacher (exclusive owner)",
      "two classes",
      "15 students",
      "Email support",
    ],
  },
  {
    planName: "Bronze Bundle",
    amt: 10,
    details: ["2-5 teachers", "5 classes", "30 students", "Email support"],
  },
  {
    planName: "Silver Bundle",
    amt: 15,
    details: ["6-10 teachers", "20 classes", "50 students", "Email support"],
  },
  {
    planName: "Gold Bundle",
    amt: 25,
    details: ["11-20 teachers", "50 classes", "100 students", "Email support"],
  },
  {
    planName: "Diamond Bundle",
    amt: 35,
    details: [
      "21-100 teachers",
      "unlimited classes",
      "unlimited students",
      "Email support",
    ],
  },
];

// exporting an array that contains the payment methods for the class part
interface Ipay {
  desc: string;
  image: string;
  title: string;
}
export const paymentMethods: Ipay[] = [
  {
    title: "Paystack",
    desc: "Effortlessly pay with paystack, simplify your online transaction",
    image: "/paystack.png",
  },
  {
    title: "Flutter Wave",
    desc: "Effortlessly pay with flutterwave, simplify your online transaction",
    image: "/flutterwave.png",
  },
];
