import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import {
  getStatsByCategory,
  getRecentUploaded,
  getAvailabeStorage,
} from "@/actions/files";
import CategoryCards from "@/components/cards/CategoryCards";
import StorageChart from "@/components/StorageChart";
import RecentUploads from "@/components/RecentUploads";
import RecentUploadsSkeleton from "@/components/skeletons/RecentUploadsSkeleton";
import StorageChartSkeleton from "@/components/skeletons/StorageChartSkeleton";

const Dashboard = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("sign-in");
  }

  const [categoryStats, recentUploads, storageInfo] = await Promise.all([
    getStatsByCategory(user.id),
    getRecentUploaded(user.id),
    getAvailabeStorage(user.id),
  ]);

  return (
    <div className="py-8 px-5 w-full">
      <div className="flex gap-12 lg:gap-16">
        <div className="flex-1">
          <h3 className="text-zinc-600 dark:text-gray-200 font-semibold text-xl">
            Categories
          </h3>
          <CategoryCards fileStats={categoryStats} />
          <h3 className="text-zinc-600 dark:text-gray-200 font-semibold text-xl pt-8">
            Recent Uploads
          </h3>
          <div className="pt-4">
            <Suspense fallback={<RecentUploadsSkeleton />}>
              <RecentUploads recentUploads={recentUploads} />
            </Suspense>
          </div>
        </div>
        <div className="hidden md:block w-[200px] lg:w-[260px]">
          <Suspense fallback={<StorageChartSkeleton />}>
            <StorageChart storageInfo={storageInfo} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
