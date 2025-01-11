// here, we get only one vacancy advertisement
// and also it will contain all the teacher attached to the job
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userId = await serverSessionId();
  const role = await serverSessionRole();

  if (!userId) return notAuthenticated();
  if (role !== "Admin") {
    return new Response(JSON.stringify({ message: "illegal path!!!" }), {
      status: 400,
    });
  }

  // now we try get the one vacancy advertisement
  try {
    const oneAdvert = await prisma.vacancy.findUnique({
      where: {
        id: params.id,
      },
      include: {
        VacancyTeacher: {
          select: {
            createdAt: true,
            id: true,
            status: true,
            teacher: {
              select: {
                name: true,
                email: true,
                profilePhoto: true,
                phoneNo: true,
                rating: true,
                id: true,
              },
            },
          },
        },
      },
    });
    return new Response(JSON.stringify(oneAdvert), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
