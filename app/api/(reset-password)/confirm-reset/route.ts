// here we handle creating a new password for the user
import prisma from "@/prisma/prismaConnect";
import { serverError } from "@/prisma/utils/error";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { jwtstring, password } = await req.json();
  const hashedpassword = bcrypt.hashSync(password, 10);
  const modifyInfos: { email?: string; account?: string } = {};
  // here we check the jwt and verify that it has not expired already
  jwt.verify(
    jwtstring,
    process.env.NEXT_PUBLIC_JWT!,
    (error: any, info: any) => {
      if (error) {
        return new Response(
          JSON.stringify({ message: "reset password link expired" }),
          { status: 400 }
        );
      }
      modifyInfos.email = info.email;
      modifyInfos.account = info.account;
    }
  );

  try {
    // here we will proceed to modify if the account is for student
    if (modifyInfos.account === "student") {
      console.log("entered");
      await prisma.student.update({
        where: { email: modifyInfos.email },
        data: {
          password: hashedpassword,
        },
      });
      return new Response(
        JSON.stringify({ message: "password updated successfully" }),
        { status: 200 }
      );
    }
    // here we will proceed to modify if the account is for parents
    if (modifyInfos.account === "parents") {
      await prisma.parents.update({
        where: { email: modifyInfos.email },
        data: {
          password: hashedpassword,
        },
      });
      return new Response(
        JSON.stringify({ message: "password updated successfully" }),
        { status: 200 }
      );
    }
    // we change password below if it is a teacher account
    if (modifyInfos.account === "teacher") {
      await prisma.teacher.update({
        where: { email: modifyInfos.email },
        data: {
          password: hashedpassword,
        },
      });
      return new Response(
        JSON.stringify({ message: "password updated successfully" }),
        { status: 200 }
      );
    }
    return new Response(JSON.stringify({ message: "user account not found" }), {
      status: 404,
    });
  } catch (error) {
    return serverError();
  }
}
