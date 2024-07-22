// in this route, we focus on allowing student to add their id to the backend after making payment
// this part is only accessible by the webhooks we have setup for payments
// TODO: remember to check or add the auth header for the keys given by this webhooks payment platform
import prisma from "@/prisma/prismaConnect";
import { serverError } from "@/prisma/utils/error";

// here we should be able to get all the classes
// get only about 20 classes at a time
export async function GET(req: Request) {
  try {
    const allClass = await prisma.classes.findMany({
      skip: 0,
      take: 9,
      include: {
        teacher: {
          select: {
            name: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(allClass), { status: 200 });
  } catch (error) {
    console.log(error);
    return serverError();
  }
}
