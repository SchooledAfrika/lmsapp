// here, we will be able to get only one student
// also perform deleting an account here
// and also restricting the account where neccessary
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = await serverSessionId();
  const role = await serverSessionRole();
  if (!id) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  try {
    const oneStudent = await prisma.student.findUnique({
      where: { id: params.id },
      include: {
        classes: true,
      },
    });
    return new Response(JSON.stringify(oneStudent), { status: 200 });
  } catch (error) {
    return serverError();
  }
}

// update the student account by restricting or suspending it
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { status } = await req.json();
  const id = await serverSessionId();
  const role = await serverSessionRole();
  if (!id) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  try {
    const studentExist = await prisma.student.findUnique({
      where: { id: params.id },
      select: {
        id: true,
      },
    });
    // return an error if the student we want to restrict or activate back does not exist
    if (!studentExist)
      return new Response(
        JSON.stringify({ message: "this account does not exist" }),
        { status: 404 }
      );
    // now we can update the status of the student
    await prisma.student.update({
      where: { id: params.id },
      data: {
        status,
      },
    });
    return new Response(
      JSON.stringify({ message: `student status is ${status}` })
    );
  } catch (error) {
    return serverError();
  }
}

// here, admin will be able to delete student account
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = await serverSessionId();
  const role = await serverSessionRole();
  if (!id) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  try {
    await prisma.student.delete({
      where: { id: params.id },
    });
    return new Response(
      JSON.stringify({ message: "student deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return serverError();
  }
}
