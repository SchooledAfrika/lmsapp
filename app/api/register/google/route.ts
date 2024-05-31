import { cookies } from "next/headers";
import prisma from "@/prisma/prismaConnect";
// =====> remember to check on upsert which can help to create or update a new user if it does not exist

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

  // first, we check if the role passed is defined or undefined
  // if it is undefined, that means the user actually want to login
  // TODO: the frontend developer has to clear the role cookies before running the login with google auth
  // then, if there is a role, that means the user actually want to register for the first time
  if (role === undefined) {
    console.log("ran here");
    // lets check if the user exist accross all our members database first
    // if is there, return with an error and a message
    const checkStudents = await prisma.student.findUnique({
      where: { email: email },
    });
    // return the student immediately if it exists
    if (checkStudents) {
      return new Response(JSON.stringify(checkStudents), {
        status: 200,
        statusText: "success",
      });
    }
    const checkTeachers = await prisma.teacher.findUnique({
      where: { email: email },
    });
    // return the teacher immediately if it exists
    if (checkTeachers) {
      return new Response(JSON.stringify(checkTeachers), {
        status: 200,
        statusText: "success",
      });
    }
    const checkSchools = await prisma.school.findUnique({
      where: { email: email },
    });
    // return the school immediately if it exists
    if (checkSchools) {
      return new Response(JSON.stringify(checkSchools), {
        status: 200,
        statusText: "success",
      });
    }
    const checkParents = await prisma.parents.findUnique({
      where: { email: email },
    });
    // return the parents immediately if it exists
    if (checkParents) {
      return new Response(JSON.stringify(checkParents), {
        status: 200,
        statusText: "success",
      });
    }
  } else {
    //   here we register the user based on the role passed from the cookies to the backend
    //   making use of conditions based on the users role to register them

    if (role == "student") {
      // register student
      const student = await prisma.student.create({
        data: {
          email: email,
          profilePhoto: img,
          name,
          role: "Student",
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
          role: "Teacher",
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
          role: "Parents",
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
          role: "School",
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
}
