// in this route, teacher can be able to add resources
// such as links to pdf, images, our useful urls
// they can also be able to delete the resources they added
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

// first, lets create a new resources
export async function POST(req: Request) {
  const teacherId = await serverSessionId();
  const role = await serverSessionRole();
  const payload = await req.json();
  if (!teacherId) return notAuthenticated();
  if (role !== "Teacher")
    return new Response(
      JSON.stringify({
        message: "only teachers are allowed to create resources",
      }),
      { status: 400 }
    );
  try {
    // create the resources to the database here
    await prisma.teachersArticle.create({
      data: { teacherId, ...payload },
    });
    return new Response(
      JSON.stringify({ message: "article uploaded successfully" })
    );
  } catch (error) {
    console.log(error);
    return serverError();
  }
}

// teacher can be able to delete their articles
export async function DELETE(req: Request) {
  const teacherId = await serverSessionId();
  const { id } = await req.json();
  if (!teacherId) return notAuthenticated();
  // lets get the article and check if is the owner that is about to delete it
  const article = await prisma.teachersArticle.findUnique({
    where: {
      id,
    },
    select: {
      teacherId: true,
    },
  });
  if (article?.teacherId !== teacherId) {
    return new Response(
      JSON.stringify({ message: "This article was not created by you" })
    );
  }
  // proceed to delete
  try {
    await prisma.teachersArticle.delete({
      where: { id },
    });
    return new Response(
      JSON.stringify({ message: "article deleted successfully" })
    );
  } catch (error) {
    return serverError();
  }
}

export async function GET(req: Request) {
  const teacherId = await serverSessionId();
  const role = await serverSessionRole();

  if (!teacherId) return notAuthenticated();
  if (role !== "Teacher") {
    return new Response(
      JSON.stringify({ message: "only teacher is allowed" }),
      { status: 400 }
    );
  }

  // now we make call to the backend
  try {
    const allTeacherArticle = await prisma.teachersArticle.findMany({
      where: {
        teacherId,
      },
    });
    return new Response(JSON.stringify(allTeacherArticle), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
