"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Grid3X3 } from "lucide-react";
import { Rows2 } from "lucide-react";
import { getFiles } from "@/actions/files";
import { FileType } from "@prisma/client";
import SelectComponent from "@/components/Select";
import { useInfiniteQuery } from "@tanstack/react-query";

interface FetchFilesProps {
  userId: string | undefined;
  category: FileType;
  pageParam: number;
}

const fetchFiles = async ({
  userId,
  category,
  pageParam = 0,
}: FetchFilesProps) => {
  if (!userId) {
    throw new Error("User is not authenticated");
  }

  const take = 20;
  const skip = pageParam * take;

  const files = await getFiles(userId, category, skip, take);
  return files;
};

const FilesWrapper = ({
  userId,
  category,
}: {
  userId: string | undefined;
  category: FileType;
}) => {
  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["files", userId, category],
      queryFn: ({ pageParam = 0 }) =>
        fetchFiles({ userId, category, pageParam }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length > 0 ? allPages.length : undefined,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    });

  console.log(data);

  return (
    <Tabs defaultValue="grid">
      <div className="pt-4 flex justify-between gap-4 items-center">
        <TabsList>
          <TabsTrigger value="grid" className="flex items-center gap-1">
            <Grid3X3 />
            Grid
          </TabsTrigger>
          <TabsTrigger value="table" className="flex items-center gap-1">
            <Rows2 />
            Table
          </TabsTrigger>
        </TabsList>
        <SelectComponent />
      </div>
      <TabsContent value="grid">
        <div className="pt-4">
          <p className="text-lg text-zinc-400 font-medium text-center">
            No files uploaded
          </p>
        </div>
      </TabsContent>
      <TabsContent value="table">
        <div className="pt-4">
          <p className="text-lg text-zinc-400 font-medium text-center">
            No files uploaded
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default FilesWrapper;
