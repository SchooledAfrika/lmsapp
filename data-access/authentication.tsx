import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

// handle the registration of user
export const useAuth = () => {
  const router = useRouter();
  const { data, status } = useSession();
  // useeffect to watch when authentication changes
  useEffect(() => {
    if (data?.user === undefined) return;
    if (data?.user.role === "School") {
      router.push(`${process.env.NEXT_PUBLIC_HOMEPAGE}/school-dashboard`);
    }
    if (data?.user.role === "Teacher") {
      console.log("hello all");
      router.push(`${process.env.NEXT_PUBLIC_HOMEPAGE}/teacher-dashboard`);
    }
    if (data?.user.role === "Parents") {
      router.push(`${process.env.NEXT_PUBLIC_HOMEPAGE}/parents-dashboard`);
    }
    if (data?.user.role === "Student") {
      router.push(`${process.env.NEXT_PUBLIC_HOMEPAGE}/student-dashboard`);
    }
  }, [status, data]);
  //   this function handles registration of users using the credentials provider
  const handleCredentialReg = async (email: string, password: string) => {
    const response = await fetch("/api/register/email", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    if (response.ok) {
      return router.push("/login");
    }
    alert(result.message);
  };

  //   this function handles the register/login of users with the google provider
  const handleLogin = (
    loginType: string,
    email?: string,
    password?: string
  ) => {
    if (loginType === "google") {
      signIn("google");
    } else if (loginType === "credentials") {
      signIn("credentials", { email, password });
    }
  };

  // all function hook returns
  return { handleCredentialReg, handleLogin };
};
