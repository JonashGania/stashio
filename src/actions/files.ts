"use server";

import { appwriteClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/appwrite/config";
import { prisma } from "@/lib/prisma";
import { ID } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import { getFileUrl, getFileType } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { FileType } from "@prisma/client";
import { auth } from "@/auth";
import { unstable_cache } from "next/cache";

export const uploadFile = async (
  file: File,
  userId: string | undefined,
  path: string
) => {
  const { storage } = await appwriteClient();
  let bucketFile;

  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("You are not authenticated perform this action");
  }

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
  searchQuery: string
) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("You are not authenticated perform this action");
  }

  try {
    const files = await prisma.file.findMany({
      where: {
        userId: userId,
        category: category,
        name: {
          contains: searchQuery,
          mode: "insensitive",
        },
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
  extension: string,
  path: string
) => {
  try {
    const session = await auth();
    const user = session?.user;

    if (!user) {
      throw new Error("You are not authenticated perform this action");
    }
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

    revalidatePath(path);
    return { success: true, message: "File has been successfully renamed." };
  } catch (error) {
    console.error("Failed to rename file", error);
    return { success: false, message: "Failed to rename." };
  }
};

export const deleteFile = async (
  fileId: string,
  userId: string | undefined,
  bucketFileId: string,
  path: string
) => {
  const { storage } = await appwriteClient();

  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("You are not authenticated perform this action");
  }

  try {
    const existingFile = await prisma.file.findUnique({
      where: { id: fileId },
      select: { userId: true, size: true },
    });

    if (!existingFile) {
      return { success: false, message: "File not found" };
    }

    await storage.deleteFile(appwriteConfig.bucketId, bucketFileId);

    await prisma.file.delete({ where: { userId: userId, id: fileId } });

    await prisma.user.update({
      where: { id: userId },
      data: { usedSpace: { decrement: existingFile.size } },
    });

    revalidatePath(path);
    return { success: true, message: "File has been successfully deleted." };
  } catch (error) {
    console.error("Failed to delete file", error);
    return { success: false, message: "Failed to delete" };
  }
};

export const multipleDeleteFiles = async (
  filesIds: string[],
  userId: string | undefined
) => {
  const { storage } = await appwriteClient();

  const session = await auth();
  const user = session?.user;

  if (!user) {
    throw new Error("You are not authenticated perform this action");
  }

  try {
    const files = await prisma.file.findMany({
      where: {
        id: { in: filesIds },
      },
      select: { id: true, size: true, fileId: true },
    });

    if (files.length === 0) {
      return { success: false, message: "No valid files found to delete" };
    }

    const results = await Promise.allSettled(
      files.map(async (file) => {
        await storage.deleteFile(appwriteConfig.bucketId, file.fileId);
        await prisma.file.delete({ where: { userId: userId, id: file.id } });
        return file.size;
      })
    );

    let totalFreedSpace = 0;
    const failedFiles: string[] = [];

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        totalFreedSpace += result.value;
      } else {
        failedFiles.push(files[index].id);
      }
    });

    if (totalFreedSpace > 0) {
      await prisma.user.update({
        where: { id: userId },
        data: { usedSpace: { decrement: totalFreedSpace } },
      });
    }

    if (failedFiles.length > 0) {
      return {
        success: false,
        message: `Some files failed to delete: ${failedFiles.join(", ")}`,
      };
    }

    return { success: true, message: "Selected files successfully deleted." };
  } catch (error) {
    console.error("Multiple delete failed:", error);
    return { success: false, message: "Failed to delete selected files." };
  }
};

export const getRecentUploaded = unstable_cache(
  async (userId: string | undefined) => {
    if (!userId) throw new Error("No userId provided");

    const files = await prisma.file.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
      skip: 0,
      take: 15,
    });

    return files;
  },
  ["getRecentUploads"],
  { revalidate: 60 * 60 * 2 }
);

export const getStatsByCategory = unstable_cache(
  async (userId: string | undefined) => {
    if (!userId) throw new Error("No userId provided");

    const files = await prisma.file.groupBy({
      by: ["category"],
      where: { userId: userId },
      _sum: { size: true },
      _count: { id: true },
    });

    return files;
  },
  ["getStats"],
  {
    revalidate: 60 * 60 * 2,
  }
);

export const getAvailabeStorage = unstable_cache(
  async (userId: string | undefined) => {
    if (!userId) throw new Error("No userId provided");

    const storageInfo = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        totalSpace: true,
        usedSpace: true,
      },
    });

    return {
      totalSpace:
        typeof storageInfo?.totalSpace === "bigint"
          ? Number(storageInfo.totalSpace)
          : storageInfo?.totalSpace,
      usedSpace:
        typeof storageInfo?.usedSpace === "bigint"
          ? Number(storageInfo.usedSpace)
          : storageInfo?.usedSpace,
    };
  },
  ["getStorage"],
  {
    revalidate: 60 * 60 * 2,
  }
);

export const getSearchedFiles = unstable_cache(
  async ({
    search = "",
    limit = 15,
    userId,
  }: {
    search?: string;
    limit?: number;
    userId: string | undefined;
  }) => {
    if (!userId) throw new Error("No userId provided");

    const files = await prisma.file.findMany({
      where: {
        userId: userId,
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return files;
  },
  ["searchResults"],
  {
    revalidate: 60 * 60 * 2,
  }
);
