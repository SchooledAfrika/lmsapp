// here we handle student applying for one on one class
// home work support
// or any other offers advertised by the teachers
// in this route, it will only be those that have paid, then we use the webhook to call this endpoint

import prisma from "@/prisma/prismaConnect";

export async function POST(req: Request) {
  // TODO:all this information coming from the body is what we will extract from our payment webhook response
  // we then check for authentication header and know if is coming from us actually
  // return an error, if is not coming from our own payment webhook
  const { duration, classStart, ...inputs } = await req.json();
  try {
    await prisma.appliedSection.create({
      data: {
        duration: new Date(duration),
        classStart: new Date(classStart),
        ...inputs,
      },
    });
    return new Response(
      JSON.stringify({
        message: "payment made and user successfully subscribed to a teacher",
      }),
      { status: 200 }
    );
  } catch (error) {
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
}
