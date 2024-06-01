export interface IexamType {
  question: String;
  answer: String;
  studentAnswer: String;
  options: String[];
}

export const successFullMessage = (message: string) => {
  return new Response(JSON.stringify({ message }), { status: 200 });
};
