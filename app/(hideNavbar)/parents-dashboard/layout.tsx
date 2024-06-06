import type { Metadata } from "next";
import Sidebar from "@/components/ui/school-dashboard/sidebar/sidebar";
import Navbar from "@/components/ui/school-dashboard/navbar/navbar";
import MobileNav from "@/components/ui/school-dashboard/navbar/MobileNav";
import MobileSideBar from "@/components/ui/school-dashboard/sidebar/MobileSideBar";
import CommonDashboardContext from "@/providers/Statecontext";

export const metadata: Metadata = {
  title: "School",
  description: "School dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CommonDashboardContext>
        <main className="bg-stone-100 flex flex-col sm:flex-row font-header">
          <div className=" hidden sm:block sm:flex-4 md:flex-2 font-semibold  px-6 py-10 bg-white h-screen sticky top-0 overflow-auto scrollbar-hide">
            <Sidebar dashboard="parent" />
          </div>
          <div className=" sm:flex-10 md:flex-12 h-full md:px-8 px-4">
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
