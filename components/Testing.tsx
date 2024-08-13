"use client";

import React, { useState, useEffect } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Icheck {
  email: string;
  password: string;
}
const Testing = () => {
  const router = useRouter();
  const [checkedItem, setCheckedItem] = useState<string | null>(null);
  const [credentials, setCredentials] = useState<Icheck>({
    email: "",
    password: "",
  });
  const { data, status } = useSession();
  const handleSelectRole = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedItem(e.target.name);
    Cookies.set("role", e.target.name);
  };
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
  }, [status, data, router]);

  const handleCreate = (name: string) => {
    if (name === "google") {
      signIn("google");
    } else {
      signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
      });
    }
  };

  return (
    <div>
      <div className=" flex flex-col gap-2">
        <div className=" flex gap-2 px-2 py-1 rounded-sm bg-slate-500">
          <p>teacher</p>
          <input
            type="checkbox"
            name="teacher"
            checked={checkedItem === "teacher"}
            onChange={handleSelectRole}
          />
        </div>
        <div className=" flex gap-2 px-2 py-1 rounded-sm bg-slate-500">
          <p>student</p>
          <input
            type="checkbox"
            name="student"
            checked={checkedItem === "student"}
            onChange={handleSelectRole}
          />
        </div>
        <div className=" flex gap-2 px-2 py-1 rounded-sm bg-slate-500">
          <p>parents</p>
          <input
            type="checkbox"
            name="parents"
            checked={checkedItem === "parents"}
            onChange={handleSelectRole}
          />
        </div>
        <div className=" flex gap-2 px-2 py-1 rounded-sm bg-slate-500">
          <p>school</p>
          <input
            type="checkbox"
            name="school"
            checked={checkedItem === "school"}
            onChange={handleSelectRole}
          />
        </div>
      </div>
      <button
        className=" cursor-pointer"
        onClick={() => handleCreate("google")}
      >
        sign with google
      </button>
      <div>
        <input
          value={credentials.email}
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <input
          value={credentials.password}
          onChange={(e) =>
            setCredentials((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <button onClick={() => handleCreate("credentails")}>submit</button>
      </div>
      {status === "authenticated" && (
        <button
          onClick={() => signOut()}
          className=" bg-red-600 text-white px-3 py-2 rounded-sm"
        >
          logout
        </button>
      )}
    </div>
  );
};

export default Testing;
