import type { Metadata } from "next";
import PricingLayout from "@/components/ui/Pricing-layout";
import MobileNav from "@/components/ui/school-dashboard/navbar/MobileNav";
import Navbar from "@/components/ui/school-dashboard/navbar/navbar";
import MobileSideBar from "@/components/ui/school-dashboard/sidebar/MobileSideBar";
import Sidebar from "@/components/ui/school-dashboard/sidebar/sidebar";
import { authOptions } from "@/lib/nextAuth";
import CommonDashboardContext from "@/providers/Statecontext";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import ConfirmLogout from "@/components/ui/ConfirmLogout";

export const metadata: Metadata = {
  title: "SchooledAfrika | Teachers Dashboard",
  description: "Teacher dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // here, we get the session
  // redirect if the role is not teacher
  // redirect if the completedprofile is false
  const session = await getServerSession(authOptions);
  if (session?.user.role !== "Teacher") return redirect("/");
  if (!session.user.CompletedProfile)
    return redirect("/teacher-account/details");
  return (
    <>
      <CommonDashboardContext>
        <main className="bg-stone-100 flex flex-col sm:flex-row font-header">
          <div className=" hidden sm:block sm:flex-4 md:flex-2 font-semibold  px-6 py-10 bg-white h-screen sticky top-0 overflow-auto scrollbar-hide">
            <Sidebar dashboard="teacher" />
          </div>
          <div className=" sm:flex-10 md:flex-12 h-full md:px-8 px-4">
            {/* this component below serves the purpose of the pricing model */}
            <PricingLayout />
            <ConfirmLogout />
            <MobileSideBar dashboard="teacher" />
            <Navbar dashboard="teacher" />
            <MobileNav />
            {children}
          </div>
        </main>
      </CommonDashboardContext>
    </>
  );
}
