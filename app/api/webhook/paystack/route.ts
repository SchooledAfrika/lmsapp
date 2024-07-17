// in this route, we focus on allowing student to add their id to the backend after making payment
// this part is only accessible by the webhooks we have setup for payments
// TODO: remember to check or add the auth header for the keys given by this webhooks payment platform
import prisma from "@/prisma/prismaConnect";
import { serverError } from "@/prisma/utils/error";
import crypto from "crypto";

// add student to the class after making payment
export async function POST(req: Request) {
  const body = await req.json();
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
  //   lets get the class first so that we can be able to push the new id
  if (paymentFor === "class") {
    const theclass = await prisma.classes.findUnique({
      where: { id: classId },
      select: { studentIDs: true },
    });
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
  }
}
