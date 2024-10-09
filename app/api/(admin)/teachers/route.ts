// in this route we will get all the teachers in the platform
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  // checking for authentication and role before proceeding
  const id = await serverSessionId();
  const role = await serverSessionRole();
  if (!id) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  try {
    const allTeachers = await prisma.teacher.findMany({
      select: {
        name: true,
        id: true,
        status: true,
        email: true,
        TeachersPlans: {
          select: {
            plan: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(allTeachers), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
