// in this route, we focus on allowing student to add their id to the backend after making payment
// this part is only accessible by the webhooks we have setup for payments
// TODO: remember to check or add the auth header for the keys given by this webhooks payment platform
import {
  payForClass,
  sessionPaymentFlutter,
  teachersPlan,
  coursePayment,
} from "@/prisma/utils/payment";

// add student to the class after making payment
export async function POST(req: Request) {
  // here we get the signature we provided in our flutterwave account
  const signature = req.headers.get("verif-hash");
  if (signature !== process.env.FLUTTER_WAVE_HASH) {
    return new Response(JSON.stringify({ message: "illegal parameter" }), {
      status: 501,
    });
  }
  // we get the whole body and verify if the webhook is actually coming from the flutterwave
  // then check the payment type
  const body = await req.json();
  const data = body.data;
  const studentId = data.customer.phone_number;
  const classArray = data.customer.name.split("-");
  const classId = classArray[0];
  const paymentFor = classArray[1];
  console.log("webhook flutter entered now");
  console.log(paymentFor);
  console.log(body.meta_data);
  // check for the payment type and run it accordingly
  if (paymentFor == "class ") {
    return await payForClass(classId, studentId);
  }
  // pay for session if is type if session
  if (paymentFor == "session ") {
    return await sessionPaymentFlutter(body.meta_data);
  }
  // webhook for teachers making payment for plans
  if (paymentFor == "teacherplan ") {
    return await teachersPlan(body.meta_data);
  }
  // webhook for payment for courses from anyone
  if (paymentFor == "courses ") {
    console.log("entered");
    return await coursePayment(body.meta_data);
  }
  return new Response(JSON.stringify({ m: "successful" }), { status: 200 });
}

export async function PUT(req: Request) {
  const theWhole = {
    __CheckoutInitAddress: "david one",
    courseId: "6718dafc60d34bef3fabee14",
    payersId: "67083a08145752924230feef",
    userType: "Student",
  };
  try {
    return await coursePayment(theWhole);
  } catch (error) {
    console.log(error);
  }
}
