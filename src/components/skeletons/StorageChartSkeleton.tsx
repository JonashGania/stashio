import { Skeleton } from "../ui/skeleton";

const StorageChartSkeleton = () => {
  return (
    <>
      <h3 className="text-xl text-zinc-700 dark:text-gray-200 font-semibold">
        Availabe Storage
      </h3>
      <span className="text-sm text-zinc-600 dark:text-gray-300">
        0 B of 5 GB used
      </span>
      <Skeleton className="w-full h-3 bg-gray-300 dark:bg-gray-800" />
      <span className="text-sm text-zinc-600 dark:text-gray-300">
        0% available
      </span>
    </>
  );
};

export default StorageChartSkeleton;
