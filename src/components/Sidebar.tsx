"use client";

import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/constants";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAvailabeStorage } from "@/actions/files";
import { User } from "next-auth";
import StorageBar from "./StorageBar";

const Sidebars = ({ user }: { user: User }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const { data: storageInfo } = useQuery({
    queryKey: ["storageInfo", user.id],
    queryFn: () => getAvailabeStorage(user.id),
    enabled: !!user.id,
    refetchOnWindowFocus: false,
  });

  const usedPercentage =
    (Number(storageInfo?.usedSpace) / Number(storageInfo?.totalSpace)) * 100;

  return (
    <aside
      className={`hidden md:block transition-all duration-300 h-screen sticky top-0 left-0 ${isCollapsed ? "w-20" : "w-72"} bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-700/50`}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 to-transparent dark:from-purple-900/20 dark:to-transparent"></div>

      {/* Animated background elements */}
      <div className="absolute top-20 -left-10 w-32 h-32 bg-purple-200/30 dark:bg-purple-500/10 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-40 -right-10 w-24 h-24 bg-pink-200/30 dark:bg-pink-500/10 rounded-full blur-xl animate-pulse animation-delay-2000"></div>

      <div className="relative h-full flex flex-col z-10">
        <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <Link href="/" prefetch={true} className="flex items-center gap-3">
              <Image src="/assets/logo.svg" alt="logo" height={50} width={50} />
              <div
                className={`transition-all duration-300 ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"} overflow-hidden`}
              >
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Stashio
                </h1>
              </div>
            </Link>

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 absolute -right-4"
            >
              {isCollapsed ? (
                <ChevronRight
                  size={20}
                  className="text-black dark:text-gray-200"
                />
              ) : (
                <ChevronLeft
                  size={20}
                  className="text-black dark:text-gray-200"
                />
              )}
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item, index) => {
              const isActive = item.url === pathname;
              const Icon = item.icon;

              return (
                <Link
                  key={index}
                  prefetch={true}
                  href={item.url}
                  className={`group flex items-center gap-3 px-[14px] py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${isCollapsed ? "w-[47px]" : "w-full"} ${
                    isActive
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                  }`}
                >
                  <Icon
                    size={20}
                    className={`dark:text-white flex-shrink-0 ${isActive ? "text-gray-white" : "text-gray-700"}`}
                  />
                  <div
                    className={`flex-1 transition-all duration-300 ${isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"} overflow-hidden`}
                  >
                    <span
                      className={`font-medium ${isActive ? "text-white" : ""}`}
                    >
                      {item.name}
                    </span>
                  </div>

                  {isActive && !isCollapsed && (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </Link>
              );
            })}
          </ul>
        </nav>

        <div className="p-4">
          <StorageBar
            usedSpace={storageInfo?.usedSpace}
            usedPercentage={usedPercentage}
            className={`${isCollapsed ? "opacity-0 h-0 p-0 mb-0" : "opacity-100 "}`}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebars;
