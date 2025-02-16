"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Files } from "@/types";
import {
  formatFileSize,
  getFileType,
  getFileIcon,
  formatDate,
} from "@/lib/utils";
import DropdownAction from "./DropdownAction";
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
          <span className="text-zinc-800 max-w-[180px] sm:max-w-[300] truncate">
            {row.getValue("name")}
          </span>
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
    header: "Size",
    cell: ({ row }) => {
      const formattedSize = formatFileSize(row.getValue("size"));
      return <div>{formattedSize}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Uploaded",
    cell: ({ row }) => {
      const date = formatDate(row.getValue("createdAt"));
      return <div>{date}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const file = row.original;

      return (
        <DropdownAction layout="table" files={file} userId={file.userId} />
      );
    },
  },
];
