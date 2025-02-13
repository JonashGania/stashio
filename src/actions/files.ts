"use server";

import { appwriteClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { prisma } from "@/lib/prisma";
import { ID } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { getFileUrl, getFileType } from "@/lib/utils";
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
  take: number
) => {
  try {
    const files = await prisma.file.findMany({
      where: {
        userId: userId,
        category: category,
      },
      orderBy: {
        createdAt: "desc",
      },
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
      throw new Error("File not found");
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
