// here, the admin will be able to get all the session profiles
// so that he can filter and set a particular profile to a particular student
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  const id = await serverSessionId();
  const role = await serverSessionRole();
  if (!id) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  try {
    const allSessionProfiles = await prisma.oneOnOneSection.findMany({
      select: {
        id: true,
        sessionId: true,
        teacher: {
          select: {
            name: true,
            profilePhoto: true,
            gender: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(allSessionProfiles), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
