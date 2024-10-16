// here, we handle creation of one to one section
// teachers can create one on one sections via the oneononesection model
// then students can apply to this one on on section via the appliedSection
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated } from "@/prisma/utils/error";
import {
  checkKyc,
  checkPlans,
  serverSessionId,
  serverSessionRole,
  generateId,
} from "@/prisma/utils/utils";

// here we first make a post request
// there for creating the new one to one section
export async function POST(req: Request) {
  // check for authentication of the teacher
  const teacherId = await serverSessionId();
  const role = await serverSessionRole();
  const payload = await req.json();
  if (!teacherId) return notAuthenticated();
  if (role !== "Teacher")
    return new Response(
      JSON.stringify({
        message: "oops, only teachers can perform this action",
      }),
      { status: 401 }
    );
  // check for the kyc of the teacher here
  const doneKyc = await checkKyc(teacherId!);
  if (!doneKyc || doneKyc !== "APPROVED") {
    return new Response(
      JSON.stringify({ message: "no kyc or kyc is not approved" }),
      { status: 401 }
    );
  }
  // check if the user is in free plan, and prevent him from creating a section profile
  // const teacherPlan = await checkPlans(teacherId!);
  // if (teacherPlan === "FREE") {
  //   return new Response(
  //     JSON.stringify({ message: "subscribe for a plans, to create a section" }),
  //     { status: 402 }
  //   );
  // }
  // now, lets proceed and create the section
  try {
    // lets check if the teacher already have a session profile
    const checkSession = await prisma.oneOnOneSection.findFirst({
      where: { teacherId },
    });
    if (checkSession) {
      return new Response(
        JSON.stringify({ message: "oops!!! session profile already exists" }),
        { status: 400 }
      );
    }
    await prisma.oneOnOneSection.create({
      data: { teacherId: teacherId, sessionId: generateId(), ...payload },
    });
    return new Response(
      JSON.stringify({ message: "section created successfully" }),
      { status: 200 }
    );
  } catch (error) {
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
}

// here, we get our section
// while getting our section, we also include the applied sections
export async function GET(req: Request) {
  const teacherId = await serverSessionId();
  if (!teacherId) return notAuthenticated();

  try {
    const allSections = await prisma.oneOnOneSection.findUnique({
      where: {
        teacherId,
      },
      include: {
        AppliedSection: true,
      },
    });
    console.log(allSections);
    return new Response(JSON.stringify(allSections), { status: 200 });
  } catch (error) {
    console.log(error);
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
}

// here, we provide the route for updating the section
export async function PUT(req: Request) {
  const teacherId = await serverSessionId();
  const payload = await req.json();
  if (!teacherId) {
    return new Response(JSON.stringify({ message: "you are not logged in" }));
  }
  // lets get the oneononesection and update it
  try {
    await prisma.oneOnOneSection.update({
      where: { teacherId },
      data: { ...payload },
    });
    return new Response(JSON.stringify({ message: "updated successfully" }), {
      status: 200,
    });
  } catch (error) {
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
}
