// here, we will allow teachers to get the applicatio they had already made
// they can also be able to delete their applications

import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  // check for authentication
  const teacherId = await serverSessionId();
  const role = await serverSessionRole();
  if (!teacherId) return notAuthenticated();
  if (role !== "Teacher") {
    return new Response(
      JSON.stringify({ message: "only teachers can access this..." }),
      { status: 400 }
    );
  }
  //   proceed to getting information
  try {
    const openOffers = await prisma.vacancyTeacher.findMany({
      where: { teacherId },
      include: {
        vacancy: {
          select: {
            role: true,
            description: true,
            qualifications: true,
            responsibility: true,
            minSalary: true,
            maxSalary: true,
            note: true,
            jobTitle: true,
            state: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(openOffers), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
