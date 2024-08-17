// here, we will get all the offers that are pending for the teacher
// so that the teacher can be able to accept or reject the offers
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  // check for authentication
  const teacherId = await serverSessionId();
  const role = await serverSessionRole();
  if (!teacherId) return notAuthenticated();
  if (role !== "Teacher") {
    return new Response(
      JSON.stringify({ message: "only teachers can access this..." }),
      { status: 400 }
    );
  }
  //   proceed to getting information
  try {
    const openOffers = await prisma.schoolTeacher.findMany({
      where: { teacherId, status: "PENDING" },
      include: {
        school: {
          select: {
            name: true,
            banner: true,
            schAddress: true,
            ownerName: true,
            briefDescription: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(openOffers), { status: 200 });
  } catch (error) {
    return serverError();
  }
}

// creating an update request
// this request will be open for teachers to update
// because is open for teachers to either accept or reject the offer
export async function PUT(req: Request) {
  const { offerId, status } = await req.json();
  console.log(offerId, status);
  const teacherId = await serverSessionId();
  // check for authentication
  if (!teacherId) return notAuthenticated();
  //   let check if the user passed the status and the offerid
  if (!status || !offerId) {
    return new Response(JSON.stringify({ message: "all field are required" }), {
      status: 404,
      statusText: "offerid needed and status needed",
    });
  }
  // lets first fetch the schoolTeacher that has this id
  // check if the teacher id matches with the teacherId passed
  const getSchoolTeacher = await prisma.schoolTeacher.findUnique({
    where: {
      id: offerId,
    },
  });
  if (getSchoolTeacher?.teacherId !== teacherId) {
    return new Response(
      JSON.stringify({ message: "you can not modify this offer" }),
      { status: 402 }
    );
  }
  // now we can now modify the model
  // that is probably changing it from pending to active or cancelled
  try {
    await prisma.schoolTeacher.update({
      where: {
        id: offerId,
      },
      data: {
        status,
      },
    });
    return new Response(JSON.stringify({ message: `you are now ${status}` }), {
      status: 200,
    });
  } catch (error) {
    throw new Error(
      JSON.stringify({ message: "something went wrong try again later" })
    );
  }
}
