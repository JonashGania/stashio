import clsx from "clsx";
import { formatFileSize } from "@/lib/utils";

interface StorageBarProps {
  usedSpace?: number;
  usedPercentage?: number;
  className?: string;
}

const StorageBar = ({
  usedSpace,
  usedPercentage,
  className,
}: StorageBarProps) => {
  return (
    <div
      className={clsx(
        `mb-4 p-3 rounded-xl bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 transition-all duration-100 overflow-hidden`,
        className
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Storage
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {formatFileSize(Number(usedSpace))}/5 GB
        </span>
      </div>
      <div className="w-full h-2 bg-white/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-100 ease-out"
          style={{ width: `${usedPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StorageBar;
