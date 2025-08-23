"use client";

import { Search, LoaderCircle, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSearchedFiles } from "@/actions/files";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import SearchFilterResults from "./SearchFilterResults";
import SearchInput from "./SearchInput";

const Searchbar = ({ userId }: { userId: string | undefined }) => {
  const [isMobileDialogOpen, setIsMobileDialogOpen] = useState(false);
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

  const handleClose = () => {
    setOpen(false);
    setIsMobileDialogOpen(false);
  };

  return (
    <>
      {/* Mobile Search Button */}
      <button
        onClick={() => setIsMobileDialogOpen(true)}
        className="block min-[650px]:hidden p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200 shadow-lg"
      >
        <Search className="text-gray-600 dark:text-gray-100" size={20} />
      </button>

      {/* Mobile Seach Dialog */}
      {isMobileDialogOpen && (
        <div className="flex flex-col min-[650px]:hidden fixed w-full h-screen top-0 left-0 bg-white dark:bg-gray-900 z-40 p-4">
          <div className="flex items-center gap-4 mb-8">
            <SearchInput
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700/50 focus-within:border-purple-300 focus-within:dark:border-purple-600 focus-within:shadow-xl focus-within:shadow-purple-500/10"
            />
            <button onClick={() => setIsMobileDialogOpen(false)}>
              <X size={25} className="text-black dark:text-white" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto search pb-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <LoaderCircle className="animate-spin text-violet-500" />
              </div>
            ) : (
              <SearchFilterResults
                results={data}
                onClose={handleClose}
                searchQuery={searchQuery}
              />
            )}
          </div>
        </div>
      )}

      {/* Desktop Search Bar */}
      <div className="max-w-[480px] w-full relative hidden min-[650px]:block">
        <div ref={searchRef}>
          <SearchInput
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setOpen(true)}
            onBlur={(e) => {
              if (!searchRef.current?.contains(e.relatedTarget as Node)) {
                setOpen(false);
              }
            }}
            className={
              open
                ? "bg-white dark:bg-gray-800 border-purple-300 dark:border-purple-600 shadow-xl shadow-purple-500/10"
                : "bg-white/50 dark:bg-gray-800/50 border-white/20 dark:border-gray-700/50 hover:border-purple-200 dark:hover:border-purple-800"
            }
          />
        </div>

        {open && (
          <div
            tabIndex={-1}
            ref={searchRef}
            className={`${
              open ? "block" : "hidden"
            } absolute mt-2 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-purple-200/50 dark:border-purple-800/50 rounded-2xl shadow-2xl shadow-purple-500/10 z-50 max-h-96 overflow-hidden`}
          >
            <div className="px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {searchQuery ? `Search Results` : "Recent Files"}
                </h3>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 search">
              {error ? (
                <div className="text-sm">
                  Error fetching results: {error.message}
                </div>
              ) : isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <LoaderCircle className="animate-spin text-violet-500" />
                </div>
              ) : (
                <SearchFilterResults
                  results={data}
                  onClose={handleClose}
                  searchQuery={searchQuery}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Searchbar;
