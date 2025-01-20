// here, the admin will be able to get the number of teachers in the platform
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";
export async function GET(req: Request) {
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  if (!userId) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  try {
    const allTeachers = await prisma.teacher.findMany();
    return new Response(
      JSON.stringify({ total: allTeachers ? allTeachers.length : 0 })
    );
  } catch (error) {
    return serverError();
  }
}
