// here we should be able to get a single special request
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId } from "@/prisma/utils/utils";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userId = await serverSessionId();
  if (!userId) return notAuthenticated();

  try {
    const singleRequest = await prisma.specialTeacherMerged.findUnique({
      where: { id: params.id },
      include: {
        student: {
          select: {
            name: true,
            profilePhoto: true,
            grade: true,
            gender: true,
            email: true,
            address: true,
            disable: true,
          },
        },
        teacher: {
          select: {
            name: true,
            profilePhoto: true,
            email: true,
            phoneNo: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(singleRequest), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
