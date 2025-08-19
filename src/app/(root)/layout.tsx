import { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebars from "@/components/Sidebar";
import Header from "@/components/Header";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <main className={`flex min-h-screen w-full bg-indigo-50 dark:bg-gray-950`}>
      <Sidebars />

      <section className="flex flex-col h-full w-full flex-1 md:pr-4 lg:pl-4">
        <Header user={user} />
        <div className="h-full flex-1">{children}</div>
      </section>
    </main>
  );
};

export default Layout;
