"use client";

import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/constants";
import { usePathname } from "next/navigation";

const Sidebars = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden md:block transition-all duration-300 h-svh sticky top-0 left-0 border-r border-r-zinc-200 sidebar">
      <div className="px-5 lg:px-4 pt-3 pb-5 flex flex-col">
        <Link href="/" className="flex items-center gap-1">
          <Image src="/assets/logo.svg" alt="logo" height={50} width={50} />
          <span className="font-medium text-2xl mt-2 hidden lg:block">
            Stashio
          </span>
        </Link>
        <nav className="pt-4">
          <ul className="flex items-center flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.url}
                className={`w-[41px] lg:w-full`}
              >
                <div
                  className={`lg:flex lg:items-center gap-2 px-2 lg:px-4 py-2 rounded-lg lg:rounded-3xl ${
                    pathname === item.url
                      ? "bg-violet-500 hover:bg-violet-500"
                      : "bg-white hover:bg-violet-100"
                  }`}
                >
                  <Image
                    src={item.icon}
                    alt={`${item.name} icon`}
                    height={25}
                    width={25}
                    className={`transition-all
                    ${pathname === item.url ? "nav-icon-active" : "nav-icon"}
                  `}
                  />
                  <span
                    className={`font-medium hidden lg:block ${
                      pathname === item.url ? "text-white" : "text-zinc-700"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebars;
