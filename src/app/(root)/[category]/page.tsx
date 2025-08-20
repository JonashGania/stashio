import { auth } from "@/auth";
import FilesWrapper from "@/components/FilesWrapper";

const validCategories = {
  documents: "DOCUMENT",
  images: "IMAGE",
  videos: "VIDEO",
  audio: "AUDIO",
  others: "OTHER",
} as const;

type CategoryParam = keyof typeof validCategories;

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const session = await auth();
  const userId = session?.user?.id;

  const { category } = await params;
  const categoryParam = category.toLowerCase() as CategoryParam;
  const categoryEnum = validCategories[categoryParam];

  if (!categoryEnum) {
    return <div className="text-2xl text-center pt-12">Not found</div>;
  }

  const heading =
    categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);

  return (
    <div className="py-8 pl-5 pr-6 sm:pr-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {heading}
      </h1>
      <FilesWrapper userId={userId} category={categoryEnum} />
    </div>
  );
};

export default CategoryPage;
