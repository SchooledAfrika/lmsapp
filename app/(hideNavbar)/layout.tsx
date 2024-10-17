import type { Metadata } from "next";
import "../globals.css";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "SchooledAfrika",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <AuthProvider>
          <QueryProvider>
            <main className="bg-stone-100">{children}</main>
            <Toaster />
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
