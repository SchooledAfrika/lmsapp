// here we create the endpoint to fethc charts for admin to display information about student line chart
import prisma from "@/prisma/prismaConnect";
import { processAdminAllStudentChart } from "@/prisma/utils/charts/admin";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  // CHECK FOR AUTHENTICATION
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  if (!userId) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  try {
    const allStudents = await prisma.student.findMany({
      select: {
        createdAt: true,
        status: true,
      },
    });
    const mappedValue = allStudents.map((student) => ({
      createdAt: student.createdAt,
      status: student.status,
    }));
    // all the proceed or calculated chat
    const chatArrays = processAdminAllStudentChart(mappedValue);
    return new Response(JSON.stringify(chatArrays), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
