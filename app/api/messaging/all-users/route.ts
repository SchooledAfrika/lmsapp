// here, we will message all the users
// based on the group that is passed from the admin dashboard.
import prisma from "@/prisma/prismaConnect";
import { MessageUsers } from "@/prisma/utils/Emails/messageUser";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function POST(req: Request) {
  const { subject, message, group } = await req.json();
  // lets check for authentication first
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  if (!userId) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  // check if all field was provided well.
  if (!subject || !message || !group) {
    return new Response(
      JSON.stringify({ message: "please enter all fields" }),
      { status: 404 }
    );
  }

  try {
    if (group == "Students") {
      // here we get all students
      // then map them to get only the email address
      const allStudents = await prisma.student.findMany({
        select: { email: true },
      });
      const allMails = allStudents.map((student) => student.email);
      // now we sent the email
      return MessageUsers(allMails, subject, message);
    }
    if (group == "Parents") {
      // here we get all parents
      // then map them to get only the email address
      const allStudents = await prisma.parents.findMany({
        select: { email: true },
      });
      const allMails = allStudents.map((parents) => parents.email);
      // now we sent the email
      return MessageUsers(allMails, subject, message);
    }
    if (group == "Teachers") {
      // here we get all parents
      // then map them to get only the email address
      const allStudents = await prisma.teacher.findMany({
        select: { email: true },
      });
      const allMails = allStudents.map((teachers) => teachers.email);
      // now we sent the email
      return MessageUsers(allMails, subject, message);
    }
    return new Response(
      JSON.stringify({ message: "something went wrong!!!" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}
