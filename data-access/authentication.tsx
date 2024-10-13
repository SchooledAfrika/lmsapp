import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { toast } from "react-toastify";

// handle the registration of user
export const useAuth = () => {
  const router = useRouter();
  const { data, status } = useSession();
  const [loading, setloading] = useState<boolean>(false);
  const { toast: mytoast } = useToast();
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
    if (data?.user.role === "Admin") {
      router.push(`${process.env.NEXT_PUBLIC_HOMEPAGE}/admin-dashboard`);
    }
  }, [status, data]);
  //   this function handles registration of users using the credentials provider
  const handleCredentialReg = async (email: string, password: string) => {
    setloading(true);
    const response = await fetch("/api/register/email", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const result = await response.json();
    if (response.ok) {
      return router.push("/login?newAccount=true");
    }
    setloading(false);
    toast.error(result.message);
  };

  //   this function handles the register/login of users with the google provider
  const handleLogin = async (
    loginType: string,
    email?: string,
    password?: string
  ) => {
    if (loginType === "google") {
      signIn("google");
    } else {
      setloading(true);
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        setloading(false);
        mytoast({
          variant: "destructive",
          title: "Login failed",
          description: `${result.error} check your email and password`,
        });
      }
    }
  };

  // all function hook returns
  return { handleCredentialReg, handleLogin, loading };
};
