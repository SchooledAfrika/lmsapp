// here admin will be able to get all the courses created by the admin
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  // check for authentication first
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  if (!userId) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  try {
    const coursesByAdmins = await prisma.courses.findMany({
      where: { byAdmin: true },
      orderBy: [{ createdAt: "desc" }],
    });
    return new Response(JSON.stringify(coursesByAdmins), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
