import { FileType } from "@prisma/client";

export interface Files {
  type: string;
  id: string;
  name: string;
  size: number;
  userId: string;
  category: FileType;
  createdAt: Date;
  updatedAt: Date;
  fileUrl: string;
  fileId: string;
}

export interface InfiniteDataResponse {
  pages: Files[][];
  pageParams: unknown[];
}

export interface StorageInfo {
  totalSpace: bigint;
  usedSpace: bigint;
}

export interface CategoryStats {
  category: string;
  _sum: {
    size: number | null;
  };
  _count: {
    id: number;
  };
}
