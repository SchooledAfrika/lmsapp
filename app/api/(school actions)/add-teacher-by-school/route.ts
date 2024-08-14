// in this route, we will be able to add a new teacher to the school
// using the teachers id

import prisma from "@/prisma/prismaConnect";
import { notAuthenticated } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

// post request to add new teachers
export async function POST(req: Request) {
  console.log("entered");
  const { teacherId } = await req.json();
  console.log("this is the id", teacherId);
  const schoolId = await serverSessionId();
  const role = await serverSessionRole();
  if (role !== "School")
    return new Response(
      JSON.stringify({
        message: "you have to register as school to perform this action",
      }),
      { status: 400 }
    );
  if (!schoolId) return notAuthenticated();
  if (!teacherId) {
    return new Response(JSON.stringify({ message: "teachers id required" }), {
      status: 404,
      statusText: "teacher id is required",
    });
  }

  // lets proceed to creating the schoolTeacher for this particular teacher
  try {
    // first, lets checkmate if the id send from the frontend is a teacher or exists in teacher mode
    const checkIfIsTeacher = await prisma.teacher.findUnique({
      where: { id: teacherId },
      select: {
        id: true,
      },
    });
    if (!checkIfIsTeacher) {
      return new Response(JSON.stringify({ message: "invalid teacher id" }), {
        status: 401,
      });
    }
    // we also check if the teacher was created before by the school
    // we will return an error message showing that the teacher can not be created twice
    const checkTeacherExistence = await prisma.schoolTeacher.findFirst({
      where: {
        schoolId,
        teacherId,
      },
      select: {
        id: true,
      },
    });

    if (checkTeacherExistence) {
      return new Response(
        JSON.stringify({ message: "Teacher already exists" }),
        {
          status: 404,
        }
      );
    }
    await prisma.schoolTeacher.create({
      data: {
        schoolId: schoolId,
        teacherId: teacherId,
      },
    });
    return new Response(
      JSON.stringify({ message: "Teacher invited successfully" }),
      { status: 200, statusText: "success" }
    );
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "invalid teacherId" }), {
      status: 500,
    });
  }
}

// here, we should be able to delete teachers offers
// is only the school that created this offer can delete it
export async function DELETE(req: Request) {
  const { offerId } = await req.json();
  const schoolId = await serverSessionId();
  if (!schoolId) return notAuthenticated();
  if (!offerId) {
    return new Response(JSON.stringify({ message: "all input is needed" }), {
      status: 404,
    });
  }
  // lets first fetch the offer then compare if it is actually the school that created them
  // if it is not, we return an error
  // else we will proceed
  const getOffer = await prisma.schoolTeacher.findUnique({
    where: {
      id: offerId,
    },
  });
  if (getOffer?.schoolId !== schoolId) {
    return new Response(
      JSON.stringify({
        message: "You do not have the power to delete this teacher",
      }),
      { status: 400 }
    );
  }
  // now lets delete the offer/student
  try {
    await prisma.schoolTeacher.delete({
      where: {
        id: offerId,
      },
    });
    return new Response(
      JSON.stringify({ message: "teacher offer deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
}

export async function GET(req: Request) {
  const schoolId = await serverSessionId();
  if (!schoolId) return notAuthenticated();
  // proceed to fetch all the teachers that belong to the school
  try {
    const allSchoolStudents = await prisma.schoolTeacher.findMany({
      where: {
        schoolId,
      },
      include: {
        teacher: {
          select: {
            profilePhoto: true,
            name: true,
            phoneNo: true,
            email: true,
            id: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(allSchoolStudents), {
      status: 200,
      statusText: "success",
    });
  } catch (error) {
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
}
