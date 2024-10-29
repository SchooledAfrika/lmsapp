// here we will return all the courses paid based on a particular role
import prisma from "@/prisma/prismaConnect";
import { serverError } from "@/prisma/utils/error";
import {
  getQuery,
  serverSessionId,
  serverSessionRole,
} from "@/prisma/utils/utils";

export async function GET(req: Request) {
  const role = getQuery(req.url, "role");
  const id = getQuery(req.url, "id");
  try {
    if (role === "Student") {
      // fetch courses bought by students
      const studentCourses = await prisma.studentPurchasedCourses.findMany({
        where: { id },
        include: {
          courseInfo: {
            select: {
              teacher: {
                select: {
                  name: true,
                  profilePhoto: true,
                  status: true,
                },
              },
            },
          },
        },
      });
      return new Response(JSON.stringify(studentCourses), { status: 200 });
    } else if (role === "Teacher") {
      // return courses that was purchased by teachers
      const teacherCourses = await prisma.teacherPurchasedCourses.findMany({
        where: { id },
        include: {
          courseInfo: {
            select: {
              teacher: {
                select: {
                  name: true,
                  profilePhoto: true,
                  status: true,
                },
              },
            },
          },
        },
      });
      return new Response(JSON.stringify(teacherCourses), { status: 200 });
    } else {
      // this will return all the courses bought by a particular parents
      const parentsCourses = await prisma.parentsPurchasedCourses.findMany({
        where: { id },
        include: {
          courseInfo: {
            select: {
              teacher: {
                select: {
                  name: true,
                  profilePhoto: true,
                  status: true,
                },
              },
            },
          },
        },
      });
      return new Response(JSON.stringify(parentsCourses), { status: 200 });
    }
  } catch (error) {
    return serverError();
  }
}
