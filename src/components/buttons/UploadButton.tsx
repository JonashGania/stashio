"use client";

import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { uploadFile } from "@/actions/files";
import React, { useCallback, useState } from "react";
import UploadingLists from "../UploadingLists";
import { maxFileSize } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { usePathname } from "next/navigation";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { getFileType } from "@/lib/utils";
import { InfiniteDataResponse } from "@/types";

const UploadButton = ({ userId }: { userId: string | undefined }) => {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const pathname = usePathname();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const validFiles = acceptedFiles.filter(
        (file) => file.size <= maxFileSize
      );

      acceptedFiles.forEach((file) => {
        if (file.size > maxFileSize) {
          toast({
            variant: "destructive",
            title: `File is too large`,
            description: `${file.name} is too large. Max file size is 50Mb.`,
          });
        }
      });

      setFiles((prevFiles) => {
        const newFiles = validFiles.filter(
          (newFile) => !prevFiles.some((file) => file.name === newFile.name)
        );
        return [...prevFiles, ...newFiles];
      });

      const uploads = validFiles.map(async (file) => {
        const category = getFileType(file.name).type;
        try {
          const doneFile = await uploadFile(file, userId, pathname);
          if (doneFile) {
            setFiles((prevFiles) =>
              prevFiles.filter((f) => f.name !== doneFile.name)
            );

            queryClient.setQueriesData(
              { queryKey: ["files", userId, category], exact: false },
              (oldData: InfiniteData<InfiniteDataResponse>) => {
                if (!oldData) return oldData;

                return {
                  ...oldData,
                  pages: [
                    [
                      doneFile,
                      ...(Array.isArray(oldData.pages[0])
                        ? oldData.pages[0]
                        : []),
                    ],
                    ...oldData.pages.slice(1),
                  ],
                };
              }
            );
          }
        } catch (error) {
          console.error(error, "Error in uploading files");
          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.name !== file.name)
          );

          toast({
            variant: "destructive",
            title: `Upload failed`,
            description: `Failed to upload ${file.name}. Please try again.`,
          });
        }
      });

      await Promise.all(uploads);
    },
    [toast, userId, setFiles, pathname, queryClient]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (
    e: React.MouseEvent<SVGSVGElement>,
    fileName: string
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <button className="flex items-center gap-3  bg-white px-6 py-2 rounded-3xl shadow-sm shadow-zinc-500 hover:bg-[rgba(221,214,254,0.4)] dark:hover:bg-white hover:shadow-[0px_2px_4px_1px_rgba(145,145,145,0.75)] dark:hover:shadow-sm">
        <Upload color="#52525b" size={20} strokeWidth={1.7} />
        <span className="font-normal text-zinc-600">Upload</span>
      </button>

      {files.length > 0 && (
        <UploadingLists files={files} handleRemoveFile={handleRemoveFile} />
      )}
    </div>
  );
};

export default UploadButton;
