// here, we get only one vacancy advertisement
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const schoolId = await serverSessionId();
  const role = await serverSessionRole();

  if (!schoolId) return notAuthenticated();
  if (role !== "School") {
    return new Response(
      JSON.stringify({ message: "only school is allowed " }),
      { status: 400 }
    );
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
            teacher: {
              select: {
                name: true,
                email: true,
                profilePhoto: true,
                phoneNo: true,
                rating: true,
              },
            },
          },
        },
      },
    });

    if (oneAdvert?.schoolId !== schoolId) {
      return new Response(
        JSON.stringify({
          message: "you are  not allowed to assess this advert",
        }),
        { status: 400 }
      );
    }
    return new Response(JSON.stringify(oneAdvert), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
