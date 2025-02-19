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
import { Separator } from "./ui/separator";
import { Menu } from "lucide-react";
import { User } from "next-auth";
import { navItems } from "@/constants";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import UploadButton from "./buttons/UploadButton";
import StorageChart from "./StorageChart";
import SignOutButton from "./buttons/SignOutButton";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { StorageInfo } from "@/types";
import { useState } from "react";

interface MobileNavigationProps {
  user: User | undefined;
  storageInfo: StorageInfo | null;
}

const MobileNavigation = ({ user, storageInfo }: MobileNavigationProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button onClick={() => setOpen(true)}>
          <Menu
            size={40}
            className="text-zinc-700 dark:text-zinc-300"
            strokeWidth={2}
          />
        </button>
      </SheetTrigger>
      <SheetContent className="w-[65%] sm:w-[50%] px-3 flex flex-col h-full gap-0">
        <SheetHeader className="text-left">
          <SheetTitle>
            <div className="flex gap-3 items-center mb-3">
              <Avatar>
                <AvatarImage src={user?.image ?? undefined} alt="avatar" />
                <AvatarFallback className="bg-violet-500 text-white">
                  {user?.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
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
        <nav className="pt-4">
          <ul className="flex items-center flex-col">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.url}
                className={`w-full`}
                onClick={() => setOpen(false)}
              >
                <div
                  className={`flex items-center gap-2 px-4 py-3 rounded-[30px] ${
                    pathname === item.url
                      ? "bg-violet-500 hover:bg-violet-500"
                      : "bg-white dark:bg-gray-950 hover:bg-violet-100"
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
                    className={`font-medium text-lg ${
                      pathname === item.url
                        ? "text-white"
                        : "text-zinc-700 dark:text-gray-200"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              </Link>
            ))}
          </ul>
        </nav>

        <div className="pt-2">
          <UploadButton userId={user?.id} />
        </div>
        <Separator className="my-4" />
        <StorageChart storageInfo={storageInfo} />

        <SheetFooter className="mt-auto">
          <SignOutButton position="mobile-nav" />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
