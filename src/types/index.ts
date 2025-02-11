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
