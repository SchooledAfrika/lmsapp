// here we focus on implementing the actions
// where student are able to get all the classes they belong in
// both school classes and public classes created by individual teachers
import { subjects } from "@/constants";
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  const studentId = await serverSessionId();
  const role = await serverSessionRole();
  // making sure the user is logged in first before accessing this info
  if (!studentId) return notAuthenticated();
  if (role !== "Student") {
    return new Response(
      JSON.stringify({ message: "only student can access this" }),
      { status: 400 }
    );
  }
  //   now we try getting the both type of class and merge the two arrays gotten
  try {
    // get all the normal group classes the students is already subscribed to
    const groupClasses = await prisma.classes.findMany({
      select: {
        studentIDs: true,
        className: true,
        subject: true,
        grade: true,
        id: true,
        teacherId: true,
        createdAt: true,
      },
    });
    // then check the return group class for those that contains that particular student Id,
    const filteredGroupClasses = groupClasses.filter((gc) =>
      gc.studentIDs.includes(studentId)
    );
    // total new array for both time of classes are
    const joinedClasses = [
      ...filteredGroupClasses.map((gc) => ({
        id: gc.id,
        name: gc.className,
        subjects: gc.subject,
        grade: gc.grade,
        createdAt: gc.createdAt,
        type: "group-class",
      })),
    ];
    // forming new Array by sorting the time in which the class was created
    const sortedArray = joinedClasses.sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    return new Response(JSON.stringify(sortedArray), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
