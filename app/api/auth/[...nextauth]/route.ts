import NextAuth from "next-auth";
import { authOptions } from "@/lib/nextAuth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      name: string;
      email: string;
      image: string;
      id: string;
      role: string;
      CompletedProfile: boolean;
    };
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
