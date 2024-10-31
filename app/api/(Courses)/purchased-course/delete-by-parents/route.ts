// here, parents can delet their purchased courses
import prisma from "@/prisma/prismaConnect";
import { onlyTeacher, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function DELETE(req: Request) {
  const { courseId } = await req.json();
  const id = await serverSessionId();
  const role = await serverSessionRole();
  if (role !== "Parents") return onlyTeacher();
  try {
    // now lets get the course we want to delete
    // and also compare that is the owner of the course that want to actually delete it
    const theCourse = await prisma.parentsPurchasedCourses.findUnique({
      where: { id: courseId },
      select: { parentsId: true },
    });
    // checking if course actually exists
    if (!theCourse)
      return new Response(
        JSON.stringify({ message: "this course does not exist" }),
        { status: 404 }
      );
    if (id !== theCourse.parentsId) {
      return new Response(
        JSON.stringify({ message: "unauthenticated delete" }),
        { status: 400 }
      );
    }
    // now we can delete the purchased course here
    await prisma.parentsPurchasedCourses.delete({
      where: { id: courseId },
    });
    return new Response(
      JSON.stringify({ message: "delete successfully done" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}
