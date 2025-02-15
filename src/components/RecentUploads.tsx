"use client";

import { getRecentUploaded } from "@/actions/files";
import { getFileType, getFileIcon, formatDateWithTime } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import DropdownAction from "./DropdownAction";
import Image from "next/image";

const RecentUploads = ({ userId }: { userId: string | undefined }) => {
  const {
    data: files = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recentUploads", userId],
    queryFn: () => getRecentUploaded(userId),
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center pt-8">
          <LoaderCircle
            size={45}
            color="#c4b5fd"
            strokeWidth={3}
            className="animate-spin "
          />
        </div>
      ) : files.length > 0 ? (
        <ul className="flex flex-col gap-5">
          {files.map((file) => {
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
                    <p className="text-zinc-700 font-medium recent-file-name">
                      {file.name}
                    </p>
                    <span className="text-sm text-zinc-400">
                      {formatDateWithTime(file.createdAt.toString())}
                    </span>
                  </div>
                </div>
                <DropdownAction
                  layout="table"
                  files={file}
                  userId={userId as string}
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
