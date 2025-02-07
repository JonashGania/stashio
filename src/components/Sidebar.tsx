"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "./ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/constants";
import { usePathname } from "next/navigation";
import StorageChart from "./StorageChart";

const Sidebars = () => {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="px-5">
        <Link href="/" className="flex items-center gap-1">
          <Image src="/assets/logo.svg" alt="logo" height={50} width={50} />
          <span className="font-medium text-2xl mt-2 mt-">Stashio</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-5">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`px-4 py-5 rounded-[25px] ${
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
                          ${
                            pathname === item.url
                              ? "nav-icon-active"
                              : "nav-icon"
                          }
                        `}
                      />
                      <span
                        className={`text-lg font-medium ${
                          pathname === item.url ? "text-white" : "text-zinc-700"
                        }`}
                      >
                        {item.name}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarContent className="gap-0">
            {/* <StorageChart /> */}
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default Sidebars;
