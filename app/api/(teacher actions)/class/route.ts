// in this route we allow the teacher to create a new class
// delete or update the class they created;
// and also to get all their classes here
// then in the applied-class route, the student will be able to be added to the class after making their payments
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import {
  checkKyc,
  checkPlans,
  checkTotalClass,
  serverSessionId,
  serverSessionRole,
} from "@/prisma/utils/utils";

// here, teachers can create a class
export async function POST(req: Request) {
  const { duration, classStarts, classEnds, ...others } = await req.json();
  // get informarion about the person that is logged in and there role
  const teacherId = await serverSessionId();
  const userRole = await serverSessionRole();
  // restrict users that is not logged in or not a teacher
  if (!teacherId) {
    return notAuthenticated();
  }
  if (userRole !== "Teacher") {
    return new Response(
      JSON.stringify({ message: "only teachers are allowed to create class" }),
      { status: 400 }
    );
  }
  // lets check if the kyc is approved first
  // if is not approved, the send an error message to the user
  const doneKyc = await checkKyc(teacherId!);
  if (!doneKyc || doneKyc !== "APPROVED") {
    console.log("entered here");
    return new Response(
      JSON.stringify({ message: "no kyc or kyc is not approved" }),
      { status: 401 }
    );
  }
  // now, we should get the class created so far
  // and also to the kyc of the that belong to the teacher
  // here we will be able to tackle restrictions based on the class
  const allClasses = await checkTotalClass(teacherId!);
  const teacherPlan = await checkPlans(teacherId!);
  // add class creation restriction to just only one class for free plans
  // there by making other plans unlimitted
  if (teacherPlan === "FREE" && allClasses! >= 1) {
    return new Response(
      JSON.stringify({
        message: "You have hit your maximum class for this plan",
      }),
      { status: 402 }
    );
  }
  try {
    await prisma.classes.create({
      data: {
        teacherId,
        duration: duration,
        classStarts: new Date(classStarts),
        classEnds: new Date(classEnds),
        ...others,
      },
    });
    return new Response(
      JSON.stringify({ message: "class created successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
}

// here, teachers can delete their class
export async function DELETE(req: Request) {
  const teacherId = await serverSessionId();
  const { id } = await req.json();
  if (!teacherId) {
    return notAuthenticated();
  }
  // now lets get the class we want to delete
  // return an error if the class does not exist
  // then also return an error if the teacherId does not match
  const oneClass = await prisma.classes.findUnique({ where: { id } });
  if (!oneClass) {
    return new Response(
      JSON.stringify({ message: "this class does not exist" }),
      { status: 400 }
    );
  }
  if (oneClass.teacherId !== teacherId) {
    return new Response(
      JSON.stringify({ message: "you can only delete class you created" })
    );
  }
  //   we can now finally delete the class
  try {
    await prisma.classes.delete({
      where: { id },
    });
    return new Response(
      JSON.stringify({ message: "class deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}

// here a teacher can get all the class that he or she created
export async function GET(req: Request) {
  const teacherId = await serverSessionId();
  try {
    const allClass = await prisma.classes.findMany({ where: { teacherId } });
    return new Response(JSON.stringify(allClass), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
