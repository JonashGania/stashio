"use client";

import Link from "next/link";
import Image from "next/image";
import { getCategories, formatFileSize } from "@/lib/utils";
import { getStatsByCategory } from "@/actions/files";
import { useQuery } from "@tanstack/react-query";

const CategoryCards = ({ userId }: { userId: string | undefined }) => {
  const { data } = useQuery({
    queryKey: ["fileStats", userId],
    queryFn: () => getStatsByCategory(userId),
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });

  const categories = getCategories();

  const updatedCategories = categories.map((category) => {
    const stat = data?.find((file) => {
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
    <div className="pt-4 flex categories-grid">
      {updatedCategories.map((category) => (
        <Link
          key={category.title}
          href={category.url}
          className="px-3 py-3 w-full h-[130px] rounded-xl hover:scale-110 transition-all duration-300"
          style={{ backgroundColor: category.bgColor }}
        >
          <div className="w-[35px] h-[35px] bg-white rounded-full grid place-items-center">
            <Image
              src={category.logo}
              alt={`${category.title.toLowerCase()} logo`}
              height={23}
              width={23}
            />
          </div>

          <div className="pt-5">
            <span className="text-white font-medium">{category.title}</span>
            <div>
              <span className="text-white text-sm">
                {category.totalFiles} files,{" "}
              </span>
              <span className="text-white text-sm">
                {formatFileSize(category.size)}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CategoryCards;
