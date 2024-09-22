// this will handle getting only a single exam
// this may be exam from one on one session
// or single exam from class
import prisma from "@/prisma/prismaConnect";
import { serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function GET(
  req: Request,
  { params }: { params: { examId: string } }
) {
  try {
  } catch (error) {
    return serverError();
  }
}
