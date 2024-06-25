// here, we handle completing registration for the parents account
// TODO:
// handles adding the child already existing Id if the user passed it
// handles registering new child and encrypting the password,
// then adding the id of the child to the student
import prisma from "@/prisma/prismaConnect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/nextAuth";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  console.log("ehhhhh");
  const { wardId, wardEmail, password, ...others } = await req.json();
  // check if the user is already logged in,
  // respond with error if not logged in,
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  console.log(userId);
  if (!userId) return notAuthenticated();
  console.log(userId);
  console.log(others);
  try {
    // here, we proceed to check if the user passed the wardId
    // if the wardid is passed then we add it to the array of wards
    if (wardId) {
      await prisma.parents.update({
        where: { id: userId },
        data: {
          wards: {
            push: wardId,
          },
        },
      });
    }
    // then, we go ahead and create the new user if they passed the email of their child and password
    // generate a bcrypt to hash the password, register them and then add the id to the wards array in the parents field
    if (wardEmail && password) {
      const hashPassword = bcrypt.hashSync(password, 10);
      //   create the student here
      const ward = await prisma.student.create({
        data: {
          email: wardEmail,
          password: hashPassword,
          role: "Student",
          disable: Boolean(others.disable),
          details: others.details,
          profilePhoto: others.childImg,
          CompletedProfile: true,
        },
        select: {
          id: true,
        },
      });
      //   then update the parents with the id of the student that was created
      await prisma.parents.update({
        where: { id: userId },
        data: { wards: { push: ward.id } },
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

export async function GET() {
  console.log("hello");
  return new Response(JSON.stringify({ message: "hello" }));
}
