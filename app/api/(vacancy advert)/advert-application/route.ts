// so, this route handles everything about the teacher applying to a particular vacancy
// school can accept, or reject the application using an update method
// the teacher which is the applicant can delete the his application to this school

import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
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

// here, we will update the vacancy teacher model
// only the school that avertised this is allow th update it
export async function PUT(req: Request) {
  const { vacancyTeacherId, status } = await req.json();
  const schoolId = await serverSessionId();
  if (schoolId) {
    return notAuthenticated();
  }
  // first lets fetch the vacancy teacher we have, then check if schoolId matches
  // first fetching the info that will help us connect to the schoolid which is the vacancy
  const getVacancyTeacher = await prisma.vacancyTeacher.findUnique({
    where: {
      id: vacancyTeacherId,
    },
    select: {
      vacancyId: true,
    },
  });
  if (!getVacancyTeacher) {
    return new Response(
      JSON.stringify({ message: "this application does not exist" })
    );
  }
  const getVacancy = await prisma.vacancy.findUnique({
    where: {
      id: getVacancyTeacher.vacancyId,
    },
    select: {
      schoolId: true,
    },
  });
  //   now, we can check if is the school that has that offer
  if (getVacancy?.schoolId !== schoolId) {
    return new Response(
      JSON.stringify({ message: "you can't update this application" }),
      { status: 400 }
    );
  }
  // we can now proceed to modify the application
  try {
    // modify the status of the application
    const updatedApplication = await prisma.vacancyTeacher.update({
      where: {
        id: vacancyTeacherId,
      },
      data: {
        status,
      },
    });
    // then add  the teacher to the teacher list of the school if the status is accepted
    if (status === "ACCEPTED") {
      // checking if the teacher is already existing as the school teacher
      const checkExistence = await prisma.schoolTeacher.findFirst({
        where: {
          teacherId: updatedApplication.teacherId,
          schoolId,
        },
      });
      if (checkExistence) {
        return new Response(
          JSON.stringify({ message: "this teacher already exist" })
        );
      }
      // proceed to add the teacher to the school
      await prisma.schoolTeacher.create({
        data: {
          schoolId: schoolId!,
          teacherId: updatedApplication.teacherId,
          status: "ACTIVE",
        },
      });
    }
    return new Response(
      JSON.stringify({ message: `applicant is now ${status}...` })
    );
  } catch (error) {
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
}

// below here, the teacher can decide to delete the application they already made
export async function DELETE(req: Request) {
  // TODO: remember to change this teacher Id to nextauth id
  const { teacherId, vacancyTeacherId } = await req.json();
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
        school: true,
      },
    });
    return new Response(JSON.stringify(jobAdverts), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
