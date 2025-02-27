"use client";

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
}

const DropdownAction = ({ layout, files, userId }: DropdownActionProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          {layout === "table" ? (
            <Ellipsis size={15} className="text-zinc-600 dark:text-zinc-300" />
          ) : (
            <EllipsisVertical
              size={20}
              className="text-zinc-600 dark:text-zinc-300"
            />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-40 shadow-zinc-400 shadow dark:shadow-none"
      >
        <DropdownMenuItem
          className="focus:bg-zinc-300 dark:focus:bg-zinc-800"
          onSelect={(e) => e.preventDefault()}
        >
          <DetailsDialog file={files} />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="focus:bg-zinc-300 dark:focus:bg-zinc-800"
          onSelect={(e) => e.preventDefault()}
        >
          <RenameDialog file={files} userId={userId} />
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-zinc-300 dark:focus:bg-zinc-800">
          <Link
            href={getDownloadUrl(files.fileId)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-[6px]"
          >
            <Download size={16} />
            <span className="text-zinc-600 dark:text-gray-200">Download</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="focus:bg-zinc-300 dark:focus:bg-zinc-800"
          onSelect={(e) => e.preventDefault()}
        >
          <DeleteDialog file={files} userId={userId} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownAction;
