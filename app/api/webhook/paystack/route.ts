// in this route, we focus on allowing student to add their id to the backend after making payment
// this part is only accessible by the webhooks we have setup for payments
// TODO: remember to check or add the auth header for the keys given by this webhooks payment platform
import {
  coursePayment,
  payForClass,
  sessionPaymentPaystack,
  teachersPlan,
} from "@/prisma/utils/payment";
import crypto from "crypto";

// add student to the class after making payment
export async function POST(req: Request) {
  const body = await req.json();
  console.log("entered");
  console.log(body);
  // lets first verify the signature and make sure the webhook is coming
  // from paystack it self
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_HOOK_KEY!)
    .update(JSON.stringify(body))
    .digest("hex");
  const payStackHash = req.headers.get("x-paystack-signature");
  if (hash !== payStackHash)
    return new Response(JSON.stringify({ message: "illegal parameter" }), {
      status: 500,
    });
  // lets return a webhook response before we proceed to doing other things
  new Response(JSON.stringify({ message: "received" }), { status: 200 });
  //   get important things for updating transaction on this web-hook
  const fields = body.data.metadata.custom_fields[0];
  const studentId = fields.display_name;
  const classId = fields.variable_name;
  const typePayArray = fields.value.split("-");
  const amt = typePayArray[0];
  const paymentFor = typePayArray[1];
  console.log(body.data.metadata.plan);
  //   lets get the class first so that we can be able to push the new id
  if (paymentFor === "class") {
    return await payForClass(classId, studentId);
  }
  // here we make payment for session for the parents and also child
  if (paymentFor === "session") {
    return await sessionPaymentPaystack(body.data.metadata.plan);
  }
  // payment for teacher to subscribe for a plan
  if (paymentFor === "teacherplan") {
    return await teachersPlan(body.data.metadata.plan);
  }
  // webhook for payment for courses from anyone
  if (paymentFor == "courses") {
    console.log("paystack entered here");
    return await coursePayment(body.data.metadata.plan);
  }
}
