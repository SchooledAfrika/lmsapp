import type { Metadata } from "next";
import Sidebar from "@/components/ui/school-dashboard/sidebar/sidebar";
import Navbar from "@/components/ui/school-dashboard/navbar/navbar";
import MobileNav from "@/components/ui/school-dashboard/navbar/MobileNav";
import MobileSideBar from "@/components/ui/school-dashboard/sidebar/MobileSideBar";
import CommonDashboardContext from "@/providers/Statecontext";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/nextAuth";
import React from "react";
import { cookies } from "next/headers";
import ConfirmLogout from "@/components/ui/ConfirmLogout";
export const metadata: Metadata = {
  title: "SchooledAfrika | Parents Dashboard",
  description: "Parents dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // here, we get the session, used the session to regulate the flow of users
  // if the users role is  not equal to Parents, we redirect the user to home page
  // then if the completedProle is false, we redirect the users to go and complete their profiles
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "Parents") return redirect("/");
  if (!session?.user.CompletedProfile)
    return redirect("/parent-account/details");
  // now, lets check if the ward is selected before visiting any of this page
  const cookieStore = cookies;
  const wardId = cookieStore().get("wardId")?.value;
  console.log("the wardId", wardId);
  if (!wardId) return redirect("/parent-account/ward-options");
  return (
    <>
      <CommonDashboardContext>
        <main className="bg-stone-100 flex flex-col sm:flex-row font-header">
          <div className=" hidden sm:block sm:flex-4 md:flex-2 font-semibold  px-6 py-10 bg-white h-screen sticky top-0 overflow-auto scrollbar-hide">
            <Sidebar dashboard="parent" />
          </div>
          <div className=" sm:flex-10 md:flex-12 h-full md:px-8 px-4">
            <ConfirmLogout />
            <MobileSideBar dashboard="parent" />
            <Navbar dashboard="parent" />
            <MobileNav />
            {children}
          </div>
        </main>
      </CommonDashboardContext>
    </>
  );
}
