// in this route, we focus on allowing student to add their id to the backend after making payment
// this part is only accessible by the webhooks we have setup for payments
// TODO: remember to check or add the auth header for the keys given by this webhooks payment platform
import prisma from "@/prisma/prismaConnect";
import { serverError } from "@/prisma/utils/error";

// add student to the class after making payment
export async function POST(req: Request) {
  // TODO: remember to manipulate the payload coming from the webhooks payment platform and remove this body here
  const { studentId, classId } = await req.json();
  //   lets get the class first so that we can be able to push the new id
  const theclass = await prisma.classes.findUnique({ where: { id: classId } });
  theclass?.studentIDs.push(studentId);
  try {
    await prisma.classes.update({
      where: { id: classId },
      data: { studentIDs: theclass?.studentIDs },
    });
  } catch (error) {
    return serverError();
  }
}
