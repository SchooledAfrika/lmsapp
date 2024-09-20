// here we will be able to get all the parents in our platform
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  const id = await serverSessionId();
  const role = await serverSessionRole();
  // check for authentication below here
  if (!id) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  try {
    const allParents = await prisma.parents.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        wards: {
          select: {
            id: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(allParents), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
