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
        <button className="flex items-center gap-4 w-full px-2">
          <Info size={20} className="text-black dark:text-gray-200" />
          <span className="text-black font-semibold dark:text-gray-200">
            Details
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[340px] phone:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-normal text-2xl ">
            File Details
          </DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <div className="pt-1">
          <div className="relative w-full h-[180px] phone:h-[250px]">
            <Image
              src={isImage ? file.fileUrl : getFileIcon(type, extension)}
              alt={`${file.name} image`}
              fill
              sizes="w-full"
              className="rounded-lg object-contain"
            />
          </div>

          <div className="pt-6">
            <div className="pt-2 grid grid-cols-3 phone:grid-cols-4 gap-2 justify-items-center">
              <div className="flex items-center flex-col">
                <h3 className="text-sm text-center">Created</h3>
                <h4 className="text-zinc-600 dark:text-gray-400 text-xs">
                  {formatDate(file.createdAt.toString())}
                </h4>
              </div>
              <div className="flex items-center flex-col">
                <h3 className="text-sm text-center">Modified</h3>
                <h4 className="text-zinc-600 dark:text-gray-400 text-xs">
                  {formatDate(file.updatedAt.toString())}
                </h4>
              </div>
              <div className="flex items-center flex-col">
                <h3 className="text-sm text-center">Type</h3>
                <h4 className="text-zinc-600 dark:text-gray-400 text-xs">
                  {file.type}
                </h4>
              </div>
              <div className="flex items-center flex-col">
                <h3 className="text-sm text-center">Size</h3>
                <h4 className="text-zinc-600 dark:text-gray-400 text-xs">
                  {formatFileSize(file.size)}
                </h4>
              </div>
              <div className="flex items-center flex-col">
                <h3 className="text-sm text-center">Storage used</h3>
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
