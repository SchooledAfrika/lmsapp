// here, both students and teacher can get a resouces under the one on one session
// or the resources in the special request session
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId } from "@/prisma/utils/utils";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const userId = await serverSessionId();
  if (userId) return notAuthenticated();
  try {
    const resource = await prisma.teachersArticle.findUnique({
      where: { id: params.id },
    });
    return new Response(JSON.stringify(resource));
  } catch (error) {
    return serverError();
  }
}
