// in this route, we focus on allowing student to add their id to the backend after making payment
// this part is only accessible by the webhooks we have setup for payments
// TODO: remember to check or add the auth header for the keys given by this webhooks payment platform
import prisma from "@/prisma/prismaConnect";
import { serverError } from "@/prisma/utils/error";
import { payForClass } from "@/prisma/utils/payment";

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
  // check for the payment type and run it accordingly
  if (paymentFor == "class ") {
    await payForClass(classId, studentId);
  }
  return new Response(JSON.stringify({ m: "k" }), { status: 200 });
}
