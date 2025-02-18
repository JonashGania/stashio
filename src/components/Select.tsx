"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Label } from "./ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import { useMemo } from "react";

const SelectComponent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );
  const sortOption = searchParams.get("sort") || "date-newest";

  const handleSortChange = (option: string) => {
    params.set("sort", option);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 items-center">
      <Label htmlFor="sort-type" className="hidden phone:block">
        Sort by:
      </Label>
      <Label htmlFor="sort-type" className="block phone:hidden">
        Sort:
      </Label>
      <Select value={sortOption} onValueChange={handleSortChange}>
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
            value="name-a-z"
            className="focus:bg-zinc-300 dark:focus:bg-zinc-800"
          >
            Name A-Z
          </SelectItem>
          <SelectItem
            value="name-z-a"
            className="focus:bg-zinc-300 dark:focus:bg-zinc-800"
          >
            Name Z-A
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
