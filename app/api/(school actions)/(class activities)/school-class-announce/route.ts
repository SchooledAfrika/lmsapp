// in this route, we create annoucement for class
// this accouncement is only for a particular class in our school
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

// here we wil create our class announcement
// and it can only be created by teachers in the class or the owner of the school
export async function POST(req: Request) {
  const annoucementInfo = await req.json();
  const userId = await serverSessionId();
  if (!userId) return notAuthenticated();
  // check if the user that want to make this announcement is a teacher in this class
  // or if is the owner of the school that wants to make this announcement
  // first let's get all the informations about the class first
  const classInfo = await prisma.schoolClass.findUnique({
    where: { id: annoucementInfo.schoolClassId },
    select: {
      schoolId: true,
      SchoolClassTeacher: {
        select: {
          teacherId: true,
        },
      },
    },
  });
  console.log(classInfo);
  //   check the existence of teacher in the class already
  const teachersInClass = classInfo?.SchoolClassTeacher.find(
    (teacher) => teacher.teacherId === userId
  );
  if (!teachersInClass && classInfo?.schoolId !== userId) {
    return new Response(
      JSON.stringify({
        message: "you can't create an announcement in this class!!!",
      }),
      { status: 401 }
    );
  }
  try {
    await prisma.announcementBySchoolClass.create({
      data: { ...annoucementInfo },
    });
    return new Response(
      JSON.stringify({ message: "announcement successfully created" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}

// delete announcement
export async function DELETE(req: Request) {
  const { announceId } = await req.json();
  const userId = await serverSessionId();
  if (!userId) return notAuthenticated();
  // lets check if the user that want to perform this delete action is a teacher or the school its self
  const getClassId = await prisma.announcementBySchoolClass.findUnique({
    where: { id: announceId },
    select: { schoolClassId: true },
  });
  // fetch information about teachers that are in the class
  const getTeachers = await prisma.schoolClass.findUnique({
    where: { id: getClassId?.schoolClassId },
    select: {
      SchoolClassTeacher: {
        select: {
          teacherId: true,
        },
      },
      schoolId: true,
    },
  });
  //   now, we check if the user is the school
  // or if the user is one of the teachers in the school
  // if both of this are false, then we will return with an error
  const checkTeacher = getTeachers?.SchoolClassTeacher.find(
    (teacher) => teacher.teacherId === userId
  );
  if (!checkTeacher || getTeachers?.schoolId !== userId) {
    return new Response(
      JSON.stringify({
        message: "you are not allowed to delete in this class",
      }),
      { status: 401 }
    );
  }
  //   now we can proceed and delete the announcement
  try {
    await prisma.announcementBySchoolClass.delete({
      where: { id: announceId },
    });
    return new Response(
      JSON.stringify({ message: "teacher deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}

// this part gets all the  announcement in a class
export async function GET(req: Request) {
  const url = new URL(req.url);
  const schoolClassId = url.searchParams.get("classId") as string;
  const userId = await serverSessionId();
  if (!userId) return notAuthenticated();

  try {
    const classAnnouncement = await prisma.announcementBySchoolClass.findMany({
      where: {
        schoolClassId,
      },
    });
    return new Response(JSON.stringify(classAnnouncement), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
