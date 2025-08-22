"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";

interface SelectComponentProps {
  sort: string;
  setSort: (value: string) => void;
}

const SelectComponent = ({ sort, setSort }: SelectComponentProps) => {
  return (
    <div className="flex gap-2 items-center">
      <Select value={sort} onValueChange={setSort}>
        <SelectTrigger
          id="sort-type"
          className="w-[140px] sm:w-[180px] text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-900  text-gray-700 dark:text-gray-300">
          <SelectItem
            value="date-newest"
            className="focus:bg-zinc-300 dark:focus:bg-gray-800"
          >
            Date (Newest)
          </SelectItem>
          <SelectItem
            value="date-oldest"
            className="focus:bg-zinc-300 dark:focus:bg-gray-800"
          >
            Date (Oldest)
          </SelectItem>
          <SelectItem
            value="name-asc"
            className="focus:bg-zinc-300 dark:focus:bg-gray-800"
          >
            Name (A-Z)
          </SelectItem>
          <SelectItem
            value="name-desc"
            className="focus:bg-zinc-300 dark:focus:bg-gray-800"
          >
            Name (Z-A)
          </SelectItem>
          <SelectItem
            value="size-highest"
            className="focus:bg-zinc-300 dark:focus:bg-gray-800"
          >
            Size (Largest)
          </SelectItem>
          <SelectItem
            value="size-lowest"
            className="focus:bg-zinc-300 dark:focus:bg-gray-800"
          >
            Size (Smallest)
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectComponent;
