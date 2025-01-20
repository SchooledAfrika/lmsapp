// here, we will get only one vacancy
// which does not include the teachers
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userId = await serverSessionId();
  const role = await serverSessionRole();

  if (!userId) return notAuthenticated();
  if (role !== "Admin") onlyAdmin();
  // now we access your backend informations
  try {
    const oneVacancy = await prisma.vacancy.findUnique({
      where: { id: params.id },
    });
    return new Response(JSON.stringify(oneVacancy), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
