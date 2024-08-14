// here, we will get only one vacancy
// which does not include the teachers
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
      JSON.stringify({ message: "only school are allowed" }),
      { status: 400 }
    );
  }
  // now we access your backend informations
  try {
    const oneVacancy = await prisma.vacancy.findUnique({
      where: { id: params.id },
    });
    if (oneVacancy?.schoolId !== schoolId) {
      return new Response(
        JSON.stringify({ message: "you can't assess this information" }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify(oneVacancy), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
