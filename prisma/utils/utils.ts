export interface IexamType {
  question: String;
  answer: String;
  studentAnswer: String;
  options: String[];
}

interface ExamType {
  correctAnswer: number;
  percentage: string;
}

export const successFullMessage = (message: string) => {
  return new Response(JSON.stringify({ message }), { status: 200 });
};

// function to handle marking of exams here
export const markExams = (answeredTest: IexamType[]): ExamType => {
  const correctAnswerArray = answeredTest.filter(
    (item: IexamType) => item.answer === item.studentAnswer
  );
  const correctAnswer = correctAnswerArray.length;
  const getPercent = (correctAnswer / answeredTest.length) * 100;
  const percentage = getPercent.toFixed(2).toString().concat("%");
  // returning the number of question got and also the percentage gotten in the exam
  return { correctAnswer, percentage };
};
