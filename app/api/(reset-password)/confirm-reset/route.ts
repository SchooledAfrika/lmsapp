// here we handle creating a new password for the user
import prisma from "@/prisma/prismaConnect";
import { serverError } from "@/prisma/utils/error";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { jwtstring, password } = await req.json();
  console.log(jwtstring, password);
  const verified = jwt.verify(jwtstring, process.env.NEXT_PUBLIC_JWT!);
  console.log(verified);
  try {
    return new Response(JSON.stringify({ message: "successful" }));
  } catch (error) {
    return serverError();
  }
}
