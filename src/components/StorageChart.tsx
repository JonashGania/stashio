import { formatFileSize } from "@/lib/utils";
import { StorageInfo } from "@/types";

const StorageChart = ({ storageInfo }: { storageInfo: StorageInfo | null }) => {
  const usedPercentage =
    (Number(storageInfo?.usedSpace) / Number(storageInfo?.totalSpace)) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {formatFileSize(Number(storageInfo?.usedSpace))} used
        </span>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          5 GB
        </span>
      </div>

      <div className="relative">
        <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${usedPercentage}%` }}
          ></div>
        </div>
        <div
          className="absolute -top-1 bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs font-medium shadow-lg border dark:border-gray-600 transition-all duration-300"
          style={{
            left: `${Math.min(usedPercentage, 85)}%`,
            transform: "translateX(-50%)",
          }}
        >
          {usedPercentage.toFixed(1)}%
        </div>
      </div>

      <div className="flex">
        <div className="flex-1 flex justify-center items-center flex-col">
          <span className="text-lg font-bold text-green-600 dark:text-green-400">
            {formatFileSize(
              Number(storageInfo?.totalSpace) - Number(storageInfo?.usedSpace)
            )}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Available
          </span>
        </div>
        <div className="flex-1 flex justify-center items-center flex-col">
          <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
            {(100 - usedPercentage).toFixed(1)}%
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">Free</span>
        </div>
      </div>
    </div>
  );
};

export default StorageChart;
