import { Skeleton } from "../ui/skeleton";

const RecentUploadsSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-[50px] w-[50px] rounded-lg bg-gray-300 dark:bg-gray-800" />
            <div className="flex flex-col gap-1">
              <Skeleton className="h-[15px] w-[200px] bg-gray-300 dark:bg-gray-800" />
              <Skeleton className="h-[15px] w-[80px] bg-gray-300 dark:bg-gray-800" />
            </div>
          </div>
          <Skeleton className="h-[8px] w-[30px] bg-gray-300 dark:bg-gray-800" />
        </div>
      ))}
    </div>
  );
};

export default RecentUploadsSkeleton;
