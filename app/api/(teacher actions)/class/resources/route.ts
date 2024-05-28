// here, a teacher will add his resources to the class for students to use;
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, serverError } from "@/prisma/utils/error";

// add resources to class
export async function POST(req: Request) {
  // TODO: change this teacherId to nextauth id
  const { teacherId, classId, resourceId } = await req.json();
  if (!teacherId) return notAuthenticated();
  // lets get the class from the classId, and make sure is actually the teacher that owns it
  const getClass = await prisma.classes.findUnique({
    where: {
      id: classId,
    },
  });
  if (!getClass) {
    return new Response(JSON.stringify({ message: "cless does not exist" }), {
      status: 404,
    });
  }
  if (getClass?.teacherId !== teacherId) {
    return new Response(
      JSON.stringify({ message: "you are not allowed to access this class" }),
      { status: 404 }
    );
  }
  // proceed to add now
  try {
    await prisma.classes.update({
      where: { id: classId },
      data: {
        resourcesIds: [...getClass.resourcesIds, resourceId],
      },
    });
    return new Response(
      JSON.stringify({ message: "article added to the class successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}

// this route handles deleting resources
// this deletes a particular id of the resources from the resourcesIds field
// and it can only be done by the teacher that added the resources
export async function DELETE(req: Request) {
  console.log("entered");
  // TODO: change the teacherId to the nextauth id
  const { teacherId, classId, resourceId } = await req.json();
  if (!teacherId) return notAuthenticated();
  // lets get the resources and know if is the teacher that added it
  const getArticle = await prisma.teachersArticle.findUnique({
    where: {
      id: resourceId,
    },
  });
  if (getArticle?.teacherId !== teacherId)
    return new Response(
      JSON.stringify({ message: "you can only delete the articles you added" }),
      { status: 404 }
    );
  // lets proceed and get the class with its resources and update it
  const getClass = await prisma.classes.findUnique({
    where: {
      id: classId,
    },
    select: {
      resourcesIds: true,
    },
  });
  // lets then filter out other arrays and save them
  const filteredResources = getClass?.resourcesIds.filter(
    (item) => item !== resourceId
  );
  try {
    await prisma.classes.update({
      where: { id: classId },
      data: { resourcesIds: filteredResources },
    });
    return new Response(
      JSON.stringify({
        message: "you have successfully deleted a class resources",
      }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}
