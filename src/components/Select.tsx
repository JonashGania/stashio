"use client";

import { Label } from "./ui/label";
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
      <Label htmlFor="sort-type" className="hidden phone:block">
        Sort by:
      </Label>
      <Label htmlFor="sort-type" className="block phone:hidden">
        Sort:
      </Label>
      <Select value={sort} onValueChange={setSort}>
        <SelectTrigger id="sort-type" className="w-[140px] sm:w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            value="date-newest"
            className="focus:bg-zinc-300 dark:focus:bg-zinc-800"
          >
            Date (Newest)
          </SelectItem>
          <SelectItem
            value="date-oldest"
            className="focus:bg-zinc-300 dark:focus:bg-zinc-800"
          >
            Date (Oldest)
          </SelectItem>
          <SelectItem
            value="name-asc"
            className="focus:bg-zinc-300 dark:focus:bg-zinc-800"
          >
            Name (Ascending)
          </SelectItem>
          <SelectItem
            value="name-desc"
            className="focus:bg-zinc-300 dark:focus:bg-zinc-800"
          >
            Name (Descending)
          </SelectItem>
          <SelectItem
            value="size-highest"
            className="focus:bg-zinc-300 dark:focus:bg-zinc-800"
          >
            Size (Highest)
          </SelectItem>
          <SelectItem
            value="size-lowest"
            className="focus:bg-zinc-300 dark:focus:bg-zinc-800"
          >
            Size (Lowest)
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectComponent;
