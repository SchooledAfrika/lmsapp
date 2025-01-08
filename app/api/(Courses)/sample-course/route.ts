// here, we will get a sample course
// and display it in the homepage.
import prisma from "@/prisma/prismaConnect";
import { serverError } from "@/prisma/utils/error";

export async function GET(req: Request) {
  try {
    const courses = await prisma.courses.findMany({
      take: 6,
      orderBy: [{ byAdmin: "desc" }, { sellCount: "desc" }],
      select: {
        id: true,
        price: true,
        title: true,
        details: true,
        banner: true,
        previewVideo: true,
        mainVideo: true,
        subject: true,
        sellCount: true,
        byAdmin: true,
        createdAt: true,
        grade: true,
        buyersList: true,
        teacher: {
          select: {
            profilePhoto: true,
            status: true,
            name: true,
            rating: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(courses), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
