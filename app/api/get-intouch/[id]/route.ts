// getting only one message using this file
// TODO: use next auth to update this part
// allow only school afrika to get this message

import prisma from "@/prisma/prismaConnect";

export async function GET(req: Request) {
  // getting the id from the parameters
  const url = new URL(req.url).pathname.split("/");
  const id = url[url.length - 1];
  //   using try and catch to get the particular message or throw an error
  try {
    const message = await prisma.getInTouch.findUnique({
      where: {
        id,
      },
    });
    return new Response(JSON.stringify(message), {
      status: 200,
      statusText: "successful",
    });
  } catch (error) {
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
}

// the school africka admin can delete this message here
export async function DELETE(req: Request) {
  // getting the id from the parameters
  const url = new URL(req.url).pathname.split("/");
  const id = url[url.length - 1];
  //   lets check if the message exist first before deleting
  const message = await prisma.getInTouch.findUnique({ where: { id } });
  if (!message) {
    return new Response(
      JSON.stringify({ message: "this message no longer exists" }),
      { status: 404, statusText: "message does not exist" }
    );
  }
  //   try and catch using the function below
  try {
    const deletedInfo = await prisma.getInTouch.delete({
      where: {
        id,
      },
    });
    return new Response(
      JSON.stringify({ message: "message has been successfully deleted" })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "something went wrong with the server" }),
      { status: 500 }
    );
  }
}
