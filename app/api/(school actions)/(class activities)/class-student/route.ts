// in this route we perform the activities of adding students to the class
// deleting student from the class
// getting information of a teacher in our class
import prisma from "@/prisma/prismaConnect";

export async function POST(req: Request) {
  // TODO: change the schoolID in the body below to the nextauth id
  const { schoolClassId, schoolId, studentId } = await req.json();
  // before we proceed to other things,
  // lets check if the student we want to add does not have pending offer
  // only students that are active can be added to the class created
  const getSchoolStudent = await prisma.schoolStudent.findFirst({
    where: {
      schoolId,
      studentId,
    },
  });
  if (getSchoolStudent?.status !== "ACTIVE") {
    return new Response(
      JSON.stringify({
        message: "The student you want to add is not yet active",
      }),
      { status: 500 }
    );
  }
  // first, lets check if the school that want to add the teacher to the class is actually
  //   the owners of the class created
  const getClass = await prisma.schoolClass.findUnique({
    where: {
      id: schoolClassId,
    },
    select: {
      schoolId: true,
    },
  });
  // returning an error if the class does not exist maybe a mistake from the frontend
  if (!getClass) {
    return new Response(JSON.stringify({ message: "class does not exist" }), {
      status: 404,
    });
  }
  // checking if the school is actually the one that created the class
  if (getClass?.schoolId !== schoolId) {
    return new Response(
      JSON.stringify({
        message: "you can't add a student to the class you did not create",
      }),
      { status: 400 }
    );
  }
  // now, lets check if the student is already added in the class before
  // return error if the student was added before
  // doing this by fetching the schoolclassstudent and checking if the student and the schoolclassid is a match to the indexing
  const checkTeacherInClass = await prisma.schoolClassStudent.findFirst({
    where: {
      studentId,
      schoolClassId,
    },
  });
  // return a error to the user if the student is already existing in the class database for that school
  if (checkTeacherInClass) {
    return new Response(
      JSON.stringify({ message: "this student already exist in this class" }),
      { status: 404 }
    );
  }

  //   now we can go on and add the student to the class
  try {
    await prisma.schoolClassStudent.create({
      data: {
        studentId,
        schoolClassId,
      },
    });
    return new Response(
      JSON.stringify({ message: "student added to the class successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "something went wrong" }), {
      status: 500,
    });
  }
}

// this function below will act as a delete functionality for students that are already in the class
export async function DELETE(req: Request) {
  const { schoolClassId, schoolId, studentId } = await req.json();
  //// first, lets check if the school that want to add the student to the class is actually
  //   the owners of the class created
  const getClass = await prisma.schoolClass.findUnique({
    where: {
      id: schoolClassId,
    },
    select: {
      schoolId: true,
    },
  });
  if (getClass?.schoolId !== schoolId) {
    return new Response(
      JSON.stringify({
        message: "you can't add a teacher to the class you did not create",
      }),
      { status: 400 }
    );
  }
  //   logic to check if the student is actually existing
  // if teacher is not existing return an error message
  const checkStudentInClass = await prisma.schoolClassStudent.findFirst({
    where: {
      studentId,
      schoolClassId,
    },
    select: {
      id: true,
    },
  });
  if (!checkStudentInClass) {
    return new Response(
      JSON.stringify({ message: "This student does not exist in this class" }),
      { status: 404 }
    );
  }

  //   now we can proceed to delete
  try {
    await prisma.schoolClassStudent.delete({
      where: {
        id: checkStudentInClass.id,
      },
    });
    return new Response(
      JSON.stringify({ message: "Student deleted successfully from class" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "something went wrong" }), {
      status: 500,
    });
  }
}
