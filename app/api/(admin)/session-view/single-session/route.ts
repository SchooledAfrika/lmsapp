// here we will be able to get a single session and display all the neccessay information in it
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import {
  getQuery,
  serverSessionId,
  serverSessionRole,
} from "@/prisma/utils/utils";

export async function GET(req: Request) {
  // check for authentication first
  const id = await serverSessionId();
  const role = await serverSessionRole();
  if (!id) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  // const get the query params needed
  const queryId = getQuery(req.url, "sessionId");
  try {
    const singleSession = await prisma.adminSectionView.findUnique({
      where: { id: queryId },
      include: {
        sectionInfo: {
          select: {
            sessionId: true,
            teacher: {
              select: {
                profilePhoto: true,
                email: true,
                name: true,
                rating: true,
              },
            },
          },
        },
        student: {
          select: {
            profilePhoto: true,
            name: true,
            email: true,
          },
        },
      },
    });
    console.log(singleSession);
    return new Response(JSON.stringify(singleSession), { status: 200 });
  } catch (error) {
    console.log(error);
    return serverError();
  }
}
