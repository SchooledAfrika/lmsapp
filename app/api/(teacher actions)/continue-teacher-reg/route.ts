// here we handle the teacher completing their profile information
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/nextAuth";

export async function POST(req: Request) {
  const infos = await req.json();
  // checking if the user is logged in befor passing through the remaining part
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!userId) return notAuthenticated();
  try {
    // complete the teachers registration
    await prisma.teacher.update({
      where: { id: userId },
      data: { CompletedProfile: true, ...infos },
    });
    // create a basic plan for the teacher
    await prisma.teachersPlans.create({
      data: {
        teacherId: userId,
      },
    });
    return new Response(JSON.stringify({ message: "Successfully updated" }), {
      status: 200,
    });
  } catch (error) {
    return serverError();
  }
}
