// here we should be able to get only one unmerged special request
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  // checking for authentication
  if (!userId) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();

  try {
    const oneSpecialRequest = await prisma.specialTeacherUnmerged.findUnique({
      where: { id: params.id },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            profilePhoto: true,
          },
        },
      },
    });
    console.log(oneSpecialRequest);
    return new Response(JSON.stringify(oneSpecialRequest), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
