// this route, we should be able to get all the schools that is in the platform
import prisma from "@/prisma/prismaConnect";
import { serverError } from "@/prisma/utils/error";

export async function GET(req: Request) {
  try {
    // getting all the schools in the platform
    const allSchools = await prisma.school.findMany({
      select: {
        id: true,
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
