// here we will handle everything about updating the users section;
// we are interested in returning some informations like roles
// this route exist because of our nextauth session, so that we can be able to update our sessions
// then add more parameters to the session
import prisma from "@/prisma/prismaConnect";

export async function POST(req: Request) {
  const { email } = await req.json();
  try {
    console.log(email);
    // here we make query with the database
    // and return its info
    //   first lets check if is student that is logging in
    const checkStudents = await prisma.student.findUnique({
      where: { email: email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profilePhoto: true,
        CompletedProfile: true,
      },
    });
    if (checkStudents)
      return new Response(JSON.stringify(checkStudents), { status: 200 });
    // lets check if is teacher that is logging in
    const checkTeachers = await prisma.teacher.findUnique({
      where: { email: email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profilePhoto: true,
        CompletedProfile: true,
      },
    });
    if (checkTeachers)
      return new Response(JSON.stringify(checkTeachers), { status: 200 });
    // lets check if is school that is logging in
    const checkSchools = await prisma.school.findUnique({
      where: { email: email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profilePhoto: true,
        CompletedProfile: true,
      },
    });
    if (checkSchools)
      return new Response(JSON.stringify(checkSchools), { status: 200 });
    // lets check if is parents that is logging in
    const checKParents = await prisma.parents.findUnique({
      where: { email: email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        profilePhoto: true,
        CompletedProfile: true,
      },
    });
    return new Response(JSON.stringify(checKParents), { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
