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
            className="flex cursor-default items-center gap-2 px-3 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-sm"
            onClick={() => navigateToFile(result.category)}
          >
            <div className="h-[30px] w-[30px] relative">
              <Image
                src={isImage ? result.fileUrl : getFileIcon(type, extension)}
                alt="thumbnail"
                fill
                sizes="w-full"
                className="rounded-md object-cover"
              />
            </div>
            <span className="text-zinc-700 dark:text-gray-200 text-sm max-w-[250px] truncate">
              {result.name}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchFilterResults;
