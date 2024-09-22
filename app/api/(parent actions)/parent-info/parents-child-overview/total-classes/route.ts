// here, we will be able to get the total number of classes
// which a particular child is learning from
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { getQuery, serverSessionId } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  const childId = getQuery(req.url, "childId");
  const id = await serverSessionId();
  if (!id) return notAuthenticated();
  try {
    // now we can get all the classeses the student is under and also return the number
    const childClasses = await prisma.student.findUnique({
      where: { id: childId },
      select: {
        classIDs: true,
      },
    });
    let totalClasses;
    if (childClasses?.classIDs) {
      totalClasses = childClasses.classIDs.length;
    } else {
      totalClasses = 0;
    }
    return new Response(JSON.stringify({ classNo: totalClasses }), {
      status: 200,
    });
  } catch (error) {
    return serverError();
  }
}
