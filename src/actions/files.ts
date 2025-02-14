"use server";

import { appwriteClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { prisma } from "@/lib/prisma";
import { ID } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { getFileUrl, getFileType, sortOrderBy } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { FileType } from "@prisma/client";

export const uploadFile = async (
  file: File,
  userId: string | undefined,
  path: string
) => {
  const { storage } = await appwriteClient();

  let bucketFile;

  if (userId) {
    try {
      const inputFile = InputFile.fromBuffer(file, file.name);

      bucketFile = await storage.createFile(
        appwriteConfig.bucketId,
        ID.unique(),
        inputFile
      );

      const { type, extension } = getFileType(file.name);

      const fileRecord = await prisma.file.create({
        data: {
          name: bucketFile.name,
          type: extension,
          size: bucketFile.sizeOriginal,
          fileUrl: getFileUrl(bucketFile.$id),
          category: type,
          fileId: bucketFile.$id,
          userId: userId,
        },
      });

      await prisma.user.update({
        where: { id: userId },
        data: { usedSpace: { increment: bucketFile.sizeOriginal } },
      });

      revalidatePath(path);
      return fileRecord;
    } catch (error) {
      console.error(error, "Failed to upload file");

      if (bucketFile) {
        try {
          await storage.deleteFile(appwriteConfig.bucketId, bucketFile.$id);
        } catch (error) {
          console.error("Failed to clean up file from storage", error);
        }
      }
      throw error;
    }
  }
};

export const getFiles = async (
  userId: string | undefined,
  category: FileType,
  skip: number,
  take: number,
  sortOption: string
) => {
  try {
    const orderBy = sortOrderBy(sortOption);

    const files = await prisma.file.findMany({
      where: {
        userId: userId,
        category: category,
      },
      orderBy,
      skip,
      take,
    });

    return files;
  } catch (error) {
    console.error("Failed to get files", error);
    throw error;
  }
};

export const renameFile = async (
  fileId: string,
  name: string,
  extension: string
) => {
  try {
    const newName = `${name}.${extension}`;

    const existingFile = await prisma.file.findUnique({
      where: { id: fileId },
      select: { userId: true },
    });

    if (!existingFile) {
      return { success: false, message: "File not found" };
    }

    await prisma.file.update({
      where: {
        id: fileId,
      },
      data: {
        name: newName,
      },
    });

    return { success: true, message: "File has been successfully renamed." };
  } catch (error) {
    console.error("Failed to rename file", error);
    return { success: false, message: "Failed to rename." };
  }
};

export const deleteFile = async (
  fileId: string,
  userId: string | undefined,
  bucketFileId: string
) => {
  const { storage } = await appwriteClient();

  try {
    const existingFile = await prisma.file.findUnique({
      where: { id: fileId },
      select: { userId: true },
    });

    if (!existingFile) {
      return { success: false, message: "File not found" };
    }

    await storage.deleteFile(appwriteConfig.bucketId, bucketFileId);

    await prisma.file.delete({ where: { userId: userId, id: fileId } });

    return { success: true, message: "File has been successfully deleted." };
  } catch (error) {
    console.error("Failed to delete file", error);
    return { success: false, message: "Failed to delete" };
  }
};

export const getRecentUploaded = async (userId: string | undefined) => {
  try {
    const files = await prisma.file.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
      skip: 0,
      take: 15,
    });

    return files;
  } catch (error) {
    console.error("Failed to get recent uploads", error);
    throw new Error("Failed to fetch recent uploads");
  }
};
