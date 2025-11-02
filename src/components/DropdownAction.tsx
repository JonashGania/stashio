"use client";

import clsx from "clsx";
import { Files } from "@/types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Ellipsis, EllipsisVertical, Download } from "lucide-react";
import Link from "next/link";
import DetailsDialog from "./dialogs/DetailsDialog";
import RenameDialog from "./dialogs/RenameDialog";
import DeleteDialog from "./dialogs/DeleteDialog";
import { getDownloadUrl } from "@/lib/utils";

interface DropdownActionProps {
  layout: string;
  files: Files;
  userId: string;
  className?: string;
}

const DropdownAction = ({
  layout,
  files,
  userId,
  className,
}: DropdownActionProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={clsx(
            " transition-colors duration-200 w-7 h-7 rounded-md flex justify-center items-center",
            className
          )}
        >
          {layout === "table" ? (
            <Ellipsis
              size={15}
              className={`text-gray-700 ${className ? "dark:text-gray-700" : "dark:text-zinc-300"}`}
            />
          ) : (
            <EllipsisVertical
              size={20}
              className={`text-zinc-700 ${className ? "dark:text-gray-700" : "dark:text-zinc-300"}`}
            />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-48 shadow-zinc-400 shadow dark:shadow-none rounded-2xl py-2 px-0"
      >
        <DropdownMenuItem
          className="focus:bg-indigo-200/60 dark:focus:bg-zinc-800"
          onSelect={(e) => e.preventDefault()}
        >
          <DetailsDialog file={files} />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="focus:bg-indigo-200/60 dark:focus:bg-zinc-800"
          onSelect={(e) => e.preventDefault()}
        >
          <RenameDialog file={files} userId={userId} />
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-indigo-200/60 dark:focus:bg-zinc-800">
          <Link
            href={getDownloadUrl(files.fileId)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-2 w-full"
          >
            <Download size={20} className="text-black dark:text-gray-200" />
            <span className="text-black font-semibold dark:text-gray-200">
              Download
            </span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="focus:bg-indigo-200/60 dark:focus:bg-zinc-800"
          onSelect={(e) => e.preventDefault()}
        >
          <DeleteDialog file={files} userId={userId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownAction;
