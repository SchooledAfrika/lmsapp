// here we will return admin basic information
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  if (!userId) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  try {
    const basicInfo = await prisma.teacher.findUnique({
      where: { id: userId },
      select: {
        phoneNo: true,
        createdAt: true,
        status: true,
      },
    });
    return new Response(JSON.stringify(basicInfo), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
