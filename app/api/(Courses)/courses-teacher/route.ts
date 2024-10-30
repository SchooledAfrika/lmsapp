// here we will be able to create a course
// which only the teachers can create
// this comprises the admin and normal teachers
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import {
  checkKyc,
  checkPlans,
  getQuery,
  serverSessionId,
  serverSessionRole,
} from "@/prisma/utils/utils";

// create courses here
export async function POST(req: Request) {
  const payloads = await req.json();
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  // check for authentication of the users
  if (!userId) return notAuthenticated();
  //   check if the kyc is already approved
  const donekyc = await checkKyc(userId);
  if (role !== "Admin" && (!donekyc || donekyc !== "APPROVED")) {
    return new Response(
      JSON.stringify({ message: "Please complete your kyc to proceed" }),
      { status: 400 }
    );
  }
  // then lets check if the user is in paid plan or if the user is an admin before allowing to proceed with creating courses
  const teachersPlan = await checkPlans(userId);
  if (role !== "Admin" && teachersPlan === "FREE") {
    return new Response(
      JSON.stringify({
        message: "Please upgrade to paid plans to create a course",
      }),
      { status: 401 }
    );
  }
  //   now we can proceed to create the courses below
  try {
    await prisma.courses.create({
      data: {
        byAdmin: role == "Admin" ? true : false,
        teacherId: userId,
        ...payloads,
      },
    });
    return new Response(
      JSON.stringify({ message: "courses created successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}

// below here we will create an endpoint for,  which will be displayed in the website for everyone to purchase the courses
export async function GET(req: Request) {
  const page = getQuery(req.url, "page");
  // get the lower border for slice
  const Start = Number(page) - 1;
  const skipAmt = Start * 3;
  const takeAmt = 20;
  try {
    const allCourses = await prisma.courses.findMany({
      skip: skipAmt,
      take: takeAmt,
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
    return new Response(JSON.stringify(allCourses), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
