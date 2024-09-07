// here, we will be able to get only one parents
// also change the status to suspended or active
// also be able to delete their account
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

// get single teacher here
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  // perform authentication to check if is admin and authenticated
  const id = await serverSessionId();
  const role = await serverSessionRole();
  if (!id) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  try {
    const singleParents = await prisma.parents.findUnique({
      where: { id: params.id },
      include: {
        wards: {
          select: {
            name: true,
            createdAt: true,
            grade: true,
            gender: true,
            classes: {
              select: {
                subject: true,
                className: true,
              },
            },
          },
        },
      },
    });

    return new Response(JSON.stringify(singleParents), { status: 200 });
  } catch (error) {
    return serverError();
  }
}

// here we can suspend or activate the account
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { status } = await req.json();
  // perform authentication to check if is admin and authenticated
  const id = await serverSessionId();
  const role = await serverSessionRole();
  if (!id) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  try {
    // get the parents and check if it is existing,
    // we return error if it is not existing
    const parentExists = await prisma.parents.findUnique({
      where: { id: params.id },
      select: { id: true },
    });
    if (!parentExists)
      return new Response(
        JSON.stringify({ message: "this account does not exist" }),
        { status: 404 }
      );
    // now update the parents account
    await prisma.parents.update({
      where: { id: params.id },
      data: { status },
    });
    return new Response(
      JSON.stringify({ message: "account updated successfully!!!" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}

// here, we will be able to delete the account of the user
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // check if parents exists before trying to delete the account
    const parentExists = await prisma.parents.findUnique({
      where: { id: params.id },
      select: { id: true },
    });
    if (!parentExists) {
      return new Response(
        JSON.stringify({ message: "This account does not exist" }),
        { status: 404 }
      );
    }
    // now we can then delete the parents account
    await prisma.parents.delete({
      where: { id: params.id },
    });
    return new Response(
      JSON.stringify({ message: "account deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}
