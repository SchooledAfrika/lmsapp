// here we will get all the neccessary total class
// total students
// and total resources
import prisma from "@/prisma/prismaConnect";
import {
  notAuthenticated,
  onlyTeacher,
  serverError,
} from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  if (!userId) return notAuthenticated();
  if (role !== "Teacher") return onlyTeacher();
  try {
    const allparameters = await prisma.teacher.findUnique({
      where: { id: userId },
      select: {
        Classes: {
          select: {
            id: true,
            studentIDs: true,
          },
        },
        OneOnOneSection: {
          select: {
            AppliedSection: {
              select: {
                id: true,
              },
            },
          },
        },
        TeachersArticle: {
          select: {
            id: true,
          },
        },
      },
    });
    // here we will calculate the total students in the teachers platform
    const classStudents = allparameters?.Classes.map(
      (eachClass) => eachClass.studentIDs
    ).flat();
    const totalClassStudents = classStudents ? classStudents.length : 0;
    const appliedStudents = allparameters?.OneOnOneSection?.AppliedSection;
    const totalAppliedStudents = appliedStudents ? appliedStudents.length : 0;
    const totalStudents = totalClassStudents + totalAppliedStudents;
    // here we calculate the total classes the teacher is managing
    const totalClasses = allparameters?.Classes
      ? allparameters.Classes.length
      : 0;
    // here we calculate the total teacher's resources here
    const teachersResources = allparameters?.TeachersArticle;
    const TotalResources = teachersResources ? teachersResources.length : 0;
    const chartArray: number[] = [totalStudents, totalClasses, TotalResources];
    console.log(chartArray);
    return new Response(JSON.stringify(chartArray), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
