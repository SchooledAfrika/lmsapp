// here we can create classes for school
// using our post request
// then later we can modify the or update the class when we want to add students or teachers to the platform
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

// lets create class
export async function POST(req: Request) {
  const others = await req.json();
  const schoolId = await serverSessionId();
  const role = await serverSessionRole();
  if (!schoolId) return notAuthenticated();
  if (role !== "School")
    return new Response(
      JSON.stringify({ message: "only schools can create this class" })
    );
  if (!others) {
    return new Response(JSON.stringify({ message: "inputs needed" }), {
      status: 400,
    });
  }
  // proceed to create
  try {
    await prisma.schoolClass.create({
      data: {
        ...others,
        schoolId,
      },
    });
    return new Response(
      JSON.stringify({ message: "class created successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response("something went wrong", { status: 500 });
  }
}

// here, lets update the class
// this is done when the school management want to update the class information
export async function PUT(req: Request) {
  const { classId, ...others } = await req.json();
  const schoolId = await serverSessionId();
  if (!classId) {
    return new Response(
      JSON.stringify({ message: "class id is missing here" }),
      { status: 400 }
    );
  }
  // here, let's fetch the class and compare if is actually the school that wants to modify it
  const getClass = await prisma.schoolClass.findUnique({
    where: {
      id: classId,
    },
  });
  // lets return an error if the class does not exist first
  if (!getClass) {
    return new Response(JSON.stringify({ message: "Class does not exist" }), {
      status: 400,
    });
  }
  // check if is the school that actually created the class they want to modify
  if (getClass?.schoolId !== schoolId) {
    return new Response(
      JSON.stringify({
        message: "you can only update the class your school created",
      }),
      { status: 404 }
    );
  }
  // proceed to update the class here
  try {
    await prisma.schoolClass.update({
      where: {
        id: classId,
      },
      data: {
        ...others,
      },
    });
    return new Response(
      JSON.stringify({ message: "class has been updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response("something went wrong", { status: 500 });
  }
}

// here, school will be able to delete a class
// when the class is deleted, teachers and students associated with the class account should be removed
// this is so that the students or teacher will not be seeing this classes
export async function DELETE(req: Request) {
  // TODO: REPLACE THE SCHOOLID WITH THE ID FROM NEXTAUTH
  const { classId } = await req.json();
  const schoolId = await serverSessionId();
  if (!classId) {
    return new Response(JSON.stringify({ message: "classId is required" }), {
      status: 404,
    });
  }
  // here, let's fetch the class and compare if is actually the school that wants to modify it
  const getClass = await prisma.schoolClass.findUnique({
    where: {
      id: classId,
    },
    include: {
      SchoolClassStudent: true,
      SchoolClassTeacher: true,
    },
  });
  //   if the class does not exist, return an error
  if (!getClass) {
    return new Response(JSON.stringify({ message: "class not found" }), {
      status: 404,
    });
  }
  if (getClass?.schoolId !== schoolId) {
    return new Response(
      JSON.stringify({
        message: "you can only delete the class your school created",
      }),
      { status: 404 }
    );
  }
  //   now, lets try deleting the class, teacher and student
  try {
    // first delete all the student associated with the class
    for (const student of getClass.SchoolClassStudent) {
      await prisma.schoolClassStudent.delete({ where: { id: student.id } });
    }
    // lets now delete all the teachers associated with the class
    for (const teacher of getClass.SchoolClassTeacher) {
      await prisma.schoolClassTeacher.delete({ where: { id: teacher.id } });
    }
    // now we can delete the class itself
    await prisma.schoolClass.delete({ where: { id: classId } });
    return new Response(
      JSON.stringify({ message: "class deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "something went wrong" }), {
      status: 500,
    });
  }
}

// this is for getting all the classes that belongs to a particular school,
export async function GET() {
  const schoolId = await serverSessionId();
  if (!schoolId) return notAuthenticated();
  try {
    const gottenClasses = await prisma.schoolClass.findMany({
      where: {
        schoolId,
      },
      include: {
        SchoolClassStudent: {
          select: {
            student: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
        SchoolClassTeacher: {
          select: {
            teacher: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
        AnnouncementBySchoolClass: true,
      },
    });
    return new Response(JSON.stringify(gottenClasses), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
