import { Files } from "@/types";
import { getFileType, getFileIcon } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SearchFilterResultsProps {
  results: Files[] | undefined;
  searchQuery: string;
  onClose: () => void;
}

const SearchFilterResults = ({
  results,
  onClose,
  searchQuery,
}: SearchFilterResultsProps) => {
  const router = useRouter();

  const navigateToFile = (type: string) => {
    // Simplified route generation logic
    const route = type === "AUDIO" ? "audio" : `${type.toLowerCase()}s`;

    const url = searchQuery
      ? `/${route}?search=${encodeURIComponent(searchQuery)}`
      : `/${route}`;

    router.replace(url);
    onClose();
  };

  if (!results || results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-purple-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {searchQuery
            ? `No results found for "${searchQuery}"`
            : "Start typing to search files..."}
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {results?.map((result) => {
        const { extension, type } = getFileType(result.name);
        const isImage = type === "IMAGE" && extension !== "svg";

        return (
          <li
            key={result.id}
            className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 dark:hover:bg-gray-800/50 cursor-pointer transition-all duration-200 border border-transparent hover:border-purple-200/50 dark:hover:border-purple-800/50 "
            onClick={() => {
              navigateToFile(result.category);
            }}
          >
            <div className="h-[40px] w-[40px] relative">
              <Image
                src={isImage ? result.fileUrl : getFileIcon(type, extension)}
                alt="thumbnail"
                fill
                sizes="w-full"
                className="rounded-md object-contain"
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
