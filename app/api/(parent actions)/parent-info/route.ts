// here we will be able to get some information about the parents that is logged in
// just informations about the wards that is registered
// like their names, id, profile photo and stutus
import prisma from "@/prisma/prismaConnect";
import {
  notAuthenticated,
  onlyParents,
  serverError,
} from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(req: Request) {
  const parentId = await serverSessionId();
  const role = await serverSessionRole();
  if (!parentId) return notAuthenticated();
  if (role !== "Parents") return onlyParents();
  try {
    const teacherBasicInfo = await prisma.parents.findUnique({
      where: { id: parentId },
      select: {
        id: true,
        wards: {
          select: {
            id: true,
            name: true,
            profilePhoto: true,
            status: true,
          },
        },
      },
    });
    return new Response(JSON.stringify(teacherBasicInfo), { status: 200 });
  } catch (error) {
    return serverError();
  }
}
