// here, we will be able to get only one school based on their id
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

// here we get a particular school
// and return basic information about it
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  // check authentication
  const id = await serverSessionId();
  if (!id) return notAuthenticated();
  // check for the role
  const role = await serverSessionRole();
  if (role !== "Admin") {
    return new Response(JSON.stringify({ message: "only admin is allowed" }), {
      status: 404,
    });
  }
  try {
    const oneSchool = await prisma.school.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNo: true,
        createdAt: true,
        schAddress: true,
      },
    });
    return new Response(JSON.stringify(oneSchool), { status: 200 });
  } catch (error) {
    return serverError();
  }
}

// here we will delete a school
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = await serverSessionId();
  if (!id) return notAuthenticated();
  const role = await serverSessionRole();
  if (role !== "Admin") return onlyAdmin();
  try {
    const oneSchool = await prisma.school.findUnique({
      where: { id: params.id },
      select: {
        id: true,
      },
    });
    if (!oneSchool)
      return new Response(JSON.stringify({ message: "School not found" }), {
        status: 401,
      });
    // now we can perform the delete action since the school actually exists
    await prisma.school.delete({
      where: { id: params.id },
    });
    return new Response(
      JSON.stringify({ message: "School deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return serverError();
  }
}
