// in this endpoint, we should be able to add more wards to a particular parents
// also get all the wards that belongs to a particular parents
import prisma from "@/prisma/prismaConnect";
import {
  notAuthenticated,
  onlyParents,
  serverError,
} from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";
import bcrypt from "bcryptjs";

// here we get all the wards that relate to a parents
export async function GET(req: Request) {
  //   lets check for authentication of users first
  const parentsId = await serverSessionId();
  console.log("special testing");
  console.log(parentsId);
  const role = await serverSessionRole();
  if (!parentsId) return notAuthenticated();
  if (role !== "Parents") return onlyParents();
  try {
    const allWards = await prisma.parents.findUnique({
      where: { id: parentsId },
      select: {
        wards: {
          select: {
            id: true,
            profilePhoto: true,
            email: true,
            name: true,
          },
        },
      },
    });
    console.log(allWards);
    return new Response(JSON.stringify(allWards?.wards), { status: 200 });
  } catch (error) {
    return serverError();
  }
}

// here we will add more wards to a particular account
export async function POST(req: Request) {
  const { email, password, name, gender } = await req.json();
  const hashedPassword = bcrypt.hashSync(password, 10);
  //   lets check for authentication of users first
  const parentsId = await serverSessionId();
  const role = await serverSessionRole();
  if (!parentsId) return notAuthenticated();
  if (role !== "Parents") return onlyParents();
  //   lets check if the email is already existing before in our platform
  const checkparents = await prisma.parents.findFirst({ where: { email } });
  const checkstudent = await prisma.student.findFirst({ where: { email } });
  const checkteacher = await prisma.teacher.findFirst({ where: { email } });
  // return error messages if the email already exist within this checkings
  if (checkparents || checkstudent || checkteacher) {
    return new Response(
      JSON.stringify({ message: "this email already exists" }),
      { status: 400 }
    );
  }
  try {
    await prisma.student.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: "Student",
        gender,
        parentsId,
        CompletedProfile: true,
      },
    });
    return new Response(
      JSON.stringify({ message: "ward added successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}
