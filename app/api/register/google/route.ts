import { cookies } from "next/headers";
import prisma from "@/prisma/prismaConnect";
import { serverError } from "@/prisma/utils/error";
import { generateId } from "@/prisma/utils/utils";
// =====> remember to check on upsert which can help to create or update a new user if it does not exist

// here, we create a new user with their google account credentials
// making use of post request
// we will get the roles of this new user that want to register using the cookies
// we will check if there is any user with the email that is exist through both students, teachers, schools and parents model
// if any exist we will not register them
// else we will register them and redirect to the login page

export async function POST(request: Request) {
  const { email, image, name } = await request.json();
  const role = request.headers.get("role");
  console.log(`backend role = ${role}`);
  try {
    // first, we check if the role passed is defined or undefined
    // if it is undefined, that means the user actually want to login
    // TODO: the frontend developer has to clear the role cookies before running the login with google auth
    // then, if there is a role, that means the user actually want to register for the first time
    if (role === undefined) {
      // lets check if the user exist accross all our members database first
      // if is there, return with an error and a message
      const checkStudents = await prisma.student.findUnique({
        where: { email: email },
        select: {
          id: true,
          email: true,
          profilePhoto: true,
          role: true,
          CompletedProfile: true,
        },
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
        select: {
          id: true,
          email: true,
          profilePhoto: true,
          role: true,
          CompletedProfile: true,
        },
      });
      // return the teacher immediately if it exists
      if (checkTeachers) {
        return new Response(JSON.stringify(checkTeachers), {
          status: 200,
          statusText: "success",
        });
      }
      const checkParents = await prisma.parents.findUnique({
        where: { email: email },
        select: {
          id: true,
          email: true,
          profilePhoto: true,
          role: true,
          CompletedProfile: true,
        },
      });
      // return the parents immediately if it exists
      if (checkParents) {
        return new Response(JSON.stringify(checkParents), {
          status: 200,
          statusText: "success",
        });
      }
      return new Response(JSON.stringify({ message: "go to register page" }), {
        status: 404,
      });
    } else {
      //   here we register the user based on the role passed from the cookies to the backend
      //   making use of conditions based on the users role to register them
      //
      // here we handle checking if the user want to re-register with google account mistakenly
      if (role == "Student") {
        console.log("entered here");
        const checkStudents = await prisma.student.findUnique({
          where: { email: email },
          select: {
            id: true,
            email: true,
            profilePhoto: true,
            role: true,
            CompletedProfile: true,
          },
        });
        if (checkStudents) {
          return new Response(JSON.stringify(checkStudents), { status: 200 });
        } else {
          // register student
          const student = await prisma.student.create({
            data: {
              email: email,
              profilePhoto: image,
              name,
              role: "Student",
              studentId: generateId(),
            },
            select: {
              id: true,
              email: true,
              profilePhoto: true,
              role: true,
              CompletedProfile: true,
            },
          });
          // return info of the student register
          return new Response(JSON.stringify(student), {
            status: 200,
            statusText: "registered successfully",
          });
        }
      }

      //   here, we register them as teacher if the role says teachers
      //
      // here we check if the teacher mistakenly want to re-register
      if (role == "Teacher") {
        console.log("entered here");
        const checkTeacher = await prisma.teacher.findUnique({
          where: { email: email },
          select: {
            id: true,
            email: true,
            profilePhoto: true,
            role: true,
            CompletedProfile: true,
          },
        });
        if (checkTeacher) {
          return new Response(JSON.stringify(checkTeacher), { status: 200 });
        } else {
          // register student
          const teacher = await prisma.teacher.create({
            data: {
              email: email,
              profilePhoto: image,
              role: "Teacher",
              name,
            },
            select: {
              id: true,
              email: true,
              profilePhoto: true,
              role: true,
              CompletedProfile: true,
            },
          });
          // return info of the student register
          return new Response(JSON.stringify(teacher), {
            status: 200,
            statusText: "registered successfully",
          });
        }
      }
      // here we also check if the parent also want to mistakenly re-register
      if (role == "Parents") {
        const checkParents = await prisma.parents.findUnique({
          where: { email: email },
          select: {
            id: true,
            email: true,
            profilePhoto: true,
            role: true,
            CompletedProfile: true,
          },
        });
        if (checkParents) {
          return new Response(JSON.stringify(checkParents), { status: 200 });
        } else {
          // register student
          const parents = await prisma.parents.create({
            data: {
              email: email,
              profilePhoto: image,
              name,
              role: "Parents",
            },
            select: {
              id: true,
              email: true,
              profilePhoto: true,
              role: true,
              CompletedProfile: true,
            },
          });
          // return info of the student register
          return new Response(JSON.stringify(parents), {
            status: 200,
            statusText: "registered successfully",
          });
        }
      }
    }
    return new Response(
      JSON.stringify({ message: "user registration error" }),
      { status: 400 }
    );
  } catch (error) {
    return serverError();
  }
}
