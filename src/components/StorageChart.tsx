"use client";

import { Progress } from "./ui/progress";
import { useQuery } from "@tanstack/react-query";
import { getAvailabeStorage } from "@/actions/files";
import { formatFileSize } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

const StorageChart = ({ userId }: { userId: string | undefined }) => {
  const { data: storageInfo, isLoading } = useQuery({
    queryKey: ["storageInfo", userId],
    queryFn: () => getAvailabeStorage(userId),
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });

  const usedPercentage =
    (Number(storageInfo?.usedSpace) / Number(storageInfo?.totalSpace)) * 100;

  return (
    <div>
      <h3 className="text-xl text-zinc-700 dark:text-gray-200 font-semibold">
        Availabe Storage
      </h3>
      {isLoading ? (
        <div className="pt-4 flex justify-center items-center">
          <LoaderCircle
            size={30}
            color="#c4b5fd"
            strokeWidth={2}
            className="animate-spin "
          />
        </div>
      ) : (
        <>
          <span className="text-sm text-zinc-600 dark:text-gray-300">
            {formatFileSize(Number(storageInfo?.usedSpace))} of 5 GB used
          </span>
          <Progress
            value={usedPercentage}
            className="w-full [&>*]:bg-violet-500 mt-2"
            max={100}
          />
          <span className="text-sm text-zinc-600 dark:text-gray-300">
            {usedPercentage.toFixed(2)}% available
          </span>
        </>
      )}
    </div>
  );
};

export default StorageChart;
