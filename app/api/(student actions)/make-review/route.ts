// here, we will use post request to make a review on a particular teacher here
// only student can make this review
// and one student can't submit more than one review
// and review is done only once

import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function POST(req: Request) {
  const { comment, rateValue, teacherId } = await req.json();
  const studentId = await serverSessionId();
  const role = await serverSessionRole();
  if (!studentId) return notAuthenticated();
  if (role !== "Student") {
    return new Response(
      JSON.stringify({ message: "Only students are allowed to review" }),
      { status: 400 }
    );
  }
  //   lets first check the teacher profile
  // and check if this particular student has already reviewed
  const teacherProfile = await prisma.teacher.findUnique({
    where: { id: teacherId },
    select: {
      reviewers: true,
    },
  });
  const hasStudentReviewed = teacherProfile?.reviewers.includes(studentId);
  console.log(hasStudentReviewed);
  if (hasStudentReviewed) {
    return new Response(
      JSON.stringify({ message: "your have reviewed before" }),
      { status: 400 }
    );
  }
  //   now we can go ahead and save the review and also update the teacher's account
  try {
    await prisma.ratting.create({
      data: {
        teacherId,
        studentId,
        comment,
        rateValue,
      },
    });
    // get all the review made so far on the teacher's id
    // we can now use it to calculate the average review and save it
    const allReviews = await prisma.ratting.findMany({
      where: { teacherId },
      select: {
        rateValue: true,
      },
    });
    const rate = allReviews.map((item) => item.rateValue);
    const totalValue = rate.reduce((total, currnt) => {
      return total + currnt;
    });
    const average = totalValue / rate.length;
    await prisma.teacher.update({
      where: { id: teacherId },
      data: { reviewers: { push: studentId }, rating: average },
    });
    return new Response(JSON.stringify({ message: "successfully reviewed" }));
  } catch (error) {
    console.log(error);
    return serverError();
  }
}
