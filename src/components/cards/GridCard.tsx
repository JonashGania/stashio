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
import { Checkbox } from "../ui/checkbox";

interface GridCardProps {
  files: Files[];
  selectedFiles: string[];
  handleSelectAll: () => void;
  handleSelectFile: (fileId: string) => void;
}

const GridCard = ({
  files,
  selectedFiles,
  handleSelectAll,
  handleSelectFile,
}: GridCardProps) => {
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
        <div>
          <button onClick={handleSelectAll} className="flex items-center gap-3">
            <Checkbox
              checked={selectedFiles.length > 0}
              className="border-gray-400 dark:border-gray-600 p-2"
            />
            <span
              className={`text-sm  ${selectedFiles.length > 0 ? "text-slate-700 dark:text-slate-300" : "text-slate-500"}`}
            >
              Select All
            </span>
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[1500px]:grid-cols-5 gap-6 mt-4">
            {files.map((file) => {
              const { type, extension } = getFileType(file.name);
              const isImage = type === "IMAGE" && extension !== "svg";
              const isSelected = selectedFiles.includes(file.id);

              return (
                <div
                  key={file.id}
                  className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-violet-500/10 bg-white dark:bg-slate-800/50
                    ${
                      isSelected
                        ? "border-violet-400 dark:border-violet-500/50 -translate-y-1 shadow-xl shadow-violet-500/10"
                        : " border-gray-200 dark:border-slate-700/50 hover:border-violet-400 dark:hover:border-violet-500/50"
                    }`}
                >
                  {/* Image/Icon Container */}
                  <Link
                    href={file.fileUrl}
                    className="relative w-full aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 overflow-hidden"
                    target="_blank"
                  >
                    <Image
                      src={
                        isImage ? file.fileUrl : getFileIcon(type, extension)
                      }
                      alt={`${file.name} preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className={`${
                        isImage
                          ? "object-cover group-hover:scale-105 transition-transform duration-500"
                          : "object-contain p-8"
                      }`}
                      loading={imageCount++ < 15 ? "eager" : "lazy"}
                      priority={files.indexOf(file) === 0}
                    />
                  </Link>

                  {/* File Info Container */}
                  <div className="flex flex-col gap-3 p-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate leading-tight">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {extension.toUpperCase()}
                      </p>
                    </div>

                    {/* File metadata */}
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-slate-700/50 rounded-md text-gray-600 dark:text-gray-300 font-medium">
                        {formatFileSize(Number(file.size))}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {formatDate(file.createdAt.toString())}
                      </span>
                    </div>
                  </div>

                  {/* Action Button - Top Right */}
                  <div className="absolute top-3 right-3 min-[550px]:opacity-0 min-[550px]:group-hover:opacity-100 transition-opacity duration-300 z-30">
                    <div className="backdrop-blur-md bg-white/90 dark:bg-slate-900/90 rounded-lg shadow-lg hover:scale-110 transition-transform duration-200">
                      <DropdownAction
                        layout="grid"
                        files={file}
                        userId={file.userId}
                        className=""
                      />
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 z-20">
                    <div
                      className={`backdrop-blur-md bg-white/90 dark:bg-slate-900/90 rounded-md shadow-lg p-[6px] transition-opacity duration-300
                        ${
                          isSelected
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                    >
                      <Checkbox
                        checked={isSelected}
                        className=" border-gray-500 dark:border-gray-400 p-2"
                        onCheckedChange={() => handleSelectFile(file.id)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default GridCard;
