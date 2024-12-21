// in this route, we handle creating vacancy adverts
// also updating them
// and deleting them.

import prisma from "@/prisma/prismaConnect";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

// first, lets create the advert
export async function POST(req: Request) {
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  const others = await req.json();
  // first checking if the school is login already
  if (!userId) {
    return new Response(JSON.stringify({ message: "you must login" }), {
      status: 401,
    });
  }
  // if the user is not school, return an error message to the user
  if (role !== "Admin") {
    return new Response(
      JSON.stringify({ message: "illegal path detected!!!" }),
      {
        status: 400,
      }
    );
  }
  // lets proceed to creating the adverts
  try {
    await prisma.vacancy.create({
      data: {
        creatorId: userId,
        ...others,
      },
    });
    return new Response(
      JSON.stringify({ message: "adverts created successfully" }),
      { status: 200 }
    );
  } catch (error) {
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
}

// here we delete the advert
// when deleting advert, we will also delete the associated vancacyTeacher models
// that has the id of the vacancy
export async function DELETE(req: Request) {
  const { vacancyId } = await req.json();
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  // lets check if the user is logged in first
  if (role !== "Admin") {
    return new Response(JSON.stringify({ message: "illegal path!!!" }), {
      status: 401,
    });
  }
  // lets now get the advert and check if the schoolId matches with the one in the advert
  const getVacancy = await prisma.vacancy.findUnique({
    where: {
      id: vacancyId,
    },
    select: {
      creator: true,
    },
  });
  // returning error if the vacancy does not exist
  if (!getVacancy) {
    return new Response(
      JSON.stringify({ message: "this vacancy does not exist" }),
      { status: 401 }
    );
  }

  // now we can delete the advertisement
  // first, we will fetch all the vacancy teacher models associated with this advertisement
  try {
    // checking for the existence of vacancy teacher
    const getVacancyTeacher = await prisma.vacancyTeacher.findMany({
      where: {
        vacancyId,
      },
      select: {
        id: true,
      },
    });

    // creating a forloop to delete all the assocaited vacancy teacher models
    for (const item of getVacancyTeacher) {
      await prisma.vacancyTeacher.delete({
        where: {
          id: item.id,
        },
      });
    }
    // now we can delete the advert
    await prisma.vacancy.delete({
      where: {
        id: vacancyId,
      },
    });
    return new Response(
      JSON.stringify({ message: "advert deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    throw new Error(
      JSON.stringify({
        message: "something went wrong deleting the advertisement",
      })
    );
  }
}

// this is for admin to update the advertisement
export async function PUT(req: Request) {
  const { vacancyId, ...others } = await req.json();
  const role = await serverSessionRole();
  // return error if the user is not logged in
  if (role !== "Admin") {
    return new Response(JSON.stringify({ message: "illegal path!!!" }), {
      status: 400,
    });
  }
  // now we can proceed to update the adverts
  try {
    await prisma.vacancy.update({
      where: {
        id: vacancyId,
      },
      data: {
        ...others,
      },
    });
    return new Response(
      JSON.stringify({ message: "update successfully done" }),
      { status: 200 }
    );
  } catch (error) {
    throw new Error(
      JSON.stringify({ message: "something went wrong, try again" })
    );
  }
}

// here, a school can get there adverts
// here we will replace the query parameter school id we pass to nextauth id
export async function GET(req: Request) {
  const role = await serverSessionRole();
  if (role !== "Admin") {
    return new Response(JSON.stringify({ message: "illegal path!!!" }), {
      status: 404,
    });
  }
  try {
    const schoolAdverts = await prisma.vacancy.findMany({
      include: {
        VacancyTeacher: true,
      },
    });
    return new Response(JSON.stringify(schoolAdverts), { status: 200 });
  } catch (error) {
    throw new Error(JSON.stringify({ message: "somemthing went wrong" }));
  }
}
