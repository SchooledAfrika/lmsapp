// so, this route handles everything about the teacher applying to a particular vacancy
// school can accept, or reject the application using an update method
// the teacher which is the applicant can delete the his application to this school

import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

// teacher apply here to an advertisement
export async function POST(req: Request) {
  const { vacancyId } = await req.json();
  const teacherId = await serverSessionId();
  if (!teacherId) {
    return new Response(
      JSON.stringify({ message: "you are not authenticated" }),
      { status: 400 }
    );
  }
  // lets proceed to check if the teacher as already applied for this vacancy
  // if it exist then we return an error
  const checkApplication = await prisma.vacancyTeacher.findFirst({
    where: {
      teacherId,
      vacancyId,
    },
  });
  if (checkApplication) {
    return new Response(
      JSON.stringify({ message: "you have already applied for this vacancy" }),
      { status: 400 }
    );
  }

  // now we can apply
  try {
    await prisma.vacancyTeacher.create({
      data: {
        vacancyId,
        teacherId,
      },
    });
    return new Response(
      JSON.stringify({
        message: "you have successfully applied for this advert",
      }),
      { status: 200 }
    );
  } catch (error) {
    throw new Error(
      JSON.stringify({ message: "something went wrong, try again later" })
    );
  }
}

// here, the admin will be able to make a teacher an in house member
// based on the application submitted for their vacancy adverts
export async function PUT(req: Request) {
  const { vacancyTeacherId, status } = await req.json();
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  // check for authentication proper
  if (!userId) {
    return notAuthenticated();
  }
  if (role !== "Admin") {
    return onlyAdmin();
  }
  // here, we can make the teacher an in house teacher
  const getTeacher = await prisma.vacancyTeacher.findUnique({
    where: {
      id: vacancyTeacherId,
    },
    select: {
      teacherId: true,
    },
  });
  try {
    // now, lets make someone an internal teacher after applying now
    if (status === "ACCEPTED") {
      await prisma.teacher.update({
        where: {
          id: getTeacher?.teacherId,
        },
        data: {
          teachingRole: "INTERNAL",
        },
      });
    } else {
      await prisma.teacher.update({
        where: {
          id: getTeacher?.teacherId,
        },
        data: {
          teachingRole: "EXTERNAL",
        },
      });
    }
    // now, let's change the status of vacancy teacher from pending to accepted or rejected
    await prisma.vacancyTeacher.update({
      where: { id: vacancyTeacherId },
      data: {
        status,
      },
    });

    return new Response(
      JSON.stringify({ message: `applicant successfully ${status}` })
    );
  } catch (error) {
    return serverError();
  }
}

// below here, the teacher can decide to delete the application they already made
export async function DELETE(req: Request) {
  // TODO: remember to change this teacher Id to nextauth id
  const { vacancyTeacherId } = await req.json();
  const teacherId = await serverSessionId();
  // first, lets get the vacancyTeacher and check if the teacherId matches
  const getVacancyTeacher = await prisma.vacancyTeacher.findUnique({
    where: {
      id: vacancyTeacherId,
    },
    select: {
      teacherId: true,
    },
  });
  if (getVacancyTeacher?.teacherId !== teacherId) {
    return new Response(
      JSON.stringify({ message: "you can only delete your application" }),
      { status: 404 }
    );
  }
  // now we proceed to delete the application
  try {
    await prisma.vacancyTeacher.delete({
      where: {
        id: vacancyTeacherId,
      },
    });
    return new Response(JSON.stringify({ message: "deleted successfully" }), {
      status: 200,
    });
  } catch (error) {
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const page = url.searchParams.get("page");
  // get the lower border for slice
  const Start = Number(page) - 1;
  const skipAmt = Start * 20;
  const takeAmt = 20;

  // now we can go ahead and get the job adverts
  // by returning only 20 at a time
  try {
    const jobAdverts = await prisma.vacancy.findMany({
      skip: skipAmt,
      take: takeAmt,
      include: {
        VacancyTeacher: {
          select: {
            teacherId: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(jobAdverts), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
