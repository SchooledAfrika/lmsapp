// here we will handle teacher creating a particular accouncement below
// teacher should be able to create, update and delete their announcements
import prisma from "@/prisma/prismaConnect";
import {
  notAuthenticated,
  onlyTeacher,
  serverError,
} from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

// creating the accouncement below here
export async function POST(req: Request) {
  const { desc, title, classId } = await req.json();
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  if (!userId) return notAuthenticated();
  if (role !== "Teacher") return onlyTeacher();
  if (!desc || !title) {
    return new Response(
      JSON.stringify({ message: "please provide all the neccessary fields" }),
      { status: 404 }
    );
  }
  //   lets get the class based on the id passed
  // and check if is the owner of the class that is creating the announcement
  const theClass = await prisma.classes.findUnique({
    where: { id: classId },
    select: {
      teacher: {
        select: {
          id: true,
        },
      },
    },
  });
  if (theClass?.teacher.id !== userId)
    return new Response(
      JSON.stringify({ message: "You can only announce in your class" }),
      { status: 400 }
    );
  try {
    // proceed and make announcements
    await prisma.announcementByTeacherClass.create({
      data: {
        title,
        desc,
        classesId: classId,
      },
    });
    return new Response(
      JSON.stringify({ message: "Announcement created successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}

// here, we will handle deleting a particular announcement here
export async function DELETE(req: Request) {
  const { id } = await req.json();
  const userId = await serverSessionId();
  if (!userId) return notAuthenticated();
  if (!id) {
    return new Response(
      JSON.stringify({ message: "please select an announcement" }),
      { status: 404 }
    );
  }
  // now, lets get the class associated with this accouncent
  // then connect it to the teacher that is linked to it
  const announcementInfo = await prisma.announcementByTeacherClass.findUnique({
    where: { id },
    select: {
      class: {
        select: {
          teacher: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });
  if (announcementInfo?.class.teacher.id !== userId) {
    return new Response(JSON.stringify({ message: "illegal parameter" }), {
      status: 404,
    });
  }
  try {
    await prisma.announcementByTeacherClass.delete({
      where: {
        id,
      },
    });
    return new Response(
      JSON.stringify({ message: "announcement has been deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}

// here, teacher can update a particular accouncement
export async function PUT(req: Request) {
  const { id, ...others } = await req.json();
  const userId = await serverSessionId();
  if (!userId) return notAuthenticated();
  // lets check if this announcement actually exists first
  const isAnnouncementExists =
    await prisma.announcementByTeacherClass.findUnique({
      where: { id },
      select: {
        class: {
          select: {
            teacher: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
  if (!isAnnouncementExists)
    return new Response(JSON.stringify({ message: "announcement not found" }), {
      status: 404,
    });
  if (isAnnouncementExists.class.teacher.id !== userId) {
    return new Response(JSON.stringify({ message: "illegal parameter" }), {
      status: 404,
    });
  }
  try {
    await prisma.announcementByTeacherClass.update({
      where: {
        id,
      },
      data: {
        ...others,
      },
    });
    return new Response(
      JSON.stringify({ message: "announcement updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}
