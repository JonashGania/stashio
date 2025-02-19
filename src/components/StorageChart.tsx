import { Progress } from "./ui/progress";
import { formatFileSize } from "@/lib/utils";
import { StorageInfo } from "@/types";

const StorageChart = ({ storageInfo }: { storageInfo: StorageInfo | null }) => {
  const usedPercentage =
    (Number(storageInfo?.usedSpace) / Number(storageInfo?.totalSpace)) * 100;

  return (
    <>
      <h3 className="text-xl text-zinc-700 dark:text-gray-200 font-semibold">
        Availabe Storage
      </h3>
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
  );
};

export default StorageChart;
