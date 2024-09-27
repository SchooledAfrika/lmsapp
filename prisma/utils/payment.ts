import prisma from "../prismaConnect";
import { serverError } from "./error";

// here we make payment for classes
export const payForClass = async (classId: string, studentId: string) => {
  const theclass = await prisma.classes.findUnique({
    where: { id: classId },
    select: { studentIDs: true },
  });
  // lets check if the student already exist in the class,
  // if it exists, we will return and not add the sudent
  const isStudentAmong = theclass?.studentIDs.find(
    (item) => item === studentId
  );
  if (isStudentAmong) {
    return new Response(JSON.stringify({ message: "student already exists" }), {
      status: 200,
    });
  }
  theclass?.studentIDs.push(studentId);
  // here we get the student information, so that we can push the class id to it
  const theStudent = await prisma.student.findUnique({
    where: { id: studentId },
    select: { classIDs: true },
  });
  theStudent?.classIDs.push(classId);
  try {
    // push the student id to the class
    await prisma.classes.update({
      where: { id: classId },
      data: { studentIDs: theclass?.studentIDs },
    });
    // then we go ahead to also modify the student profile
    // by adding the classid to the array of classes student attend to
    await prisma.student.update({
      where: {
        id: studentId,
      },
      data: { classIDs: theStudent?.classIDs },
    });
    return new Response(
      JSON.stringify({
        message: "payment successful and student added in class",
      }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
};

// here we make payment for session
export const sessionPaymentFlutter = async (paymentInfo: any) => {
  console.log(paymentInfo);
  try {
    await prisma.adminSectionView.create({
      data: {
        studentId: paymentInfo.studentId,
        oneOnOneSectionId: paymentInfo.selectedTeacher,
        merged: false,
        amt: Number(paymentInfo.price),
        sectionType: paymentInfo.sessionType,
        hoursperday: paymentInfo.hours ? paymentInfo.hours : 2,
        duration: paymentInfo.length,
        subject: paymentInfo.subjects.split("-"),
        curriculum: paymentInfo.curriculum,
        specialNeed: paymentInfo.specialNeeds.split("-"),
        learningGoal: paymentInfo.goals,
        learningDays: paymentInfo.days.split("-"),
        startTime: paymentInfo.classStart,
        grade: paymentInfo.grade,
      },
    });
    return new Response(JSON.stringify({ message: "successful" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return serverError();
  }
};
export const sessionPaymentPaystack = async (paymentInfo: any) => {
  try {
    await prisma.adminSectionView.create({
      data: {
        studentId: paymentInfo.studentId,
        oneOnOneSectionId: paymentInfo.selectedTeacher,
        merged: false,
        amt: Number(paymentInfo.price),
        sectionType: paymentInfo.sessionType,
        hoursperday: paymentInfo.hours ? paymentInfo.hours : 2,
        duration: paymentInfo.length,
        subject: paymentInfo.subjects,
        curriculum: paymentInfo.curriculum,
        specialNeed: paymentInfo.specialNeeds,
        learningGoal: paymentInfo.goals,
        learningDays: paymentInfo.days,
        startTime: paymentInfo.classStart,
        grade: paymentInfo.grade,
      },
    });
    return new Response(JSON.stringify({ message: "successful" }), {
      status: 200,
    });
  } catch (error) {
    return serverError();
  }
};
