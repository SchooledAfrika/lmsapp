// here we change password of the user
// that is for those that registered with password initialy
import prisma from "@/prisma/prismaConnect";
import bcrypt from "bcryptjs";
import {
  studentPasswordUpdate,
  parentsPasswordUpdate,
  teacherPasswordUpdate,
  schoolPasswordUpdate,
} from "@/prisma/utils/modify";

// running the password update method below
export async function PUT(req: Request) {
  // TODO: remove both the id and role in the body below and
  // use next auth to get those values
  const { oldPassword, newPassword, id, role } = await req.json();
  //   return an error if the user does not pass the required fields
  if (!oldPassword || !newPassword) {
    return new Response(
      JSON.stringify({ message: "both password and old password is required" }),
      { status: 404, statusText: "fields are required" }
    );
  }
  //   now we perform the logics involved in changing the password
  try {
    // check if is student that want to change password
    if (role === "Student") {
      const result = await studentPasswordUpdate(id, oldPassword, newPassword);
      return result;
    }
    // check if is teacher that want to change password
    if (role === "Teacher") {
      const result = await teacherPasswordUpdate(id, oldPassword, newPassword);
      return result;
    }
    // check if is student that want to change password
    if (role === "School") {
      const result = await schoolPasswordUpdate(id, oldPassword, newPassword);
      return result;
    }
    // check if is student that want to change password
    if (role === "Parents") {
      const result = await parentsPasswordUpdate(id, oldPassword, newPassword);
      return result;
    }
  } catch (error) {
    throw new Error("Error updating");
  }
}
