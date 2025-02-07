import Link from "next/link";
import Image from "next/image";

interface CategoryCardProp {
  title: string;
  totalFiles: number;
  size: number;
  url: string;
  bgColor: string;
  logo: string;
}

const CategoryCard = ({ category }: { category: CategoryCardProp }) => {
  return (
    <Link
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
          <span className="text-white text-sm">{category.size} MB</span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
