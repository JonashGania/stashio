import React from "react";
import { X, LoaderCircle, CircleX } from "lucide-react";
import { getFileType, getFileIcon } from "@/lib/utils";
import Image from "next/image";

interface UploadingListsProps {
  files: File[];
  handleRemoveFile: (
    e: React.MouseEvent<SVGSVGElement>,
    fileName: string
  ) => void;
}

const UploadingLists = ({ files, handleRemoveFile }: UploadingListsProps) => {
  return (
    <div className="size-full h-fit max-w-[350px] bg-white fixed bottom-5 right-5 z-50 px-4 pt-1 pb-3 shadow shadow-zinc-400">
      <div className="flex gap-4 justify-between items-center">
        <h1 className="text-lg font-medium text-zinc-700">Uploading</h1>
        <button>
          <X size={20} />
        </button>
      </div>

      <ul className="flex flex-col gap-2 pt-4">
        {files.map((file) => {
          const { type, extension } = getFileType(file.name);

          return (
            <li
              key={file.name}
              className="flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={getFileIcon(type, extension)}
                  alt="thumbnail"
                  width={100}
                  height={100}
                  className="size-6 object-contain"
                />
                <p className="text-black text-sm max-w-[230px] w-full overflow-hidden text-ellipsis whitespace-nowrap ">
                  {file.name}
                </p>
              </div>
              <LoaderCircle
                size={20}
                color="#60a5fa  "
                strokeWidth={3}
                className="animate-spin group-hover:hidden"
              />
              <CircleX
                onClick={(e) => handleRemoveFile(e, file.name)}
                size={20}
                color="#000000"
                className="hidden group-hover:block cursor-pointer"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UploadingLists;
