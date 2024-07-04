// here, the teacher can get only one class, to see the informations about the class
import prisma from "@/prisma/prismaConnect";
import { serverError } from "@/prisma/utils/error";
import { serverSessionId } from "@/prisma/utils/utils";

// only one class is return here, with all the information
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const teacherId = await serverSessionId();
  try {
    const classDetail = await prisma.classes.findUnique({
      where: { id: params.id },
      include: {
        students: true,
      },
    });
    if (classDetail?.teacherId !== teacherId) {
      return new Response(
        JSON.stringify({ message: "you can't acccess this class" }),
        { status: 400 }
      );
    }
    return new Response(JSON.stringify(classDetail), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
