import React from "react";
import { X } from "lucide-react";
import { getFileType } from "@/lib/utils";

const UploadingLists = ({ files }: { files: File[] }) => {
  return (
    <div className="size-full h-fit max-w-[350px] bg-white fixed bottom-5 right-5 z-50 px-4 pt-1 pb-3 shadow shadow-zinc-400">
      <div className="flex gap-4 justify-between items-center">
        <h1 className="text-lg text-zinc-700">Uploading</h1>
        <button>
          <X size={20} />
        </button>
      </div>

      <ul className="flex flex-col gap-2">
        {files.map((file) => {
          const { type, extension } = getFileType(file.name);

          return (
            <li key={file.name} className="flex justify-between">
              <div className="flex items-center gap-2"></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UploadingLists;
