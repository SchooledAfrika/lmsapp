// in this route, we link the teachers exam to the one-on-one session between student and teacher
// the appliedsection is the model that handles this relationship
// this route is just about creating this exam and get this exams for students
import prisma from "@/prisma/prismaConnect";
import {
  notAuthenticated,
  onlyTeacher,
  serverError,
} from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

// post request to add an exam for a one on one session
export async function POST(req: Request) {
  const teacherId = await serverSessionId();
  const role = await serverSessionRole();
  const { examId, appliedSectionId } = await req.json();
  if (!teacherId) return notAuthenticated();
  if (role !== "Teacher") return onlyTeacher();
  //   then lets get the exam we want to add in the session
  const exam = await prisma.exams.findUnique({ where: { id: examId } });
  if (!exam)
    return new Response(
      JSON.stringify({ message: "this exam does not exist" }),
      { status: 404 }
    );
  // check if is the teacher that want to add the exam is the same teacher that created the exam
  if (exam.teacherId !== teacherId)
    return new Response(
      JSON.stringify({ message: "you can only use the exam you set" }),
      { status: 400 }
    );
  // lets go ahead and add the exam for this student in the appliedsection
  try {
    await prisma.studentExam.create({
      data: {
        appliedSectionId,
        questions: exam.test,
        title: exam.title,
        grade: exam.grade,
        subject: exam.subject,
      },
    });
    return new Response(
      JSON.stringify({ message: "exam successfully created" }),
      { status: 200 }
    );
  } catch (error) {
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
}

// enpoint for teacher to delete a particular exam he set before;
export async function DELETE(req: Request) {
  const { examId } = await req.json();
  const userId = await serverSessionId();
  if (!userId) return notAuthenticated();
  try {
    await prisma.studentExam.delete({ where: { id: examId } });
    return new Response(
      JSON.stringify({ message: "exam deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}
