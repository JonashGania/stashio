"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Grid3X3, Rows2, LoaderCircle } from "lucide-react";
import { getFiles } from "@/actions/files";
import { FileType } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { columns } from "./Columns";
import SelectComponent from "@/components/Select";
import GridCard from "./cards/GridCard";
import TableCard from "./cards/TableCard";

interface FetchFilesProps {
  userId: string | undefined;
  category: FileType;
  pageParam: number;
  sort: string;
  searchQuery: string;
}

const fetchFiles = async ({
  userId,
  category,
  pageParam = 0,
  sort,
  searchQuery = "",
}: FetchFilesProps) => {
  if (!userId) {
    throw new Error("User is not authenticated");
  }

  const take = 20;
  const skip = pageParam * take;

  const files = await getFiles(userId, category, skip, take, sort, searchQuery);
  return files;
};

const FilesWrapper = ({
  userId,
  category,
}: {
  userId: string | undefined;
  category: FileType;
}) => {
  const searchParams = useSearchParams();

  const sort = searchParams.get("sort") || "date-newest";
  const searchQuery = searchParams.get("search") || "";

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["files", userId, category, sort, searchQuery],
    queryFn: ({ pageParam = 0 }) =>
      fetchFiles({ userId, category, pageParam, sort, searchQuery }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length : undefined,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    refetch();
  }, [refetch, searchQuery, sort]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const allFiles = data?.pages.flat() ?? [];

  return (
    <Tabs defaultValue="grid">
      <div className="pt-4 flex justify-between gap-4 items-center">
        <TabsList className="dark:bg-gray-950">
          <TabsTrigger
            value="grid"
            className="flex items-center gap-1 px-0 transition-none"
          >
            <Grid3X3 />
            Grid
          </TabsTrigger>
          <TabsTrigger
            value="table"
            className="flex items-center gap-1 ml-4 px-0 transition-none"
          >
            <Rows2 />
            Table
          </TabsTrigger>
        </TabsList>

        <SelectComponent />
      </div>
      <TabsContent value="grid">
        <div className="pt-4">
          {isError ? (
            <div className="pt-8 flex items-center justify-center">
              An error occured. Try reloading the page.
            </div>
          ) : isLoading ? (
            <div className="pt-8 flex justify-center items-center">
              <LoaderCircle
                size={45}
                color="#c4b5fd"
                strokeWidth={3}
                className="animate-spin "
              />
            </div>
          ) : (
            <>
              <GridCard files={allFiles} />
              {allFiles.length >= 19 && (
                <div ref={ref} className="flex justify-center items-center">
                  {isFetchingNextPage && (
                    <LoaderCircle
                      size={45}
                      color="#c4b5fd"
                      strokeWidth={3}
                      className="animate-spin "
                    />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </TabsContent>
      <TabsContent value="table">
        <div className="pt-4">
          {isError ? (
            <div className="pt-8 flex items-center justify-center">
              An error occured. Try reloading the page.
            </div>
          ) : isLoading ? (
            <div className="pt-8 flex justify-center items-center">
              <LoaderCircle
                size={45}
                color="#c4b5fd"
                strokeWidth={3}
                className="animate-spin "
              />
            </div>
          ) : (
            <>
              <TableCard columns={columns} data={allFiles} />
              {allFiles.length >= 19 && (
                <div ref={ref} className="flex justify-center items-center">
                  {isFetchingNextPage && (
                    <LoaderCircle
                      size={45}
                      color="#c4b5fd"
                      strokeWidth={3}
                      className="animate-spin "
                    />
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default FilesWrapper;
