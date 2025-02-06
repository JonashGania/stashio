import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebars from "@/components/Sidebar";
import Header from "@/components/Header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider style={{ "--sidebar-width": "280px" }}>
      <main className="flex h-screen w-full">
        <Sidebars />

        <section className="flex flex-col h-full w-full flex-1 px-4">
          <Header />
          <div>{children}</div>
        </section>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
