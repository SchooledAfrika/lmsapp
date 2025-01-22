//  here we will get the total hour done so far in the platform
import prisma from "@/prisma/prismaConnect";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  if (!userId) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();

  try {
    // getting the total hours in one on one sessions
    const sessionHours = await prisma.sessionAttendance.findMany();
    const totalSessionHours = sessionHours.reduce((acc, item) => {
      return acc + item.duration;
    }, 0);
    // getting the total hours in the special request time
    const specialRequestHours =
      await prisma.specialRequestAttendance.findMany();
    const totalSpecialRequestHours = specialRequestHours.reduce((acc, item) => {
      return acc + item.duration;
    }, 0);

    return new Response(
      JSON.stringify({ total: totalSpecialRequestHours + totalSessionHours }),
      { status: 200 }
    );
  } catch (error) {
    return serverError();
  }
}
