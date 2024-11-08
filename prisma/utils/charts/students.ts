// this custom function helps to calculate everything about summing the exams based on the data passed
export interface IexamsSum {
  createdAt: Date;
  score: number | null;
}

export const processScoresByMonth = (scores: IexamsSum[]) => {
  const monthlyScores: { [key: number]: number[] } = {};
  // Group scores by month
  scores.forEach(({ createdAt, score }) => {
    const month = new Date(createdAt).getMonth(); // Jan = 0, Feb = 1, etc.
    if (!monthlyScores[month]) {
      monthlyScores[month] = [];
    }
    monthlyScores[month].push(score as number);
  });

  // Calculate the average for each month
  const averagedScores = Array(12)
    .fill(null)
    .map((_, i) => {
      if (monthlyScores[i]) {
        const sum = monthlyScores[i].reduce((acc, curr) => acc + curr, 0);
        return sum / monthlyScores[i].length;
      }
      return null;
    });

  return averagedScores;
};
