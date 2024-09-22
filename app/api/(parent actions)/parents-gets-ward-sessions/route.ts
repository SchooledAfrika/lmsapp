// here we will be able to get the session of the ward
import prisma from "@/prisma/prismaConnect";
import { serverError } from "@/prisma/utils/error";
import {
  getQuery,
  serverSessionId,
  serverSessionRole,
} from "@/prisma/utils/utils";

export async function GET(req: Request) {
  const childId = getQuery(req.url, "childId");
  try {
  } catch (error) {
    return serverError();
  }
}
