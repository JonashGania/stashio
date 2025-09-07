import { Files } from "@/types";
import {
  getFileIcon,
  getFileType,
  formatFileSize,
  formatDate,
} from "@/lib/utils";
import DropdownAction from "../DropdownAction";
import Image from "next/image";
import Link from "next/link";

const GridCard = ({ files }: { files: Files[] }) => {
  let imageCount = 0;
  return (
    <>
      {files.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No files yet
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Upload your first file to get started
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {files.map((file) => {
            const { type, extension } = getFileType(file.name);
            const isImage = type === "IMAGE" && extension !== "svg";

            return (
              <div
                key={file.id}
                className="flex flex-col gap-2 relative group p-3  rounded-lg"
              >
                <Link
                  href={file.fileUrl}
                  className="relative w-full aspect-[4/3] rounded-md  flex items-center justify-center"
                  target="_blank"
                >
                  <Image
                    src={isImage ? file.fileUrl : getFileIcon(type, extension)}
                    alt={`${file.name} image`}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className={`rounded-sm ${
                      isImage ? "object-cover" : "object-contain p-6"
                    }`}
                    loading={imageCount++ < 15 ? "eager" : "lazy"}
                    priority={files.indexOf(file) === 0}
                  />
                </Link>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Image
                    src={getFileIcon(type, extension)}
                    alt="thumbnail"
                    height={20}
                    width={20}
                  />
                  <span className="text-sm text-zinc-700 dark:text-white file-name font-medium">
                    {file.name}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-1">
                  <span>{formatFileSize(Number(file.size))}</span>
                  <span>{formatDate(file.createdAt.toString())}</span>
                </div>

                <div className="absolute top-2 right-2 transition-opacity duration-300">
                  <div className=" rounded-sm shadow-lg hover:scale-110 transition-transform duration-200">
                    <DropdownAction
                      layout="grid"
                      files={file}
                      userId={file.userId}
                      className="bg-white dark:bg-white"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default GridCard;
