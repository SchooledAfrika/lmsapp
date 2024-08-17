// here, we created the route that handles school adding a student
// creating a post request which schools use to add students
// and an update request which students can use to accept the offer or admission from school
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function POST(req: Request) {
  const { studentId } = await req.json();
  const schoolId = await serverSessionId();
  if (!schoolId) return notAuthenticated();
  // return an error if this studentId does not exist
  if (!studentId) {
    return new Response(JSON.stringify({ message: "studentId is needed" }), {
      status: 404,
    });
  }
  // we also check if the teacher was created before by the school
  // we will return an error message showing that the teacher can not be created twice
  const checkStudentExistence = await prisma.schoolStudent.findFirst({
    where: {
      schoolId,
      studentId,
    },
    select: {
      id: true,
    },
  });
  if (checkStudentExistence) {
    return new Response(JSON.stringify({ message: "Student already exists" }), {
      status: 404,
    });
  }
  // we can now create the school student below
  // once this is created the students are automatically pending
  try {
    await prisma.schoolStudent.create({
      data: {
        schoolId: schoolId,
        studentId: studentId,
      },
    });
    return new Response(
      JSON.stringify({ message: "Student created successfully" }),
      { status: 200 }
    );
  } catch (error) {
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
}

// incase of expulsion or school wants to delete a student, they can actually delete them here
// only school that created students has the power to delete student
// students don't have the power to delete them selfs
export async function DELETE(req: Request) {
  const { offerId } = await req.json();
  const schoolId = await serverSessionId();
  if (!offerId) {
    return new Response(JSON.stringify({ message: "all input is needed" }), {
      status: 404,
    });
  }
  // lets first fetch the offer then compare if it is actually the school that created them
  // if it is not, we return an error
  // else we will proceed
  const getOffer = await prisma.schoolStudent.findUnique({
    where: {
      id: offerId,
    },
  });
  if (getOffer?.schoolId !== schoolId) {
    return new Response(
      JSON.stringify({
        message: "You do not have the power to delete this student",
      }),
      { status: 400 }
    );
  }
  // now lets delete the offer/student
  try {
    await prisma.schoolStudent.delete({
      where: {
        id: offerId,
      },
    });
    return new Response(
      JSON.stringify({ message: "student offer deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
}

// this route returns all the student created by the school
export async function GET(req: Request) {
  const schoolId = await serverSessionId();
  if (!schoolId) return notAuthenticated();
  // proceed to fetch all the students that belong to the school
  try {
    const allSchoolStudents = await prisma.schoolStudent.findMany({
      where: {
        schoolId,
      },
      include: {
        student: {
          select: {
            name: true,
            profilePhoto: true,
            phoneNo: true,
            email: true,
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
