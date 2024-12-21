import {
  modifyParents,
  modifyStudent,
  modifyTeachers,
} from "@/prisma/utils/modify";
import {
  deleteParent,
  deleteStudent,
  deleteTeacher,
} from "@/prisma/utils/delete";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

// here, we will modify the account of the user,
// first by fetching the role of the user
// then modify the account,
// we should also use next auth to get the userId from the backend
// together with the roles also

export async function PUT(req: Request) {
  const { updateData } = await req.json();
  const id = await serverSessionId();
  const role = await serverSessionRole();
  //   checking if the user is authenticated before we continue
  // if not authenticated return an error immediately
  if (!role || !id) {
    return new Response(
      JSON.stringify({
        message: "you are not authenticated, login and try again",
      })
    );
  }
  //   below we now update our database based on the roles passed in the next auth
  try {
    // lets update the student if the role passed was a student role
    if (role === "Student") {
      console.log("entered");
      await modifyStudent(id, updateData);
      return new Response(
        JSON.stringify({ message: "account updated successfully" }),
        { status: 200, statusText: "success" }
      );
    }
    // lets update the student if the role passed was a student role
    if (role === "Teacher") {
      console.log("entered");
      await modifyTeachers(id, updateData);
      return new Response(
        JSON.stringify({ message: "account updated successfully" }),
        { status: 200, statusText: "success" }
      );
    }
    // lets update the student if the role passed was a student role
    if (role === "Parents") {
      await modifyParents(id, updateData);
      return new Response(
        JSON.stringify({ message: "account updated successfully" }),
        { status: 200, statusText: "success" }
      );
    }
    return new Response(
      JSON.stringify({ message: "account modification failed" }),
      { status: 404 }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong try again later");
  }
}

// this is for user that wants to delete their account
export async function DELETE(req: Request) {
  // TODO: change this id below and use next authentication id
  const { id, role } = await req.json();
  if (!id || !role) {
    return new Response(
      JSON.stringify({
        message: "you are not allowed to delete, Login is required",
      }),
      { status: 404, statusText: "You are not allowed to delete" }
    );
  }

  // then lets proceed and delete the user
  try {
    // delete a student if the role is student
    if (role === "student") {
      await deleteStudent(id);
      return new Response(
        JSON.stringify({ message: "delete successfully completed" }),
        { status: 200, statusText: "success" }
      );
    }
    // delete a student if the role is teacher
    if (role === "teacher") {
      await deleteTeacher(id);
      return new Response(
        JSON.stringify({ message: "delete successfully completed" }),
        { status: 200, statusText: "success" }
      );
    }
    // delete a student if the role is parents
    if (role === "parents") {
      await deleteParent(id);
      return new Response(
        JSON.stringify({ message: "delete successfully completed" }),
        { status: 200, statusText: "success" }
      );
    }
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
