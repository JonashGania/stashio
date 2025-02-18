"use client";

import { Search, LoaderCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTrigger,
  DialogTitle,
} from "./ui/dialog";
import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSearchedFiles } from "@/actions/files";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import SearchFilterResults from "./SearchFilterResults";

const Searchbar = ({ userId }: { userId: string | undefined }) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [open, setOpen] = useState(false);
  const [debouncedSearch] = useDebounce(searchQuery, 300);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["searchFiles", debouncedSearch, userId],
    queryFn: () =>
      getSearchedFiles({ userId: userId, search: debouncedSearch, limit: 15 }),
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="block phone:hidden">
            <Search color="rgba(113,113,122)" size={25} />
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-[340px] px-3 pb-0">
          <DialogHeader className="border-b border-b-zinc-200 dark:border-b-zinc-600 py-1">
            <DialogTitle className="flex items-center gap-2">
              <Search
                size={20}
                className="flex-shrink-0 text-zinc-700 dark:text-zinc-300"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Type here to search..."
                className="flex-1 bg-transparent text-base text-zinc-700 dark:text-gray-200 font-normal placeholder:text-base placeholder:font-normal placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none"
              />
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[250px] overflow-y-auto search">
            {error ? (
              <div className="text-sm">
                Error fetching results: {error.message}
              </div>
            ) : isLoading ? (
              <div className="py-3 flex justify-center items-center">
                <LoaderCircle className="animate-spin text-violet-500" />
              </div>
            ) : (
              <SearchFilterResults
                results={data}
                setOpen={setOpen}
                searchQuery={searchQuery}
              />
            )}
          </div>
          <DialogDescription></DialogDescription>
        </DialogContent>
      </Dialog>

      <div className="max-w-[480px] w-full relative hidden phone:block">
        <div
          ref={searchRef}
          className="w-full flex items-center gap-2 px-3 py-3 rounded-3xl border border-transparent dark:focus-within:border-gray-600 focus-within:border-blue-400 bg-[rgba(207,250,254,0.5)] dark:bg-zinc-800 overflow-hidden"
        >
          <Search
            size={20}
            className="flex-shrink-0 text-zinc-600 dark:text-zinc-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setOpen(true)}
            onBlur={(e) => {
              if (!searchRef.current?.contains(e.relatedTarget as Node)) {
                setOpen(false);
              }
            }}
            placeholder="Type here to search..."
            className="flex-1 bg-transparent text-zinc-700 dark:text-gray-200 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none"
          />
        </div>
        {open && (
          <div
            tabIndex={-1}
            ref={searchRef}
            className={`${
              open ? "block" : "hidden"
            } absolute w-full max-h-[250px] p-4 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 top-14 rounded-md z-50 overflow-y-auto search`}
          >
            {error ? (
              <div className="text-sm">
                Error fetching results: {error.message}
              </div>
            ) : isLoading ? (
              <div className="flex justify-center items-center">
                <LoaderCircle className="animate-spin text-violet-500" />
              </div>
            ) : (
              <SearchFilterResults
                results={data}
                setOpen={setOpen}
                searchQuery={searchQuery}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Searchbar;
