// here in this endpoint,
// we are making a get request, get all the total teacher associated with this student
// this include the class teaches and the on on one session teacher
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { getQuery, serverSessionId } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  const childId = getQuery(req.url, "childId");
  const parentsId = await serverSessionId();
  if (!parentsId) return notAuthenticated();
  try {
    // first, lets get all the classess the child is in
    const childClasses = await prisma.student.findUnique({
      where: { id: childId },
      select: {
        classIDs: true,
      },
    });
    // then lets get all the one on one section the child is in
    const childSessions = await prisma.appliedSection.findMany({
      where: { studentId: childId },
    });
    // now we calculate the both length as the number of teachers that we have
    // if the classes returned is undefined, then we should check only for one on one section teachers
    let totalTeachers;
    if (childClasses) {
      totalTeachers = childClasses.classIDs.length + childSessions.length;
    } else {
      totalTeachers = childSessions.length;
    }
    return new Response(JSON.stringify({ teachersNo: totalTeachers }), {
      status: 200,
    });
  } catch (error) {
    return serverError();
  }
}
