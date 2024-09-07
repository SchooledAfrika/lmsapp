// here we will get all the students in the database
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

// get all the student from the database
export async function GET(req: Request) {
  const id = await serverSessionId();
  const role = await serverSessionRole();
  if (!id) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  try {
    const allStudents = await prisma.student.findMany({
      select: {
        id: true,
        name: true,
        profilePhoto: true,
        email: true,
        phoneNo: true,
        country: true,
        status: true,
      },
    });
    return new Response(JSON.stringify(allStudents), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
