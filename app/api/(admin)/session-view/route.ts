// in this route
// admins will be able to get all the sessions that have not been merged
// and also be able to merge a particular teacher to a particular session
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

// here we get all the adminsessionview
export async function GET(req: Request) {
  const id = await serverSessionId();
  const role = await serverSessionRole();
  // restriction if the user is not admin
  if (!id) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  try {
    const allSessions = await prisma.adminSectionView.findMany({
      where: { merged: false },
    });
    return new Response(JSON.stringify(allSessions), { status: 200 });
  } catch (error) {
    return serverError();
  }
}

// here we merge a student to a particular teacher session
export async function PUT(req: Request) {
  const id = await serverSessionId();
  const role = await serverSessionRole();
  // restriction if the user is not admin
  if (!id) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  // here we get the id of the teacher we want to merge
  // and also get the id of the adminSession that the student or parents created while making
  // a request for one on one session
  const { adminSessionId, teacherSessionId } = await req.json();
  // now let't get the whole information about the session made by the student
  const adminSessionView = await prisma.adminSectionView.findUnique({
    where: {
      id: adminSessionId,
    },
  });

  if (!adminSessionView) {
    return new Response(
      JSON.stringify({ message: "this session does not exist" }),
      { status: 404 }
    );
  }

  if (adminSessionView.merged) {
    return new Response(
      JSON.stringify({ message: "this session is already merged" }),
      { status: 400 }
    );
  }

  try {
    // now lets  merge a teacher to a student
    // by creating a new session model for them
    await prisma.appliedSection.create({
      data: {
        oneOnOneSectionId: teacherSessionId,
        studentId: adminSessionView.studentId,
        subject: adminSessionView.subject,
        grade: adminSessionView.grade,
        sectionType: adminSessionView.sectionType,
        classStart: adminSessionView.startTime,
        specialNeed: adminSessionView.specialNeed,
        learningGoal: adminSessionView.learningGoal,
        learningDays: adminSessionView.learningDays,
        hoursperday: adminSessionView.hoursperday,
        duration: adminSessionView.duration,
        startTime: adminSessionView.startTime,
      },
    });
    // now we can proceed to making the field merge in the adminsessionView to true,
    // this signifies that the student have been merged successfully
    await prisma.adminSectionView.update({
      where: { id: adminSessionId },
      data: {
        merged: true,
      },
    });
    // TODO: below here modify the teachers payment info, to add up the new payment
    // we will also allow the admin to pass extra payload for the amout to pay the teacher for the session
    return new Response(JSON.stringify({ message: "Merged successfully" }), {
      status: 200,
    });
  } catch (error) {
    return serverError();
  }
}
