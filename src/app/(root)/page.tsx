import { auth } from "@/auth";
import { Suspense } from "react";
import {
  getStatsByCategory,
  getRecentUploaded,
  getAvailabeStorage,
} from "@/actions/files";
import { Cylinder } from "lucide-react";
import CategoryCards from "@/components/cards/CategoryCards";
import StorageChart from "@/components/StorageChart";
import RecentUploads from "@/components/RecentUploads";
import RecentUploadsSkeleton from "@/components/skeletons/RecentUploadsSkeleton";
import StorageChartSkeleton from "@/components/skeletons/StorageChartSkeleton";

const Dashboard = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  const [categoryStats, recentUploads, storageInfo] = await Promise.all([
    getStatsByCategory(userId),
    getRecentUploaded(userId),
    getAvailabeStorage(userId),
  ]);

  return (
    <div className="px-5 pt-5 pb-8 w-full">
      <div className="flex items-center gap-4">
        <div className="w-[50px] h-[50px] rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 5a2 2 0 012-2h4a2 2 0 012 2v3H8V5z"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl min-[500px]:text-3xl text-gray-900 dark:text-white font-bold">
            Dashboard
          </h1>
          <p className="text-sm min-[500px]:text-base text-gray-600 dark:text-gray-300">
            Welcome back! Here&apos;s your file overview
          </p>
        </div>
      </div>
      <div className="pt-8">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
              <Cylinder size={15} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg text-gray-900 dark:text-white font-semibold">
                Storage
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Available Storage
              </p>
            </div>
          </div>
          <Suspense fallback={<StorageChartSkeleton />}>
            <StorageChart storageInfo={storageInfo} />
          </Suspense>
        </div>
        <div>
          <div className="flex items-center gap-3 pt-8">
            <h2 className="text-xl min-[500px]:text-2xl font-bold text-gray-900 dark:text-white">
              Categories
            </h2>
            <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-purple-500"></div>
          </div>
          <CategoryCards fileStats={categoryStats} />
        </div>

        <div className="pt-8">
          <div className="flex items-center gap-3">
            <h2 className="text-xl min-[500px]:text-2xl font-bold text-gray-900 dark:text-white">
              Recent Uploads
            </h2>
            <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-purple-500"></div>
          </div>
          <div className="pt-4">
            <Suspense fallback={<RecentUploadsSkeleton />}>
              <RecentUploads recentUploads={recentUploads} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
