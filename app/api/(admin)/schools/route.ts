// this route, we should be able to get all the schools that is in the platform
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  // checking authentication
  const id = await serverSessionId();
  if (!id) return notAuthenticated();
  // checking if the role is admin role first
  const role = await serverSessionRole();
  if (role !== "Admin") {
    return new Response(JSON.stringify({ message: "only admin is allowed" }), {
      status: 400,
    });
  }
  try {
    // getting all the schools in the platform
    const allSchools = await prisma.school.findMany({
      select: {
        id: true,
        banner: true,
        name: true,
        SchoolClass: {
          select: {
            id: true,
          },
        },
        SchoolStudent: {
          select: {
            id: true,
          },
        },
        SchoolTeachers: {
          select: {
            id: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(allSchools), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
