// here, we created the route that handles school adding a student
// creating a post request which schools use to add students
// and an update request which students can use to accept the offer or admission from school
import prisma from "@/prisma/prismaConnect";

export async function POST(req: Request) {
  // TODO: change the schoolId here to use the nextauth id
  const { schoolId, studentId } = await req.json();

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

// here, we make use of put request to update the school Student data
// here, is only the student that can modify this status to either pending or cancelled
export async function PUT(req: Request) {
  // TODO: remember to remove this studentId and add nextauth id we passed
  const { status, studentId, offerId } = await req.json();
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
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
}

// incase of expulsion or school wants to delete a student, they can actually delete them here
// only school that created students has the power to delete student
// students don't have the power to delete them selfs
export async function DELETE(req: Request) {
  // TODO: remember to change the schoolId from the body and make use of nextauth id for school
  const { schoolId, offerId } = await req.json();
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
