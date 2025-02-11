import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../ui/table";
import { Files } from "@/types";
import { getFileIcon, getFileType } from "@/lib/utils";
import { Ellipsis } from "lucide-react";
import Image from "next/image";

const TableCard = ({ files }: { files: Files[] }) => {
  return (
    <>
      {files.length === 0 ? (
        <p className="text-lg text-zinc-400 font-medium text-center">
          No files uploaded
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">Name</TableHead>
              <TableHead className="w-[180px]">Type</TableHead>
              <TableHead className="w-[180px]">File size</TableHead>
              <TableHead className="w-[180px]">Uploaded</TableHead>
              <TableHead className="text-right w-[90px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file) => {
              const { type, extension } = getFileType(file.name);

              return (
                <TableRow key={file.id}>
                  <TableCell className="w-[400px] overflow-hidden text-ellipsis whitespace-nowrap flex items-center gap-2 text-zinc-600">
                    <Image
                      src={getFileIcon(type, extension)}
                      alt="thumbnail"
                      width={20}
                      height={20}
                    />
                    {file.name}
                  </TableCell>
                  <TableCell className="text-zinc-600">{file.type}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default TableCard;
