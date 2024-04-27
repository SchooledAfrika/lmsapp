// this route we create the api for getting messages created by the user
// this should only be viewed by the school afrika
// but can be created by anyone, maybe register or not registered members
import prisma from "@/prisma/prismaConnect";

// lets first create the get intouch messages
export async function POST(req: Request) {
  const { message, name, phoneNo, email } = await req.json();
  // if any field is missing, return this error to the user
  if (!message || !name || !phoneNo || !email) {
    return new Response(JSON.stringify({ message: "all field are required" }), {
      status: 404,
      statusText: "Not Found",
    });
  }
  // proceed to creating the message
  // using try create then catch error if not successful
  try {
    const createMessage = await prisma.getInTouch.create({
      data: {
        name,
        message,
        email,
        phoneNo,
      },
    });
    return new Response(
      JSON.stringify({ message: "message created successfully" }),
      { statusText: "successful" }
    );
  } catch (error) {
    throw new Error(
      JSON.stringify({
        message: "Something went wrong while creating the message",
      })
    );
  }
}

// here, we create a get request,
// making sure is only the school afrika teams that get this information
export async function GET(req: Request) {
  // TODO: use the nextauth method to get the id of the incoming user
  // then use the id to check the role of the user
  // if he is a admin, then proceed to give him the messages
  // remove the body below and perform the action above later
  const { id } = await req.json();
  if (!id)
    return new Response(JSON.stringify({ message: "you are not login" }), {
      status: 401,
      statusText: "required to login to get the messages",
    });
  // TODO: get the user and check if he is an admin first
  try {
    const allMessages = await prisma.getInTouch.findMany();
    return new Response(JSON.stringify(allMessages), {
      status: 200,
      statusText: "success",
    });
  } catch (error) {
    throw new Error(
      JSON.stringify({
        message: "something went wrong getting all the messages",
      })
    );
  }
}
