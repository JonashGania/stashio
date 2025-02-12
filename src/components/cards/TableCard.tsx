"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Files } from "@/types";
import { getFileIcon, getFileType } from "@/lib/utils";
import { Ellipsis } from "lucide-react";
import Image from "next/image";

interface TableCardProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const TableCard = <TData, TValue>({
  columns,
  data,
}: TableCardProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-black">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-zinc-600">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-zinc-600"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    // <>
    //   {files.length === 0 ? (
    //     <p className="text-lg text-zinc-400 font-medium text-center">
    //       No files uploaded
    //     </p>
    //   ) : (
    //     <Table>
    //       <TableHeader>
    //         <TableRow>
    //           <TableHead className="w-[400px]">Name</TableHead>
    //           <TableHead className="w-[180px]">Type</TableHead>
    //           <TableHead className="w-[180px]">File size</TableHead>
    //           <TableHead className="w-[180px]">Uploaded</TableHead>
    //           <TableHead className="text-right w-[90px]">Action</TableHead>
    //         </TableRow>
    //       </TableHeader>
    //       <TableBody>
    //         {files.map((file) => {
    //           const { type, extension } = getFileType(file.name);

    //           return (
    //             <TableRow key={file.id}>
    //               <TableCell className="w-[400px] overflow-hidden text-ellipsis whitespace-nowrap flex items-center gap-2 text-zinc-600">
    //                 <Image
    //                   src={getFileIcon(type, extension)}
    //                   alt="thumbnail"
    //                   width={20}
    //                   height={20}
    //                 />
    //                 {file.name}
    //               </TableCell>
    //               <TableCell className="text-zinc-600">{file.type}</TableCell>
    //             </TableRow>
    //           );
    //         })}
    //       </TableBody>
    //     </Table>
    //   )}
    // </>
  );
};

export default TableCard;
