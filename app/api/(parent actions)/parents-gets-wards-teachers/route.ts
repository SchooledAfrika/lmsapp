// here we will get all the classes associated with just one ward
import prisma from "@/prisma/prismaConnect";
import {
  notAuthenticated,
  onlyParents,
  serverError,
} from "@/prisma/utils/error";
import {
  getQuery,
  serverSessionId,
  serverSessionRole,
} from "@/prisma/utils/utils";

export async function GET(req: Request) {
  const childId = getQuery(req.url, "childId");
  //   check for authentication below
  const id = await serverSessionId();
  const role = await serverSessionRole();
  if (!id) return notAuthenticated();
  if (role !== "Parents") return onlyParents();
  try {
    // now we get all the classes the ward is attending
    // then get all the teachers information
    // and return only that information
    const childClass = await prisma.student.findUnique({
      where: { id: childId },
      select: {
        classes: {
          select: {
            teacher: {
              select: {
                name: true,
                profilePhoto: true,
                status: true,
              },
            },
            className: true,
            grade: true,
            subject: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(childClass), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
