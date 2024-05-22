// here, we handle creation of one to one section
// teachers can create one on one sections via the oneononesection model
// then students can apply to this one on on section via the appliedSection
import prisma from "@/prisma/prismaConnect";

// here we first make a post request
// there for creating the new one to one section
export async function POST(req: Request) {
  // rememmber to change this and replace it with the nextauth id
  const { id, ...others } = await req.json();
  if (!id) {
    return new Response(JSON.stringify({ message: "you are not logged in" }), {
      status: 401,
    });
  }
  // now, lets proceed and create the section
  try {
    await prisma.oneOnOneSection.create({
      data: { teacherId: id, ...others },
    });
    return new Response(
      JSON.stringify({ message: "section created successfully" }),
      { status: 200 }
    );
  } catch (error) {
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
}

// here, we get our section
// while getting our section, we also include the applied sections
export async function GET(req: Request) {
  // remember to change this static id to the id in the nextauth
  const id = "1234567810935";
  try {
    const allSections = await prisma.oneOnOneSection.findUnique({
      where: {
        teacherId: id,
      },
    });
    return new Response(JSON.stringify(allSections), { status: 200 });
  } catch (error) {
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
}

// here, we provide the route for updating the section
export async function PUT(req: Request) {
  // TODO: change this id to nextauth id
  const { id, others } = await req.json();
  if (!id) {
    return new Response(JSON.stringify({ message: "you are not logged in" }));
  }
  // lets get the oneononesection and update it
  try {
    await prisma.oneOnOneSection.update({
      where: { teacherId: id },
      data: { ...others },
    });
    return new Response(JSON.stringify({ message: "updated successfully" }), {
      status: 200,
    });
  } catch (error) {
    throw new Error(JSON.stringify({ message: "something went wrong" }));
  }
}
