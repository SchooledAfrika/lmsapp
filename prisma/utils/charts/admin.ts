// this form the custom function for processing monthly users for the whole one year
export interface IusersChart {
  createdAt: Date;
}
export interface IStudentChart {
  createdAt: Date;
  status: string;
}
const Months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const processAdminAllStudentChart = (info: IStudentChart[]) => {
  const monthlyUser: { [key: number]: { active: number; passive: number } } =
    {};
  // Group scores by month
  info.forEach(({ createdAt, status }) => {
    const month = new Date(createdAt).getMonth(); // Jan = 0, Feb = 1, etc.
    if (!monthlyUser[month]) {
      monthlyUser[month] = { active: 0, passive: 0 };
    }
    if (status === "Active") {
      monthlyUser[month].active++;
    } else {
      monthlyUser[month].passive++;
    }
  });

  // Calculate the average for each month
  const yearlyArray: { month: string; active: number; passive: number }[] =
    Array(12)
      .fill(null)
      .map((_, i) => {
        if (monthlyUser[i]) {
          const monthData = {
            month: Months[i],
            active: monthlyUser[i].active,
            passive: monthlyUser[i].passive,
          };
          return monthData;
        }
        const monthData = { month: Months[i], active: 0, passive: 0 };
        return monthData;
      });

  return yearlyArray;
};
export const processAdminAllUserChart = (scores: IusersChart[]) => {
  const monthlyScores: { [key: number]: number[] } = {};
  // Group scores by month
  scores.forEach(({ createdAt }) => {
    const month = new Date(createdAt).getMonth(); // Jan = 0, Feb = 1, etc.
    if (!monthlyScores[month]) {
      monthlyScores[month] = [];
    }
    monthlyScores[month].push(1);
  });

  // Calculate the average for each month
  const yearlyArray = Array(12)
    .fill(null)
    .map((_, i) => {
      if (monthlyScores[i]) {
        return monthlyScores[i].reduce((acc, curr) => acc + curr, 0);
      }
      return null;
    });

  return yearlyArray;
};
