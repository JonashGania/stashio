import { getFileType, getFileIcon, formatDateWithTime } from "@/lib/utils";
import DropdownAction from "./DropdownAction";
import Image from "next/image";
import { Files } from "@/types";

const RecentUploads = ({ recentUploads }: { recentUploads: Files[] }) => {
  return (
    <>
      {recentUploads.length > 0 ? (
        <ul className="flex flex-col gap-5">
          {recentUploads.map((file) => {
            const { extension, type } = getFileType(file.name);
            const isImage = type === "IMAGE" && extension !== "svg";

            return (
              <li key={file.id} className="flex justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-[50px] h-[50px] relative">
                    <Image
                      src={
                        isImage ? file.fileUrl : getFileIcon(type, extension)
                      }
                      alt="thumbnail"
                      fill
                      sizes="w-full"
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col ">
                    <p className="text-zinc-700 dark:text-gray-200 font-medium recent-file-name">
                      {file.name}
                    </p>
                    <span className="text-sm text-zinc-400 dark:text-zinc-300">
                      {formatDateWithTime(file.createdAt.toString())}
                    </span>
                  </div>
                </div>
                <DropdownAction
                  layout="table"
                  files={file}
                  userId={file.userId}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-lg text-zinc-400 font-medium text-center">
          No files uploaded
        </p>
      )}
    </>
  );
};

export default RecentUploads;
