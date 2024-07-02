// here, the teacher can get only one resources to see the details and also delete button will display in the frontend to delete them
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId } from "@/prisma/utils/utils";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const teacherId = await serverSessionId();
  if (!teacherId) return notAuthenticated();
  try {
    // here we get a single resources
    // also check if is the teacher that is request to view it is the one that created it
    const oneResources = await prisma.teachersArticle.findUnique({
      where: { id: params.id },
    });
    if (!oneResources)
      return new Response(JSON.stringify({ message: "resources not found" }), {
        status: 404,
      });
    if (oneResources?.teacherId !== teacherId)
      return new Response(
        JSON.stringify({ message: "not permitted to view this resources" }),
        { status: 400 }
      );
    return new Response(JSON.stringify(oneResources), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
