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
        hoursperday: paymentInfo.hours ? Number(paymentInfo.hours) : 2,
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

enum IPlan {
  FREE,
  BASIC,
  PRO,
}
// here we write the function for teacher webhook subscription for flutterwave
interface Iplans {
  __CheckoutInitAddress?: string;
  userId: string;
  amt: number;
  duration: string;
  expireIn: string;
  plan: any;
}
export const teachersPlan = async (payload: Iplans) => {
  const newDate = new Date();
  // time to track when plan was created and for crons job to delete based on the unix epoch timestamp
  const duedate = newDate.getTime(); //epoch time in milliseconds
  // here we will create an epoch time
  // this will show the plan expiration date
  // then converts back to isoDateString
  const expireTime =
    newDate.getTime() + 1000 * 60 * 60 * 24 * 31 * Number(payload.expireIn);
  const expireIn = new Date(expireTime).toISOString();
  try {
    // here we can now create the plan based on the teacher that made the payment
    await prisma.teachersPlans.update({
      where: {
        teacherId: payload.userId,
      },
      data: {
        amt: Number(payload.amt),
        dueDate: duedate,
        expireDate: expireIn,
        plan: payload.plan,
      },
    });
    return new Response(
      JSON.stringify({ message: "subscription was successful" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
};

// here we will handle the webhook for student paying for a course
interface Icourses {
  __CheckoutInitAddress?: string;
  courseId: string;
  payersId: string;
  userType: string;
}
export const coursePayment = async (payload: Icourses) => {
  console.log(payload);
  // first, let's get the course that we want to buy or purchase
  const theCourse = await prisma.courses.findUnique({
    where: { id: payload.courseId },
  });
  // checking if course actually exists or if the user has the course already
  if (!theCourse) return;
  const alreadyBought = theCourse.buyersList.includes(payload.payersId);
  if (alreadyBought) return;
  try {
    // check if isStudent is true and buy the course for the student or
    // buy the course for the parents if the student is false
    if (payload.userType === "Student") {
      const item = await prisma.studentPurchasedCourses.create({
        data: {
          coursesId: payload.courseId,
          title: theCourse?.title,
          price: theCourse?.price,
          byAdmin: theCourse?.byAdmin,
          subject: theCourse?.subject,
          banner: theCourse?.banner,
          previewVideo: theCourse?.previewVideo,
          mainVideo: theCourse?.mainVideo,
          studentId: payload.payersId,
        },
      });
      console.log(item);
    } else if (payload.userType === "Parents") {
      const parents = await prisma.parentsPurchasedCourses.create({
        data: {
          coursesId: payload.courseId,
          title: theCourse?.title,
          price: theCourse?.price,
          byAdmin: theCourse?.byAdmin,
          subject: theCourse?.subject,
          banner: theCourse?.banner,
          previewVideo: theCourse?.previewVideo,
          mainVideo: theCourse?.mainVideo,
          parentsId: payload.payersId,
        },
      });
      console.log(parents);
    } else {
      const teacher = await prisma.teacherPurchasedCourses.create({
        data: {
          coursesId: payload.courseId,
          title: theCourse?.title,
          price: theCourse?.price,
          byAdmin: theCourse?.byAdmin,
          subject: theCourse?.subject,
          banner: theCourse?.banner,
          previewVideo: theCourse?.previewVideo,
          mainVideo: theCourse?.mainVideo,
          teacherId: payload.payersId,
        },
      });
      console.log(teacher);
    }
    // now, update the course total sell by one
    await prisma.courses.update({
      where: { id: payload.courseId },
      data: {
        sellCount: theCourse.sellCount + 1,
        buyersList: { push: payload.payersId },
      },
    });
    // then we go ahead and add this to the revenew generated so far
    await prisma.revenew.create({
      data: {
        amt: theCourse.price,
        teacherId: theCourse.teacherId,
        type: "Course",
      },
    });
    return new Response(
      JSON.stringify({ message: "Course bought successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return serverError();
  }
};
