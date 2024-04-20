import { cookies } from "next/headers";
import prisma from "@/prisma/prismaConnect";

// here, we create a new user with their google account credentials
// making use of post request
// we will get the roles of this new user that want to register using the cookies
// we will check if there is any user with the email that is exist through both students, teachers, schools and parents model
// if any exist we will not register them
// else we will register them and redirect to the login page

export async function POST(request: Request) {
  const { email, img, name } = await request.json();
  const cookieInstance = cookies();
  const role = cookieInstance.get("role")?.value;

  // lets check if the user exist accross all our members database first
  // if is there, return with an error and a message
  const checkStudents = await prisma.student.findUnique({
    where: { email: email },
  });
  const checkTeachers = await prisma.teacher.findUnique({
    where: { email: email },
  });
  const checkSchools = await prisma.school.findUnique({
    where: { email: email },
  });
  const checKParents = await prisma.parents.findUnique({
    where: { email: email },
  });
  //   checking if there is a matching email across the database
  //   return an error if teacher actually exist
  if (checkStudents || checkTeachers || checkSchools || checKParents) {
    return new Response(
      JSON.stringify({ message: "this user already exists, please login" }),
      { status: 404, statusText: "email already exist" }
    );
  }
  // lets check if the user passed their role,
  // if role is undefined, we return an error to the user
  if (role === undefined) {
    return new Response(JSON.stringify({ message: "you must select a role" }), {
      status: 404,
      statusText: "roles not defined",
    });
  }
  //   here we register the user based on the role passed from the cookies to the backend
  //   making use of conditions based on the users role to register them
  if (role == "student") {
    // register student
    const student = await prisma.student.create({
      data: {
        email: email,
        profilePhoto: img,
        name,
      },
      select: {
        id: true,
        email: true,
      },
    });
    // return info of the student register
    return new Response(JSON.stringify(student), {
      status: 200,
      statusText: "student registered successfully",
    });
  }
  //   here, we register them as teacher if the role says teachers
  if (role == "teacher") {
    // register student
    const student = await prisma.teacher.create({
      data: {
        email: email,
        profilePhoto: img,
        role: "EXTERNAL",
        name,
      },
      select: {
        id: true,
        email: true,
      },
    });
    // return info of the student register
    return new Response(JSON.stringify(student), {
      status: 200,
      statusText: "student registered successfully",
    });
  }
  if (role == "parents") {
    // register student
    const student = await prisma.parents.create({
      data: {
        email: email,
        profilePhoto: img,
        name,
      },
      select: {
        id: true,
        email: true,
      },
    });
    // return info of the student register
    return new Response(JSON.stringify(student), {
      status: 200,
      statusText: "student registered successfully",
    });
  }
  if (role == "school") {
    // register student
    const student = await prisma.school.create({
      data: {
        email: email,
        profilePhoto: img,
        name,
      },
      select: {
        id: true,
        email: true,
      },
    });
    // return info of the student register
    return new Response(JSON.stringify(student), {
      status: 200,
      statusText: "student registered successfully",
    });
  }
}
