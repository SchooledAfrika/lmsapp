// here, the admin will be able to get the number of parents in the platform
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";
export async function GET(req: Request) {
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  if (!userId) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  try {
    const allParents = await prisma.parents.findMany();
    return new Response(
      JSON.stringify({ total: allParents ? allParents.length : 0 })
    );
  } catch (error) {
    return serverError();
  }
}
