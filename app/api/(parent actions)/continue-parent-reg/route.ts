// here, we handle completing registration for the parents account
// TODO:
// handles adding the child already existing Id if the user passed it
// handles registering new child and encrypting the password,
// then adding the id of the child to the student
import prisma from "@/prisma/prismaConnect";
import {
  generateId,
  serverSessionId,
  serverSessionRole,
} from "@/prisma/utils/utils";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { wardId, wardEmail, password, ...others } = await req.json();
  // check if the user is already logged in,
  // respond with error if not logged in,
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  if (!userId) return notAuthenticated();
  if (role !== "Parents")
    return new Response(
      JSON.stringify({
        message: "only parents are allowed to make this request",
      })
    );
  try {
    // lets get the students Id that the wardId matches with
    const student = await prisma.student.findFirst({
      where: { studentId: wardId },
      select: {
        id: true,
      },
    });
    // here, we proceed to check if the user passed the wardId
    // if the wardid is passed then we add the parents id to the student
    if (wardId) {
      await prisma.student.update({
        where: { id: student?.id },
        data: {
          parentsId: userId,
        },
      });
    }
    // then, we go ahead and create the new user if they passed the email of their child and password
    // generate a bcrypt to hash the password, register them and then add the id to the wards array in the parents field
    if (wardEmail && password) {
      const hashPassword = bcrypt.hashSync(password, 10);
      //   create the student here
      await prisma.student.create({
        data: {
          email: wardEmail,
          password: hashPassword,
          role: "Student",
          details: others.details,
          profilePhoto: others.childImg,
          CompletedProfile: true,
          parentsId: userId,
          name: others.name,
          gender: others.gender,
          grade: others.grade,
          studentId: generateId(),
        },
      });
    }
    // below here, we finally update the parent information
    // exclusively for the parents
    await prisma.parents.update({
      where: { id: userId },
      data: {
        name: others.name,
        gender: others.gender,
        profilePhoto: others.profilePhoto,
        phoneNo: others.phoneNo,
        address: others.address,
        CompletedProfile: true,
      },
    });
    return new Response(JSON.stringify({ message: "success" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return serverError();
  }
}
