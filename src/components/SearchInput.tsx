import clsx from "clsx";
import { Search } from "lucide-react";

interface SearchInputProps {
  onFocus?: () => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  value: string;
}

const SearchInput = ({
  onFocus,
  onBlur,
  onChange,
  value,
  className,
}: SearchInputProps) => {
  return (
    <div
      className={clsx(
        `flex flex-1 items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-sm border transition-all duration-300 `,
        className
      )}
    >
      <Search
        size={20}
        className="flex-shrink-0 text-zinc-600 dark:text-zinc-400"
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="Search your files..."
        className="flex-1 bg-transparent text-zinc-700 dark:text-gray-200 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none"
      />
    </div>
  );
};

export default SearchInput;
