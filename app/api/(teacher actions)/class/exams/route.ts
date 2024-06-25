// here, the teacher can add the exams he previously created to the classroom

import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
// here we add exam to the class
// and only the teacher that created the class can add this exam to the class
export async function POST(req: Request) {
  // TODO: remember to change the teacher id here to nextauth id
  const { teachersId, examId, classId } = await req.json();
  if (!teachersId) return notAuthenticated();
  //   first lets get the class and check if the teacher is the owner of the class
  const getclass = await prisma.classes.findUnique({
    where: {
      id: classId,
    },
    select: {
      teacherId: true,
    },
  });
  if (getclass?.teacherId !== teachersId)
    return new Response(
      JSON.stringify({
        message: "you can't add exam to classes you did not create",
      }),
      { status: 400 }
    );
  // then we will get the exam the teacher passed the id
  const getTeachersExam = await prisma.exams.findUnique({
    where: {
      id: examId,
    },
  });
  if (!getTeachersExam)
    return new Response(
      JSON.stringify({ message: "this exam does not exist" }),
      { status: 400 }
    );
  // then lets filter the fields we need to be displayed in the classExams model
  const { createdAt, updatedAt, teacherId, ...others } = getTeachersExam;
  try {
    await prisma.classExams.create({
      data: {
        classesId: classId,
        ...others,
      },
    });
    return new Response(
      JSON.stringify({ message: "exam successfully created" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}

// this route is for deleting the exam
export async function DELETE(req: Request) {
  // TODO: remember to remove the id below and use the nextauthid
  const { classExamId, classId, teachersId } = await req.json();
  // return error if not authenticated
  if (!teachersId) return notAuthenticated();
  //   then lets get the class and check if the teacherId will match
  const getClass = await prisma.classes.findUnique({
    where: {
      id: classId,
    },
    select: {
      teacher: true,
    },
  });
  if (teachersId !== getClass?.teacher)
    return new Response(
      JSON.stringify({ message: "you can't delete another teachers exams" }),
      { status: 400 }
    );

  // here we go ahead and delete the exam
  try {
    await prisma.classExams.delete({
      where: {
        id: classExamId,
      },
    });
    return new Response(
      JSON.stringify({ message: "exam deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}
