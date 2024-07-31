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
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

// running the password update method below
export async function PUT(req: Request) {
  const { oldPassword, newPassword } = await req.json();
  const id = await serverSessionId();
  const role = await serverSessionRole();
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
      const result = await studentPasswordUpdate(
        id as string,
        oldPassword,
        newPassword
      );
      return result;
    }
    // check if is teacher that want to change password
    if (role === "Teacher") {
      const result = await teacherPasswordUpdate(
        id as string,
        oldPassword,
        newPassword
      );
      return result;
    }
    // check if is student that want to change password
    if (role === "School") {
      const result = await schoolPasswordUpdate(
        id as string,
        oldPassword,
        newPassword
      );
      return result;
    }
    // check if is student that want to change password
    if (role === "Parents") {
      const result = await parentsPasswordUpdate(
        id as string,
        oldPassword,
        newPassword
      );
      return result;
    }
  } catch (error) {
    throw new Error("Error updating");
  }
}
