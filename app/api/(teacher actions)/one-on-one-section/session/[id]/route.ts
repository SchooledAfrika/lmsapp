// this route handles getting a single session
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId } from "@/prisma/utils/utils";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log(params.id);
  const userId = await serverSessionId();
  if (!userId) return notAuthenticated();
  try {
    // first lets get the appliedSection using the dynamic id
    // we can only return the information to student or teacher that involed in it
    const appliedSection = await prisma.appliedSection.findUnique({
      where: { id: params.id },
      include: {
        sectionOwner: {
          select: {
            teacher: {
              select: {
                name: true,
                details: true,
                email: true,
                profilePhoto: true,
                phoneNo: true,
              },
            },
          },
        },
        student: {
          select: {
            name: true,
            email: true,
            profilePhoto: true,
            phoneNo: true,
            details: true,
          },
        },
        StudentExam: true,
      },
    });
    console.log(appliedSection);
    if (!appliedSection)
      return new Response(
        JSON.stringify({ message: "this session does not exist" }),
        { status: 400 }
      );
    const session = await prisma.oneOnOneSection.findUnique({
      where: { id: appliedSection?.oneOnOneSectionId },
      select: { id: true, teacherId: true },
    });
    if (session?.teacherId !== userId || appliedSection.studentId !== userId) {
      return new Response(JSON.stringify({ message: "ilegal parameter!!!" }), {
        status: 401,
      });
    }
    // we then return the appllied section
    return new Response(JSON.stringify(appliedSection), { status: 200 });
  } catch (error) {
    console.log(error);
    return serverError();
  }
}
