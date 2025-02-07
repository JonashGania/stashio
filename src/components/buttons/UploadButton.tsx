import { Upload } from "lucide-react";

const UploadButton = () => {
  return (
    <button className="flex items-center gap-3 bg-white px-6 py-2 rounded-3xl shadow-sm shadow-zinc-500 hover:bg-[rgba(221,214,254,0.4)] hover:shadow-[0px_2px_4px_1px_rgba(145,145,145,0.75)]">
      <Upload color="#52525b" size={20} strokeWidth={1.7} />
      <span className="font-normal text-zinc-600">Upload</span>
    </button>
  );
};

export default UploadButton;
