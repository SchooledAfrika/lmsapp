// here, we will be able to approve kyc of the teachers
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

// here we will then update the kyc to approve or rejected
export async function PUT(req: Request) {
  const { teacherId, status } = await req.json();
  //   check for authentication and if admin is present there
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  if (!userId) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  // lets check if the kyc exists first
  const isKyc = await prisma.kyc.findUnique({ where: { teacherId } });
  if (!isKyc)
    return new Response(
      JSON.stringify({ message: "This kyc does not exist" }),
      { status: 404 }
    );
  try {
    // now we can proceed to update the kyc as required
    await prisma.kyc.update({
      where: { teacherId },
      data: {
        status,
      },
    });
    return new Response(
      JSON.stringify({ message: "kyc updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}
