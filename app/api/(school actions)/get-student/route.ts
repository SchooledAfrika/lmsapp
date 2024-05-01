// This route we will get all the students
// that school added to their platform
// weather pending, active or cancelled

import prisma from "@/prisma/prismaConnect";

export async function GET(req: Request) {
  // TODO: change this school id gotten from query params
  // and use the id from nextauth
  const params = new URL(req.url);
  const studentId = params.searchParams.get("studentId");
  // here we return an error if the id does not exists
  if (!studentId) {
    return new Response(JSON.stringify({ message: "school id not found" }), {
      status: 404,
    });
  }
  // proceed to fetch all the students that belong to the school
  try {
    const allSchoolStudents = await prisma.schoolStudent.findMany({
      where: {
        studentId,
      },
    });
    return new Response(JSON.stringify(allSchoolStudents), {
      status: 200,
      statusText: "success",
    });
  } catch (error) {
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
}
