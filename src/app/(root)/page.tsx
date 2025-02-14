import { getCategories } from "@/lib/utils";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CategoryCard from "@/components/CategoryCard";
import StorageChart from "@/components/StorageChart";
import RecentUploads from "@/components/RecentUploads";

const Dashboard = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("sign-in");
  }

  const categories = getCategories();

  return (
    <div className="pt-8 px-5 w-full">
      <div className="flex gap-12 lg:gap-4">
        <div className="flex-1">
          <h3 className="text-zinc-600 font-semibold text-xl">Categories</h3>
          <div className="pt-4 categories-grid">
            {categories.map((item) => (
              <CategoryCard category={item} key={item.title} />
            ))}
          </div>
          <h3 className="text-zinc-600 font-semibold text-xl pt-8">
            Recent Uploads
          </h3>
          <div className="pt-4">
            <RecentUploads userId={user.id} />
          </div>
        </div>
        <div className="w-[30%] lg:w-[350px] lg:px-12">
          <StorageChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
