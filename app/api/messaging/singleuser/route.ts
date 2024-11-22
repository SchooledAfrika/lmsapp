// here, we should be able to send message to only one user
import { MessageUsers } from "@/prisma/utils/Emails/messageUser";
import { notAuthenticated, onlyAdmin, serverError } from "@/prisma/utils/error";
import { serverSessionId, serverSessionRole } from "@/prisma/utils/utils";

export async function POST(req: Request) {
  const { email, subject, message } = await req.json();
  // check for authentication and make sure that is admin sending mails
  const userId = await serverSessionId();
  const role = await serverSessionRole();
  if (!userId) return notAuthenticated();
  if (role !== "Admin") return onlyAdmin();
  // lets check if all the required fields is there already
  if (!email || !subject || !message) {
    return new Response(
      JSON.stringify({ message: "please enter all the fields" }),
      { status: 404 }
    );
  }
  try {
    return MessageUsers(email, subject, message);
  } catch (error) {
    return serverError();
  }
}
