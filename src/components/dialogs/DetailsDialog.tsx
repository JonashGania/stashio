import { Files } from "@/types";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import {
  getFileType,
  getFileIcon,
  formatFileSize,
  formatDate,
} from "@/lib/utils";
import { Info } from "lucide-react";
import Image from "next/image";

const DetailsDialog = ({ file }: { file: Files }) => {
  const { type, extension } = getFileType(file.name);
  const isImage = type === "IMAGE" && extension !== "svg";
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-[6px] w-full">
          <Info size={16} />
          <span className="text-zinc-600 dark:text-gray-200">Details</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[340px] phone:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-normal text-2xl">File info</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <div className="pt-1">
          <div className="relative w-full h-[180px] phone:h-[250px]">
            <Image
              src={isImage ? file.fileUrl : getFileIcon(type, extension)}
              alt={`${file.name} image`}
              fill
              sizes="w-full"
              className="rounded-md border border-zinc-300 dark:border-zinc-700 object-cover"
            />
          </div>

          <div className="pt-6">
            <h2 className="font-medium text-center">File Details</h2>
            <div className="pt-2 grid grid-cols-3 phone:grid-cols-4 gap-2">
              <div className="flex items-center flex-col">
                <h3 className="text-sm">Created</h3>
                <h4 className="text-zinc-600 dark:text-gray-400 text-xs">
                  {formatDate(file.createdAt.toString())}
                </h4>
              </div>
              <div className="flex items-center flex-col">
                <h3 className="text-sm">Modified</h3>
                <h4 className="text-zinc-600 dark:text-gray-400 text-xs">
                  {formatDate(file.updatedAt.toString())}
                </h4>
              </div>
              <div className="flex items-center flex-col">
                <h3 className="text-sm">Type</h3>
                <h4 className="text-zinc-600 dark:text-gray-400 text-xs">
                  {file.type}
                </h4>
              </div>
              <div className="flex items-center flex-col">
                <h3 className="text-sm">Size</h3>
                <h4 className="text-zinc-600 dark:text-gray-400 text-xs">
                  {formatFileSize(file.size)}
                </h4>
              </div>
              <div className="flex items-center flex-col">
                <h3 className="text-sm">Storage used</h3>
                <h4 className="text-zinc-600 dark:text-gray-400 text-xs">
                  {formatFileSize(file.size)}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;
