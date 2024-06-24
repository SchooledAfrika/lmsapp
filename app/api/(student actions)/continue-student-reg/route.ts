// this route we handle student completing the registration process
// only those that are registered and login can do this
import prisma from "@/prisma/prismaConnect";
import { authOptions } from "@/lib/nextAuth";
import { getServerSession } from "next-auth/next";
import { notAuthenticated, serverError } from "@/prisma/utils/error";

export async function POST(req: Request) {
  const infos = await req.json();
  // check if the user is authenticated
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  // return error if the user is not authenticated
  if (!userId) return notAuthenticated();
  try {
    await prisma.student.update({
      where: { id: userId },
      data: { ...infos },
    });
    return new Response(JSON.stringify({ message: "success" }), {
      status: 200,
    });
  } catch (error) {
    serverError();
  }
}
