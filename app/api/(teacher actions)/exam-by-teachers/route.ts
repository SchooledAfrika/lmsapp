// in this route, we handle teacher setting exams for students
// teacher will first create exams, which he will save and stored in the database
// this exams can then be linked to one-on-one section with students
// that means the exam can then be reused often as much as the creator and teacher wants
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { successFullMessage } from "@/prisma/utils/utils";

// create a post request to create an exam
export async function POST(req: Request) {
  // TODO: remember to change the teacherID here to the nextauth id
  const { teacherId, ...others } = await req.json();
  // check if the teacher is login
  if (!teacherId) return notAuthenticated();
  //   now we create the exam and store it
  try {
    await prisma.exams.create({
      data: { teacherId, ...others },
    });
    return successFullMessage("exam created successfully");
  } catch (error) {
    console.log(error);
    return serverError();
  }
}

// here, we make get request for all our exams
// returning based on the teacherId
export async function GET(req: Request) {
  // TODO: change the teacherId below to the nextauth id
  const teacherId = "663940ca5cecf4479bcefe78";
  if (!teacherId) return notAuthenticated();
  try {
    const allExams = await prisma.exams.findMany({
      where: { teacherId },
    });
    return new Response(JSON.stringify(allExams), { status: 200 });
  } catch (error) {
    return serverError();
  }
}

// delete a particular exam,
// here teacher can delete the exam that they actually created
export async function DELETE(req: Request) {
  // TODO: change the teacherId here to nextauth id
  const { id, teacherId } = await req.json();
  if (!teacherId) return notAuthenticated();
  //   lets now get the exam then  compare the teacherId in it
  // if it does not match we should return an error
  const getExam = await prisma.exams.findUnique({
    where: { id },
    select: { teacherId: true },
  });
  if (getExam?.teacherId !== teacherId)
    return new Response(
      JSON.stringify({ message: "you can only delete your exams" }),
      { status: 404 }
    );
  // here we proceed to deleting the exam from the database
  try {
    await prisma.exams.delete({ where: { id } });
    return successFullMessage("exam deleted successfully");
  } catch (error) {
    return serverError();
  }
}
