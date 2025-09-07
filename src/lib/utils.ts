import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FileType, Prisma } from "@prisma/client";
import { format } from "date-fns";
import { prisma } from "./prisma";
import uuid4 from "uuid4";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCategories = () => {
  return [
    {
      title: "Documents",
      url: "/documents",
      bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      logo: "📄",
    },
    {
      title: "Images",
      url: "/images",
      bgColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      logo: "🖼️",
    },
    {
      title: "Videos",
      url: "/videos",
      bgColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      logo: "🎥",
    },
    {
      title: "Audio",
      url: "/audio",
      bgColor: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      logo: "🎵",
    },
    {
      title: "Others",
      url: "/others",
      bgColor: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      logo: "📁",
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
  const videoExtenstions = [
    "mp4",
    "webm",
    "mov",
    "avi",
    "mkv",
    "wmv",
    "flv",
    "ogg",
  ];
  const audioExtensions = ["mp3", "wav", "aac"];

  let type: FileType = FileType.OTHER;
  if (documentExtensions.includes(extension)) {
    type = FileType.DOCUMENT;
  } else if (imageExtensions.includes(extension)) {
    type = FileType.IMAGE;
  } else if (videoExtenstions.includes(extension)) {
    type = FileType.VIDEO;
  } else if (audioExtensions.includes(extension)) {
    type = FileType.AUDIO;
  }

  return { type, extension };
};

export const getFileIcon = (type: FileType, extension: string) => {
  const audioExtensions = ["mp3", "wav", "aac"];
  const videoExtensions = [
    "mp4",
    "webm",
    "mov",
    "avi",
    "mkv",
    "wmv",
    "flv",
    "ogg",
  ];

  const iconMap: Record<string, string> = {
    doc: "/assets/file-icons/docx.png",
    docx: "/assets/file-icons/docx.png",
    ppt: "/assets/file-icons/ppt.png",
    pptx: "/assets/file-icons/ppt.png",
    pdf: "/assets/file-icons/pdf.png",
    txt: "/assets/file-icons/txt.png",
    xls: "/assets/file-icons/excel.png",
    xlsx: "/assets/file-icons/excel.png",
    zip: "/assets/file-icons/zip.png",
    svg: "/assets/file-icons/svg.png",
    fileDocument: "/assets/file-icons/docx.png",
    fileImage: "/assets/file-icons/file-image.png",
    fileVideo: "/assets/file-icons/file-video.png",
    fileAudio: "/assets/file-icons/file-audio.png",
    fileOther: "/assets/file-icons/file-other.png",
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
    case FileType.VIDEO:
      return iconMap.fileVideo;
    case FileType.AUDIO:
      return iconMap.fileAudio;
    default:
      return iconMap.fileOther;
  }
};

export const getFileUrl = (bucketFileId: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${bucketFileId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
};

export const getDownloadUrl = (buketFileId: string) => {
  return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_BUCKET}/files/${buketFileId}/download?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
};

export const formatDate = (date: string) => {
  const newDate = new Date(date);
  const formatted = format(newDate, "MMM d, yyyy");
  return formatted;
};

export const formatDateWithTime = (date: string) => {
  const newDate = new Date(date);
  const formatted = format(newDate, "h:mm aaa, MMM d");
  return formatted;
};

export const formatFileSize = (bytes: number) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  } else if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
};

export const sortOrderBy = (
  sortOption: string
): Prisma.FileOrderByWithRelationInput => {
  switch (sortOption) {
    case "date-newest":
      return { createdAt: "desc" as Prisma.SortOrder };
    case "date-oldest":
      return { createdAt: "asc" as Prisma.SortOrder };
    case "name-a-z":
      return { name: "asc" as Prisma.SortOrder };
    case "name-z-a":
      return { name: "desc" as Prisma.SortOrder };
    case "size-highest":
      return { size: "desc" as Prisma.SortOrder };
    case "size-lowest":
      return { size: "asc" as Prisma.SortOrder };
    default:
      return { createdAt: "desc" as Prisma.SortOrder };
  }
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    return passwordResetToken;
  } catch (error) {
    console.error("Error getting password token", error);
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: { email },
    });

    return passwordResetToken;
  } catch (error) {
    console.error("Error getting password token", error);
    return null;
  }
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuid4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      token,
      email,
      expires,
    },
  });

  return passwordResetToken;
};
