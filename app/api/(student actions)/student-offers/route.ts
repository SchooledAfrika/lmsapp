// in this route, students will be able to accept an admission
// also get all the admissions that is open for him or her
import prisma from "@/prisma/prismaConnect";
import { serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

// here we run a get request
// to get all the information about a particular admission for one student
export async function GET(req: Request) {
  const studentId = await serverSessionId();
  try {
    const admissions = await prisma.schoolStudent.findMany({
      where: { studentId, status: "PENDING" },
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
    return new Response(JSON.stringify(admissions), { status: 200 });
  } catch (error) {
    return serverError();
  }
}

// here, we make use of put request to update the school Student data
// here, is only the student that can modify this status to either pending or cancelled
export async function PUT(req: Request) {
  const studentId = await serverSessionId();
  const { status, offerId } = await req.json();
  // lets return error if the inputs are not added
  if (!status || !offerId) {
    return new Response(JSON.stringify({ message: "inputs not complete" }), {
      status: 404,
    });
  }
  // lets get the offer, and also check if the studentId do match there
  // if it does not match, we return an error
  const getSchoolStudent = await prisma.schoolStudent.findUnique({
    where: {
      id: offerId,
    },
    select: {
      id: true,
      studentId: true,
    },
  });
  if (getSchoolStudent?.studentId !== studentId) {
    return new Response(
      JSON.stringify({ message: "you can only modify your offers" }),
      { status: 400 }
    );
  }
  // everything is in check, we can proceed to make our changes
  try {
    await prisma.schoolStudent.update({
      where: {
        id: offerId,
      },
      data: {
        status,
      },
    });
    return new Response(
      JSON.stringify({ message: "profile updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
}
