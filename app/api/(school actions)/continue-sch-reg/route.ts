// this is to handle completing the school registration process

import { notAuthenticated, serverError } from "@/prisma/utils/error";
import prisma from "@/prisma/prismaConnect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/nextAuth";

export async function POST(req: Request) {
  const infos = await req.json();
  //   lets check if the user is authenticated already
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!userId) return notAuthenticated();
  try {
    await prisma.school.update({
      where: { id: userId },
      data: { CompletedProfile: true, ...infos },
    });
    return new Response(JSON.stringify({ message: "success" }), {
      status: 200,
    });
  } catch (error) {
    return serverError();
  }
}
