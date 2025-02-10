import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FileType } from "@prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCategories = () => {
  return [
    {
      title: "Documents",
      totalFiles: 0,
      size: 0,
      url: "/documents",
      bgColor: "#8F60FF",
      logo: "/assets/colored-document.svg",
    },
    {
      title: "Images",
      totalFiles: 0,
      size: 0,
      url: "/images",
      bgColor: "#019BA0",
      logo: "/assets/colored-images.svg",
    },
    {
      title: "Media",
      totalFiles: 0,
      size: 0,
      url: "/media",
      bgColor: "#FF7BAC",
      logo: "/assets/colored-media.svg",
    },
    {
      title: "Others",
      totalFiles: 0,
      size: 0,
      url: "/others",
      bgColor: "#4E65FB",
      logo: "/assets/colored-others.svg",
    },
  ];
};

export const getFileType = (filename: string) => {
  const extension = filename.split(".").pop()?.toLowerCase();

  if (!extension) return { type: FileType.OTHER, extension: "" };

  const documentExtensions = [
    "doc",
    "docx",
    "pdf",
    "txt",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "rtf",
    "html",
    "csv",
    "ods",
  ];
  const imageExtensions = ["png", "jpg", "jpeg", "gif", "bmp", "svg", "webp"];
  const mediaExtensions = [
    "mp4",
    "webm",
    "mov",
    "avi",
    "mkv",
    "mp3",
    "wav",
    "wmv",
    "flv",
    "ogg",
    "aac",
  ];

  let type: FileType = FileType.OTHER;
  if (documentExtensions.includes(extension)) {
    type = FileType.DOCUMENT;
  } else if (imageExtensions.includes(extension)) {
    type = FileType.IMAGE;
  } else if (mediaExtensions.includes(extension)) {
    type = FileType.MEDIA;
  }

  return { type, extension };
};

export const getFileIcon = (type: FileType, extension: string) => {
  const audioExtensions = ["mp3", "wav", "ogg", "aac"];
  const videoExtensions = ["mp4", "webm", "mov", "avi", "mkv", "wmv", "flv"];

  const iconMap: Record<string, string> = {
    doc: "/assets/file-icons/doc.svg",
    docx: "/assets/file-icons/docx.svg",
    ppt: "/assets/file-icons/ppt.svg",
    pptx: "/assets/file-icons/ppt.svg",
    pdf: "/assets/file-icons/pdf.svg",
    txt: "/assets/file-icons/txt.svg",
    xls: "/assets/file-icons/excel.svg",
    xlsx: "/assets/file-icons/excel.svg",
    fileDocument: "/assets/file-icons/file-document.svg",
    fileImage: "/assets/file-icons/file-image.svg",
    fileVideo: "/assets/file-icons/file-video.svg",
    fileAudio: "/assets/file-icons/file-audio.svg",
    fileOther: "/assets/file-icons/file-other.svg",
  };

  if (iconMap[extension]) {
    return iconMap[extension];
  }

  if (videoExtensions.includes(extension)) {
    return iconMap.fileVideo;
  }

  if (audioExtensions.includes(extension)) {
    return iconMap.fileAudio;
  }

  switch (type) {
    case FileType.DOCUMENT:
      return iconMap.fileDocument;
    case FileType.IMAGE:
      return iconMap.fileImage;
    case FileType.MEDIA:
      return iconMap.fileVideo;
    default:
      return iconMap.fileOther;
  }
};

export const getFileUrl = (bucketFileId: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
};
