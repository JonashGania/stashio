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
      url: "/media",
      bgColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      logo: "🎥",
    },
    {
      title: "Audio",
      url: "/others",
      bgColor: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      logo: "🎵",
    },
    {
      title: "Archives",
      url: "/others",
      bgColor: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      logo: "📦",
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
    return `${(bytes / 1024).toFixed(1)} KB`;
  } else if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  } else {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
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
