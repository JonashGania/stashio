"use server";

import { appwriteClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { prisma } from "@/lib/prisma";
import { ID } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { getFileUrl, getFileType } from "@/lib/utils";
import { revalidatePath } from "next/cache";

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
      console.log("file stored", fileRecord);

      //   const storageUpdate = await prisma.storage.update({
      //     where: { userId: userId },
      //     data: {
      //       usedSpace: { increment: bucketFile.sizeOriginal },
      //     },
      //   });
      //   console.log("storage updated", storageUpdate);

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
