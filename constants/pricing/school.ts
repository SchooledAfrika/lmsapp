export interface eachPrice {
  planName: string;
  amt: number;
  details: string[];
  duration?: string;
}
// this is the current plans for the eacher
// for monthly plans
export const teacherMonthlyPlan: eachPrice[] = [
  {
    planName: "Basic",
    amt: 3500,
    details: ["5 class maximum", "session profile"],
    duration: "Monthly",
  },
  {
    planName: "PRO",
    amt: 10000,
    details: [
      "Infinite class",
      "Session profile",
      "Can create course",
      "Access to school afrika course",
    ],
    duration: "Monthly",
  },
];
export const teacherSemiAnnualPlan: eachPrice[] = [
  {
    planName: "Basic",
    amt: 17500,
    details: ["5 class maximum", "session profile"],
    duration: "Semi-Annual",
  },
  {
    planName: "PRO",
    amt: 50000,
    details: [
      "Infinite class",
      "Session profile",
      "Can create course",
      "Access to school afrika course",
    ],
    duration: "Semi-Annual",
  },
];
export const teacherYearlyPlan: eachPrice[] = [
  {
    planName: "Basic",
    amt: 40000,
    details: ["5 class maximum", "session profile"],
    duration: "Yearly",
  },
  {
    planName: "PRO",
    amt: 110000,
    details: [
      "Infinite class",
      "Session profile",
      "Can create course",
      "Access to school afrika course",
    ],
    duration: "Yearly",
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
