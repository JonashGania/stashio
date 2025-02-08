"use client";

import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { useCallback, useState } from "react";
import UploadingLists from "../UploadingLists";

interface UploadButtonProps {
  userId: string;
  accountId: string;
}

const UploadButton = ({ userId, accountId }: UploadButtonProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <button className="flex items-center gap-3 bg-white px-6 py-2 rounded-3xl shadow-sm shadow-zinc-500 hover:bg-[rgba(221,214,254,0.4)] hover:shadow-[0px_2px_4px_1px_rgba(145,145,145,0.75)]">
        <Upload color="#52525b" size={20} strokeWidth={1.7} />
        <span className="font-normal text-zinc-600">Upload</span>
      </button>

      {files.length > 0 && <UploadingLists files={files} />}
    </div>
  );
};

export default UploadButton;
