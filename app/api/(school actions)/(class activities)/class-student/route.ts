// in this route we perform the activities of adding students to the class
// deleting student from the class
// getting information of a teacher in our class
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function POST(req: Request) {
  const schoolId = await serverSessionId();
  const { schoolClassId, studentIds } = await req.json();
  // first, lets check if the school that want to add the teacher to the class is actually
  //   the owners of the class created
  const getClass = await prisma.schoolClass.findUnique({
    where: {
      id: schoolClassId,
    },
    select: {
      schoolId: true,
      name: true,
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

  //   now we can go on and add the student to the class
  try {
    for (let studentId of studentIds) {
      // now we can proceed to create or update the schoolclassstudent
      await prisma.schoolClassStudent.upsert({
        where: { id: studentId },
        create: {
          schoolClassId,
          studentId,
        },
        update: {
          studentId,
        },
      });
      // now, lets get the school student with this id
      // add the class name if is not already existing in the database
      const schoolStudent = await prisma.schoolStudent.findFirst({
        where: {
          studentId,
          schoolId,
        },
        select: {
          id: true,
          classes: true,
        },
      });
      const classes = schoolStudent?.classes;
      const alreadyExist = classes?.find((item) => item === getClass.name);
      if (!alreadyExist) {
        classes?.push(getClass.name);
      }
      // now we can finally update the schoolStudent database
      await prisma.schoolStudent.update({
        where: { id: schoolStudent?.id },
        data: {
          classes,
        },
      });
    }
    return new Response(
      JSON.stringify({ message: "student added successfully to class" })
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

export async function GET(req: Request) {
  const schoolId = await serverSessionId();
  const role = await serverSessionRole();

  if (!schoolId) return notAuthenticated();
  if (role !== "School") {
    return new Response(
      JSON.stringify({ message: "only schools can perform this action" })
    );
  }
  try {
    // now we will get all the school students with the active status
    const schoolStudents = await prisma.schoolStudent.findMany({
      where: { schoolId, status: "ACTIVE" },
      select: {
        createdAt: true,
        student: {
          select: {
            name: true,
            email: true,
            profilePhoto: true,
            id: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(schoolStudents), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
