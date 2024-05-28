// in this route, teacher can be able to add resources
// such as links to pdf, images, our useful urls
// they can also be able to delete the resources they added
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";

// first, lets create a new resources
export async function POST(req: Request) {
  // TODO: change the teacherId below to nextauthId
  const { teacherId, ...others } = await req.json();
  if (!teacherId) return notAuthenticated();
  try {
    // create the resources to the database here
    await prisma.teachersArticle.create({
      data: { teacherId, ...others },
    });
    return new Response(
      JSON.stringify({ message: "article uploaded successfully" })
    );
  } catch (error) {
    return serverError();
  }
}

// teacher can be able to delete their articles
export async function DELETE(req: Request) {
  // TODO: change teacherId to nextauth id
  const { teacherId, id } = await req.json();
  if (!teacherId) return notAuthenticated();
  // lets get the article and check if is the owner that is about to delete it
  const article = await prisma.teachersArticle.findUnique({
    where: {
      id,
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
