import type { Metadata } from "next";
import React from "react";
// import MobileNav from "@/components/ui/admin-dashboard/navbar/MobileNav";
import MobileSideBar from "@/components/ui/school-dashboard/sidebar/MobileSideBar";
import Navbar from "@/components/ui/admin-dashboard/navbar/navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextAuth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/ui/school-dashboard/sidebar/sidebar";
import ConfirmLogout from "@/components/ui/ConfirmLogout";
import CommonDashboardContext from "@/providers/Statecontext";
import MobileNav from "@/components/ui/school-dashboard/navbar/MobileNav";

export const metadata: Metadata = {
  title: "SchooledAfrika | Admin",
  description: "Admin dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // here, we get the session, used the session to regulate the flow of users
  // if the users role is  not equal to Admin, we redirect the user to home page
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "Admin") return redirect("/");
  return (
    <CommonDashboardContext>
      <main className="bg-stone-100 flex flex-col sm:flex-row font-header">
        <div className=" hidden sm:block sm:flex-4 md:flex-2 font-semibold  px-6 py-10 bg-white h-screen sticky top-0 overflow-auto scrollbar-hide">
          <Sidebar dashboard="admin" />
        </div>
        <div className=" sm:flex-10 md:flex-12 h-full md:px-8 px-4">
          {/* this component below serves the purpose of the pricing model */}
          <ConfirmLogout />
          <MobileSideBar dashboard="admin" />
          <Navbar dashboard="admin" />
          <MobileNav />
          {children}
        </div>
      </main>
    </CommonDashboardContext>
  );
}
