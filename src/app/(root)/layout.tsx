import { ReactNode } from "react";
import Sidebars from "@/components/Sidebar";
import Header from "@/components/Header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className={`flex min-h-screen w-full dark:bg-gray-950`}>
      <Sidebars />

      <section className="flex flex-col h-full w-full flex-1 md:pr-4 lg:pl-4">
        <Header />
        <div className="h-full flex-1">{children}</div>
      </section>
    </main>
  );
};

export default Layout;
