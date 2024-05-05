// in this route we perform the activities of adding teachers to the class
// deleting teacher from the class
// getting information of a teacher in our class
import prisma from "@/prisma/prismaConnect";

export async function POST(req: Request) {
  // TODO: change the schoolID in the body below to the nextauth id
  const { schoolClassId, schoolId, teacherId } = await req.json();
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
  if (getClass?.schoolId !== schoolId) {
    return new Response(
      JSON.stringify({
        message: "you can't add a teacher to the class you did not create",
      }),
      { status: 400 }
    );
  }
  //   now, lets check if the teacher is already added in the class before
  // return error if the teacher was added before
  // doing this by fetching the schoolclassteacher and checking if the teacher and the schoolclassid is a match to the indexing
  const checkTeacherInClass = await prisma.schoolClassTeacher.findFirst({
    where: {
      teacherId,
      schoolClassId,
    },
  });
  if (checkTeacherInClass) {
    return new Response(
      JSON.stringify({ message: "this teacher already exist in this class" }),
      { status: 404 }
    );
  }

  //   now we can go on and add the teacher to the class
  try {
    await prisma.schoolClassTeacher.create({
      data: {
        teacherId,
        schoolClassId,
      },
    });
    return new Response(
      JSON.stringify({ message: "teacher added to the class successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "something went wrong" }), {
      status: 500,
    });
  }
}

// this function below will act as a delete functionality for teachers that are already in the class
export async function DELETE(req: Request) {
  const { schoolClassId, schoolId, teacherId } = await req.json();
  //// first, lets check if the school that want to add the teacher to the class is actually
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
  //   logic to check if the teacher is actually existing
  // if teacher is not existing return an error message
  const checkTeacherInClass = await prisma.schoolClassTeacher.findFirst({
    where: {
      teacherId,
      schoolClassId,
    },
    select: {
      id: true,
    },
  });
  if (!checkTeacherInClass) {
    return new Response(
      JSON.stringify({ message: "This teacher does not exist in this class" }),
      { status: 404 }
    );
  }

  //   now we can proceed to delete
  try {
    await prisma.schoolClassTeacher.delete({
      where: {
        id: checkTeacherInClass.id,
      },
    });
    return new Response(
      JSON.stringify({ message: "teacher deleted successfully from class" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "something went wrong" }), {
      status: 500,
    });
  }
}
