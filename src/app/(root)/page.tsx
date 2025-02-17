import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CategoryCards from "@/components/cards/CategoryCards";
import StorageChart from "@/components/StorageChart";
import RecentUploads from "@/components/RecentUploads";

const Dashboard = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("sign-in");
  }

  return (
    <div className="py-8 px-5 w-full">
      <div className="flex gap-12 lg:gap-16">
        <div className="flex-1">
          <h3 className="text-zinc-600 dark:text-gray-200 font-semibold text-xl">
            Categories
          </h3>
          <CategoryCards userId={user.id} />
          <h3 className="text-zinc-600 dark:text-gray-200 font-semibold text-xl pt-8">
            Recent Uploads
          </h3>
          <div className="pt-4">
            <RecentUploads userId={user.id} />
          </div>
        </div>
        <div className="hidden md:block w-[200px] lg:w-[260px]">
          <StorageChart userId={user.id} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
