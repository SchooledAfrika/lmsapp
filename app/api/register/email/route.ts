import { cookies } from "next/headers";
import prisma from "@/prisma/prismaConnect";
import bcrypt from "bcryptjs";
import { serverError } from "@/prisma/utils/error";
import { generateId } from "@/prisma/utils/utils";

// here, we create a new user with their email
// making use of post request
// we will get the roles of this new user that want to register using the cookies
// we will check if there is any user with the email that is exist through both students, teachers, schools and parents model
// if any exist we will not register them
// else we will register them and redirect to the login page

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const role = cookies().get("role")?.value;
  const hashPasword = bcrypt.hashSync(password, 12);

  // lets check if the user exist accross all our members database first
  // if is there, return with an error and a message
  const checkStudents = await prisma.student.findUnique({
    where: { email: email },
  });
  const checkTeachers = await prisma.teacher.findUnique({
    where: { email: email },
  });
  const checKParents = await prisma.parents.findUnique({
    where: { email: email },
  });
  //   returning an error if the user does not exist accross the database
  if (checkStudents || checkTeachers || checKParents) {
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
  try {
    //   here we register the user based on the role passed from the cookies to the backend
    //   making use of conditions based on the users role to register them
    if (role == "Student") {
      // register student
      const student = await prisma.student.create({
        data: {
          email: email,
          password: hashPasword,
          role: "Student",
          studentId: generateId(),
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
    if (role == "Teacher") {
      // register student
      const student = await prisma.teacher.create({
        data: {
          email: email,
          password: hashPasword,
          role: "Teacher",
        },
        select: {
          id: true,
          email: true,
        },
      });
      // return info of the student register
      return new Response(JSON.stringify(student), {
        status: 200,
        statusText: "teacher registered successfully",
      });
    }
    if (role == "Parents") {
      // register student
      const student = await prisma.parents.create({
        data: {
          email: email,
          password: hashPasword,
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
        statusText: "guardian or parent registered successfully",
      });
    }
    // returning a final final action incase if their is error
    return new Response(JSON.stringify({ message: "something went wrong" }), {
      status: 400,
    });
  } catch (error) {
    return serverError();
  }
}
