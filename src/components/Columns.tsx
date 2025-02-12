"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Files } from "@/types";
import { format } from "date-fns";
import { formatFileSize, getFileType, getFileIcon } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import Image from "next/image";

export const columns: ColumnDef<Files>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const { extension, type } = getFileType(row.getValue("name"));

      return (
        <div className="flex items-center gap-2">
          <Image
            src={getFileIcon(type, extension)}
            alt="thumbnail"
            width={20}
            height={20}
          />
          <span className="text-zinc-800">{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "size",
    header: "File size",
    cell: ({ row }) => {
      const formattedSize = formatFileSize(row.getValue("size"));
      return <div>{formattedSize}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Uploaded",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formatted = format(date, "MMM d, yyyy");
      return <div>{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const file = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <Ellipsis size={15} color="#52525b " />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
