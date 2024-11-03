import React from "react";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      
      <div className="flex w-screen overflow-hidden">
      <Sidebar />

        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 overflow-hidden sm:px-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default HomeLayout;
