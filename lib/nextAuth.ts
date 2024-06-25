import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

export const authOptions: NextAuthOptions = {
  // the providers appears below
  // making use of credential and google Oauth
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialProvider({
      name: "Your credential",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentails, req) {
        // here we get the role of the user that want to register
        // then use the role as a header while making a request
        const cookieInstance = cookies();
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
          method: "POST",
          body: JSON.stringify({
            email: credentails?.email,
            passwordcheck: credentails?.password,
          }),
          headers: {
            "content-type": "application/json",
          },
        });
        const result = await response.json();
        if (response.ok) {
          return result;
        }
        return null;
      },
    }),
  ],
  //   callback functions appears below
  //   this will run for Oath registration with emails
  callbacks: {
    // below is the signin callback function
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        // get the cookies from the frontend
        // then set it as the header to be used in backend communication
        const cookieInstance = cookies();
        const role = cookieInstance.get("role")?.value;
        await fetch(`${process.env.NEXTAUTH_URL}/api/register/google`, {
          method: "POST",
          body: JSON.stringify(user),
          headers: { "Content-Type": "application/json", role: role! },
        });
        return true;
      }
      return true;
    },
    // below is the session callback, which will help to populate some other important fields
    // into the already existing session
    async session({ session }) {
      // here we fetch data that we will use to update the users session data
      // based on the users email.
      const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/login/session`,
        { method: "POST", body: JSON.stringify({ email: session.user.email }) }
      );
      const result = await response.json();
      // here we update the session with some important information
      session.user.role = result.role;
      session.user.id = result.id;
      session.user.image = result.profilePhoto;
      session.user.CompletedProfile = result.CompletedProfile;
      return session;
    },
    async jwt({ token, session, trigger }) {
      if (trigger === "update" && session?.CompletedProfile) {
        token.CompletedProfile = session.CompletedProfile;
      }
      return token;
    },
  },
};
