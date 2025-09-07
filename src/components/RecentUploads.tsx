import { getFileType, getFileIcon, formatDateWithTime } from "@/lib/utils";
import DropdownAction from "./DropdownAction";
import Image from "next/image";
import { Files } from "@/types";

const RecentUploads = ({ recentUploads }: { recentUploads: Files[] }) => {
  let imageCount = 0;

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
                  <div className="relative">
                    <Image
                      src={
                        isImage ? file.fileUrl : getFileIcon(type, extension)
                      }
                      alt="thumbnail"
                      width={50}
                      height={50}
                      loading={imageCount++ < 15 ? "eager" : "lazy"}
                      className="w-[50px] h-[50px] rounded-lg object-contain"
                    />
                  </div>
                  <div className="flex-1 flex flex-col ">
                    <p className="text-gray-900 dark:text-white font-medium recent-file-name group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                      {file.name}
                    </p>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">
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
