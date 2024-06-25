import prisma from "@/prisma/prismaConnect";
import bcrypt from "bcryptjs";

// this route is for loggin in users that registered with email and password

export async function POST(request: Request) {
  const { email, passwordcheck } = await request.json();
  // lets check if the email exist in the database
  // if it does not exist we return an error saying the user does not exist
  const fetchStudent = await prisma.student.findUnique({
    where: { email: email },
    select: {
      id: true,
      password: true,
      name: true,
      role: true,
      email: true,
      CompletedProfile: true,
    },
  });
  const fetchTeacher = await prisma.teacher.findUnique({
    where: { email: email },
    select: {
      id: true,
      password: true,
      name: true,
      role: true,
      email: true,
      CompletedProfile: true,
    },
  });
  const fetchParent = await prisma.parents.findUnique({
    where: { email: email },
    select: {
      id: true,
      password: true,
      name: true,
      role: true,
      email: true,
      CompletedProfile: true,
    },
  });
  const fetchSchool = await prisma.school.findUnique({
    where: { email: email },
    select: {
      id: true,
      password: true,
      name: true,
      role: true,
      email: true,
      CompletedProfile: true,
    },
  });
  // here, we return an error because the user does not exist
  if (!fetchParent && !fetchSchool && !fetchStudent && !fetchTeacher) {
    return new Response(JSON.stringify({ message: "user does not exist" }), {
      status: 404,
      statusText: "Not Found",
    });
  }
  // then, this operation will run if email exist in student
  if (fetchStudent && fetchStudent.password !== null) {
    const { password, ...others } = fetchStudent;
    // lets compare the password and know if it match
    const comparePassword = await bcrypt.compare(
      passwordcheck,
      fetchStudent?.password!
    );
    console.log(comparePassword);
    if (!comparePassword) {
      return new Response(JSON.stringify({ message: "Error in credentials" }), {
        status: 401,
        statusText: "Invalid password",
      });
    }
    return new Response(JSON.stringify(others), {
      status: 200,
      statusText: "success",
    });
  }
  if (fetchTeacher && fetchTeacher.password !== null) {
    const { password, ...others } = fetchTeacher;
    // lets compare the password and know if it match
    const comparePassword = bcrypt.compare(
      passwordcheck,
      fetchTeacher?.password!
    );
    if (!comparePassword) {
      return new Response(JSON.stringify({ message: "password mismatch" }), {
        status: 401,
        statusText: "Invalid password",
      });
    }
    return new Response(JSON.stringify(others), {
      status: 200,
      statusText: "success",
    });
  }
  if (fetchSchool && fetchSchool.password !== null) {
    const { password, ...others } = fetchSchool;
    // lets compare the password and know if it match
    const comparePassword = bcrypt.compare(
      passwordcheck,
      fetchSchool?.password!
    );
    if (!comparePassword) {
      return new Response(JSON.stringify({ message: "password mismatch" }), {
        status: 401,
        statusText: "Invalid password",
      });
    }
    return new Response(JSON.stringify(others), {
      status: 200,
      statusText: "success",
    });
  }
  if (fetchParent && fetchParent.password !== null) {
    const { password, ...others } = fetchParent;
    // lets compare the password and know if it match
    const comparePassword = bcrypt.compare(
      passwordcheck,
      fetchParent?.password!
    );
    if (!comparePassword) {
      return new Response(JSON.stringify({ message: "password mismatch" }), {
        status: 401,
        statusText: "Invalid password",
      });
    }
    return new Response(JSON.stringify(others), {
      status: 200,
      statusText: "success",
    });
  }

  return new Response(JSON.stringify({ message: "invalid login details" }), {
    status: 404,
    statusText: "login errors",
  });
}
