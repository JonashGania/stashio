"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import { User } from "next-auth";
import { navItems } from "@/constants";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import StorageBar from "./StorageBar";
import SignOutButton from "./buttons/SignOutButton";
import { StorageInfo } from "@/types";
import { useState } from "react";

interface MobileNavigationProps {
  user: User;
  storageInfo: StorageInfo | null;
}

const MobileNavigation = ({ user, storageInfo }: MobileNavigationProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const usedPercentage =
    (Number(storageInfo?.usedSpace) / Number(storageInfo?.totalSpace)) * 100;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button onClick={() => setOpen(true)}>
          <Menu size={35} className="text-purple-600" strokeWidth={2} />
        </button>
      </SheetTrigger>
      <SheetContent className="w-[65%] sm:w-[50%] px-3 flex flex-col h-full gap-0">
        <SheetHeader className="text-left">
          <SheetTitle>
            <div className="flex gap-3 items-center mb-3">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div
                  className={`w-[40px] h-[40px] rounded-full bg-sky-100 font-medium text-violet-500 grid place-items-center`}
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex flex-col gap-0 max-w-[130px] sm:max-w-[200px]">
                <p className="font-medium text-base truncate capitalize">
                  {user?.name}
                </p>
                <p className="text-sm font-normal text-zinc-500 dark:text-gray-300 truncate">
                  {user?.email}
                </p>
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>
        <SheetDescription></SheetDescription>
        <nav className="py-4 ">
          <ul className="space-y-2">
            {navItems.map((item, index) => {
              const isActive = item.url === pathname;
              const Icon = item.icon;

              return (
                <Link
                  key={index}
                  prefetch={true}
                  href={item.url}
                  className={`group flex w-full items-center gap-3 px-[14px] py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                  }`}
                >
                  <Icon
                    size={20}
                    className={`dark:text-white flex-shrink-0 ${isActive ? "text-gray-white" : "text-gray-700"}`}
                  />
                  <div className={`flex-1 overflow-hidden`}>
                    <span
                      className={`font-medium ${isActive ? "text-white" : ""}`}
                    >
                      {item.name}
                    </span>
                  </div>

                  {isActive && (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </Link>
              );
            })}
          </ul>
        </nav>

        <SheetFooter className="mt-auto flex-col">
          <StorageBar
            usedPercentage={usedPercentage}
            usedSpace={storageInfo?.usedSpace}
          />
          <SignOutButton position="mobile-nav" />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
