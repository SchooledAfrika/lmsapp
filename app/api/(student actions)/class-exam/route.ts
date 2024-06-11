// here, the student answers there exam,
// then pushes there id into the array showing that they have finished the exam.

import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { IexamType, markExams, successFullMessage } from "@/prisma/utils/utils";

export async function POST(req: Request) {
  // TODO: remember to remove the studentId to the nextauth id
  const { studentId, examId, classId, answeredExam } = await req.json();
  // check if the student is logged in already
  if (!studentId) return notAuthenticated();
  //   lets get the class and check the ids in the list of students in the class
  // if the list does not contain the studentsId
  // we should return with an error
  const getClass = await prisma.classes.findUnique({
    where: {
      id: classId,
    },
    select: {
      studentIDs: true,
    },
  });
  const checkStudent = getClass?.studentIDs.includes(studentId);
  if (!checkStudent)
    return new Response(
      JSON.stringify({ message: "you are not part of this class" }),
      { status: 400 }
    );
  // then, lets check if the student have already answered this question below,
  // add if they have answered we return an error message
  const checkIfStudentHasAnswer = await prisma.studentClassExam.findFirst({
    where: {
      mainExamId: examId,
      studentId,
    },
  });
  if (checkIfStudentHasAnswer)
    return new Response(
      JSON.stringify({ message: "you have already answered this exam" }),
      { status: 401 }
    );
  // now lets mark the exam using the mark exam function below
  const { correctAnswer, percentage } = markExams(answeredExam);
  //   now, lets modify the array in the classexam to add the student that just answered a question id in the array
  await prisma.classExams.update({
    where: { id: examId },
    data: { answeredStudentIds: { push: studentId } },
  });
  //   now lets get the main exam, so we can update it to the exam the student answered
  const getExam = await prisma.classExams.findUnique({ where: { id: examId } });

  try {
    //   now we can create the classexam answered by the student
    await prisma.studentClassExam.create({
      data: {
        completed: true,
        score: correctAnswer,
        percentage,
        questions: answeredExam,
        title: getExam?.title!,
        grade: getExam?.grade!,
        mainExamId: examId,
        studentId,
        classesId: classId,
      },
    });
    return successFullMessage(`${correctAnswer}`);
  } catch (error) {
    return serverError();
  }
}
