import { Files } from "@/types";
import { getFileIcon, getFileType } from "@/lib/utils";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const GridCard = ({ files }: { files: Files[] }) => {
  return (
    <>
      {files.length === 0 ? (
        <p className="text-lg text-zinc-400 font-medium text-center">
          No files uploaded
        </p>
      ) : (
        <div className="card-grid-layout">
          {files.map((file) => {
            const { type, extension } = getFileType(file.name);

            return (
              <div key={file.id} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Image
                      src={getFileIcon(type, extension)}
                      alt="thumbnail"
                      height={20}
                      width={20}
                    />
                    <span className="text-sm text-zinc-700 file-name font-medium">
                      {file.name}
                    </span>
                  </div>
                  <button>
                    <EllipsisVertical size={20} color="#3f3f46" />
                  </button>
                </div>
                <Link
                  href={file.fileUrl}
                  className="relative w-full h-[220px] rounded-md"
                  target="_blank"
                >
                  <Image
                    src={file.fileUrl}
                    alt={`${file.name} image`}
                    fill
                    objectFit="cover"
                    className="rounded-sm"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default GridCard;
