// here we will create the array for getting all the charts to display the progress of all the users over the years
import prisma from "@/prisma/prismaConnect";
import { processAdminAllUserChart } from "@/prisma/utils/charts/admin";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  // checking if is admin assessing the route
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  if (!userId) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  try {
    // here, we get the total teachers
    const allTeachers = await prisma.teacher.findMany({
      select: {
        createdAt: true,
      },
    });
    // all the students below here
    const allStudents = await prisma.student.findMany({
      select: {
        createdAt: true,
      },
    });
    // all the parents below here
    const allParents = await prisma.parents.findMany({
      select: {
        createdAt: true,
      },
    });

    // below here, we make use of the custom function to create all the arrays we actually want
    const teacherArrays = processAdminAllUserChart(allTeachers);
    const studentArrays = processAdminAllUserChart(allStudents);
    const parentsArrays = processAdminAllUserChart(allParents);
    // creating an object we will use in the frontend for easy consuption
    const allArrays = {
      teachers: teacherArrays,
      students: studentArrays,
      parents: parentsArrays,
    };
    return new Response(JSON.stringify(allArrays), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
