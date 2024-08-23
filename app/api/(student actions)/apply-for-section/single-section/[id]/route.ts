// here we will be able to get only one one-on-one section
import prisma from "@/prisma/prismaConnect";
import { serverError } from "@/prisma/utils/error";

// get single secion
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log("hello");
  try {
    const session = await prisma.oneOnOneSection.findUnique({
      where: { id: params.id },
      include: {
        teacher: {
          select: {
            name: true,
            profilePhoto: true,
            details: true,
            rating: true,
            language: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(session), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
