import Link from "next/link";
import { getCategories, formatFileSize } from "@/lib/utils";
import { CategoryStats } from "@/types";

const CategoryCards = ({ fileStats }: { fileStats: CategoryStats[] }) => {
  const categories = getCategories();

  const updatedCategories = categories.map((category) => {
    const stat = fileStats?.find((file) => {
      const formatted =
        category.title === "Media"
          ? category.title.toUpperCase()
          : category.title.slice(0, -1).toUpperCase();

      return file.category === formatted;
    });

    return {
      ...category,
      totalFiles: stat?._count?.id || 0,
      size: stat?._sum?.size ? stat._sum.size : 0,
    };
  });

  return (
    <div className="pt-4 grid grid-cols-2 min-[900px]:grid-cols-3 gap-4">
      {updatedCategories.map((category) => (
        <Link
          key={category.title}
          href={category.url}
          className="group relative overflow-hidden rounded-2xl p-6 cursor-pointer transform transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25"
          style={{ background: category.bgColor }}
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10 transition-transform duration-500 group-hover:scale-150"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8 transition-transform duration-500 group-hover:scale-125"></div>

          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex justify-center items-center">
                {category.logo}
              </div>
              <span className="text-white/80 text-sm font-medium">
                {category.totalFiles} Files
              </span>
            </div>

            <h3 className="text-white font-semibold text-lg mt-4 mb-2 group-hover:text-white transition-colors duration-300">
              {category.title}
            </h3>

            <div className="text-white/90 text-sm font-medium">
              {formatFileSize(category.size)}
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryCards;
