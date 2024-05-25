// here, a teacher will add his resources to the class for students to use;
import prisma from "@/prisma/prismaConnect";
import { serverError } from "@/prisma/utils/error";

// add resources to class
export async function POST(req: Request) {
  // TODO: change this teacherId to nextauth id
  const { teacherId, classId, resourceId } = await req.json();
  if (!teacherId)
    return new Response(
      JSON.stringify({ message: "you are not authenticated" })
    );
  // lets get the class from the classId, and make sure is actually the teacher that owns it
  const getClass = await prisma.classes.findUnique({
    where: {
      id: classId,
    },
  });
  if (!getClass) {
    return new Response(JSON.stringify({ message: "cless does not exist" }), {
      status: 404,
    });
  }
  if (getClass?.teacherId !== teacherId) {
    return new Response(
      JSON.stringify({ message: "you are not allowed to access this class" }),
      { status: 404 }
    );
  }
  // proceed to add now
  try {
    await prisma.classes.update({
      where: { id: classId },
      data: {
        resourcesIds: [...getClass.resourcesIds, resourceId],
      },
    });
  } catch (error) {
    return serverError();
  }
}
