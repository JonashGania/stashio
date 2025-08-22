import { Files } from "@/types";
import { getFileType, getFileIcon } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface SearchFilterResultsProps {
  results: Files[] | undefined;
  setOpen: Dispatch<SetStateAction<boolean>>;
  searchQuery: string;
}

const SearchFilterResults = ({
  results,
  setOpen,
  searchQuery,
}: SearchFilterResultsProps) => {
  const router = useRouter();

  const navigateToFile = (type: string) => {
    const route =
      type === "MEDIA"
        ? type.charAt(0).toLowerCase() + type.toLowerCase().slice(1)
        : type.charAt(0).toLowerCase() + type.toLowerCase().slice(1) + "s";

    if (searchQuery) {
      router.replace(`/${route}?search=${searchQuery}`);
    } else {
      router.replace(`/${route}`);
    }

    setOpen(false);
  };

  return (
    <ul className="flex flex-col gap-2">
      {results?.map((result) => {
        const { extension, type } = getFileType(result.name);
        const isImage = type === "IMAGE" && extension !== "svg";

        return (
          <li
            key={result.id}
            className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 dark:hover:bg-gray-800/50 cursor-pointer transition-all duration-200 border border-transparent hover:border-purple-200/50 dark:hover:border-purple-800/50 "
            onClick={() => navigateToFile(result.category)}
          >
            <div className="h-[40px] w-[40px] relative">
              <Image
                src={isImage ? result.fileUrl : getFileIcon(type, extension)}
                alt="thumbnail"
                fill
                sizes="w-full"
                className="rounded-md object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-zinc-700 dark:text-white text-sm max-w-[250px] truncate group-hover:text-purple-500">
                {result.name}
              </span>
              <span className="text-sm text-gray-400">
                {type.toLowerCase()} file
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchFilterResults;
