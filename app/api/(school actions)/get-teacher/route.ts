// This route we will get all the teachers
// that school added to their platform
// weather pending, active or cancelled

import prisma from "@/prisma/prismaConnect";

export async function GET(req: Request) {
  // TODO: change this school id gotten from query params
  // and use the id from nextauth
  const params = new URL(req.url);
  const schoolId = params.searchParams.get("schoolId");

  // here we return an error if the id does not exist
  if (!schoolId) {
    return new Response(JSON.stringify({ message: "school id not found" }), {
      status: 404,
    });
  }
  // proceed to fetch all the teachers that belong to the school
  try {
    const allSchoolTeachers = await prisma.schoolTeacher.findMany({
      where: {
        schoolId,
      },
    });
    return new Response(JSON.stringify(allSchoolTeachers), {
      status: 200,
      statusText: "success",
    });
  } catch (error) {
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
}
