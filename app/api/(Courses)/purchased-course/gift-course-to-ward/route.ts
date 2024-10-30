// here, parents will be able to gift course to the ward
// only wards that are linked to his or her account
import prisma from "@/prisma/prismaConnect";
import {
  notAuthenticated,
  onlyParents,
  serverError,
} from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function POST(req: Request) {
  const { courseId, wardId } = await req.json();
  // here, we can authenticate the user below.
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  if (!userId) return notAuthenticated();
  if (role !== "Parents") return onlyParents();
  // first, lets get all the wards associated with this parents
  // then check if the ward sent from the frontend is one of the ward registered with
  // if not, we return an error messages
  const allWards = await prisma.parents.findUnique({
    where: { id: userId },
    select: {
      wards: {
        select: {
          id: true,
        },
      },
    },
  });
  const childPresent = allWards?.wards.find((item) => item.id === wardId);
  if (!childPresent)
    return new Response(
      JSON.stringify({ message: "you can only gift your ward" }),
      { status: 400 }
    );
  try {
    // now, we can proceed to get the course bought by the parent
    // using the courseId
    const course = await prisma.parentsPurchasedCourses.findUnique({
      where: { id: courseId },
    });
    if (!course)
      return new Response(
        JSON.stringify({ message: "course does not exist" }),
        { status: 404 }
      );
    await prisma.studentPurchasedCourses.create({
      data: {
        title: course.title,
        byAdmin: course.byAdmin,
        banner: course.banner,
        subject: course.subject,
        coursesId: course.coursesId,
        price: course.price,
        previewVideo: course.previewVideo,
        mainVideo: course.mainVideo,
        studentId: wardId,
        gifted: true,
      },
    });
    return new Response(
      JSON.stringify({ message: "Course gifted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}
