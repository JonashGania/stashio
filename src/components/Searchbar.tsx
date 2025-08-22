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
          <button className="block min-[650px]:hidden p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200 shadow-lg">
            <Search color="rgba(113,113,122)" size={25} />
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-[400px] px-3 pb-0">
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

      <div className="max-w-[480px] w-full relative hidden min-[650px]:block">
        <div
          ref={searchRef}
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
            open
              ? "bg-white dark:bg-gray-800 border-purple-300 dark:border-purple-600 shadow-xl shadow-purple-500/10"
              : "bg-white/50 dark:bg-gray-800/50 border-white/20 dark:border-gray-700/50 hover:border-purple-200 dark:hover:border-purple-800"
          }`}
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
            placeholder="Search your files..."
            className="flex-1 bg-transparent text-zinc-700 dark:text-gray-200 placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none"
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
                  setOpen={setOpen}
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

// import React, { useState, useRef, useEffect } from "react";

// // Mock data for demonstration
// const mockSearchResults = [
//   {
//     id: "1",
//     name: "Project_Proposal_2024.pdf",
//     fileUrl: "/api/placeholder/30/30",
//     category: "DOCUMENT",
//   },
//   {
//     id: "2",
//     name: "Design_Assets_Collection.zip",
//     fileUrl: "/api/placeholder/30/30",
//     category: "OTHER",
//   },
//   {
//     id: "3",
//     name: "Meeting_Screenshot.png",
//     fileUrl: "/api/placeholder/30/30",
//     category: "IMAGE",
//   },
//   {
//     id: "4",
//     name: "Quarterly_Report.docx",
//     fileUrl: "/api/placeholder/30/30",
//     category: "DOCUMENT",
//   },
//   {
//     id: "5",
//     name: "Video_Tutorial.mp4",
//     fileUrl: "/api/placeholder/30/30",
//     category: "VIDEO",
//   },
// ];

// // Utility functions
// const getFileType = (fileName) => {
//   const extension = fileName.split(".").pop()?.toLowerCase();
//   const imageExts = ["jpg", "jpeg", "png", "gif", "svg", "webp"];
//   const videoExts = ["mp4", "avi", "mov", "mkv"];
//   const audioExts = ["mp3", "wav", "flac", "aac"];
//   const docExts = ["pdf", "doc", "docx", "txt"];

//   if (imageExts.includes(extension)) return { type: "IMAGE", extension };
//   if (videoExts.includes(extension)) return { type: "VIDEO", extension };
//   if (audioExts.includes(extension)) return { type: "AUDIO", extension };
//   if (docExts.includes(extension)) return { type: "DOCUMENT", extension };
//   return { type: "OTHER", extension };
// };

// const getFileIcon = (type, extension) => {
//   const icons = {
//     DOCUMENT: "📄",
//     IMAGE: "🖼️",
//     VIDEO: "🎥",
//     AUDIO: "🎵",
//     OTHER: "📁",
//   };
//   return icons[type] || "📄";
// };

// const getFileTypeColor = (type) => {
//   const colors = {
//     DOCUMENT: "from-blue-500 to-cyan-500",
//     IMAGE: "from-pink-500 to-rose-500",
//     VIDEO: "from-purple-500 to-indigo-500",
//     AUDIO: "from-green-500 to-emerald-500",
//     OTHER: "from-orange-500 to-amber-500",
//   };
//   return colors[type] || "from-gray-500 to-slate-500";
// };

// // Search Results Component
// const SearchFilterResults = ({ results, setOpen, searchQuery, onNavigate }) => {
//   const navigateToFile = (type) => {
//     const route =
//       type === "MEDIA"
//         ? type.charAt(0).toLowerCase() + type.toLowerCase().slice(1)
//         : type.charAt(0).toLowerCase() + type.toLowerCase().slice(1) + "s";

//     onNavigate(route, searchQuery);
//     setOpen(false);
//   };

//   if (!results || results.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center py-8 text-center">
//         <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center mb-4">
//           <svg
//             className="w-8 h-8 text-purple-400"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//             />
//           </svg>
//         </div>
//         <p className="text-gray-500 dark:text-gray-400 text-sm">
//           {searchQuery
//             ? `No results found for "${searchQuery}"`
//             : "Start typing to search files..."}
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-1">
//       {results.map((result, index) => {
//         const { extension, type } = getFileType(result.name);
//         const isImage = type === "IMAGE" && extension !== "svg";

//         return (
//           <div
//             key={result.id}
//             className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 dark:hover:bg-gray-800/50 cursor-pointer transition-all duration-200 border border-transparent hover:border-purple-200/50 dark:hover:border-purple-800/50"
//             onClick={() => navigateToFile(result.category)}
//           >
//             {/* File icon/thumbnail */}
//             <div className="relative flex-shrink-0">
//               <div
//                 className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getFileTypeColor(type)} flex items-center justify-center text-white overflow-hidden`}
//               >
//                 {isImage ? (
//                   <img
//                     src={result.fileUrl}
//                     alt="thumbnail"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-lg">
//                     {getFileIcon(type, extension)}
//                   </span>
//                 )}
//               </div>

//               {/* File type indicator */}
//               <div className="absolute -top-1 -right-1 w-4 h-4 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-600">
//                 <div
//                   className={`w-2 h-2 rounded-full bg-gradient-to-r ${getFileTypeColor(type)}`}
//                 ></div>
//               </div>
//             </div>

//             {/* File info */}
//             <div className="flex-1 min-w-0">
//               <p className="text-gray-900 dark:text-white font-medium truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
//                 {result.name}
//               </p>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                 {type.toLowerCase()} file
//               </p>
//             </div>

//             {/* Arrow indicator */}
//             <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//               <svg
//                 className="w-4 h-4 text-purple-500"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 5l7 7-7 7"
//                 />
//               </svg>
//             </div>
//           </div>
//         );
//       })}

//       {/* View all results */}
//       {results.length >= 5 && (
//         <div className="pt-2 border-t border-gray-200/50 dark:border-gray-700/50">
//           <button className="w-full p-3 text-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium text-sm transition-colors duration-200">
//             View all {results.length} results →
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // Main Search Bar Component
// const Searchbar = ({ userId = "1" }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [isMobileDialogOpen, setIsMobileDialogOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [results, setResults] = useState([]);
//   const searchRef = useRef(null);

//   // Simulate search with debouncing
//   useEffect(() => {
//     if (searchQuery.trim()) {
//       setIsLoading(true);
//       const timer = setTimeout(() => {
//         const filteredResults = mockSearchResults.filter((result) =>
//           result.name.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         setResults(filteredResults);
//         setIsLoading(false);
//       }, 300);
//       return () => clearTimeout(timer);
//     } else {
//       setResults([]);
//     }
//   }, [searchQuery]);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleNavigate = (route, query) => {
//     console.log(`Navigating to /${route}${query ? `?search=${query}` : ""}`);
//   };

//   const handleClickOutside = (e) => {
//     if (searchRef.current && !searchRef.current.contains(e.target)) {
//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <>
//       {/* Mobile Search Button */}
//       <div className="block sm:hidden">
//         <button
//           onClick={() => setIsMobileDialogOpen(true)}
//           className="p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200 shadow-lg"
//         >
//           <svg
//             className="w-5 h-5 text-gray-600 dark:text-gray-400"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//             />
//           </svg>
//         </button>
//       </div>

//       {/* Mobile Dialog */}
//       {isMobileDialogOpen && (
//         <div className="fixed inset-0 z-50 sm:hidden">
//           {/* Backdrop */}
//           <div
//             className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//             onClick={() => setIsMobileDialogOpen(false)}
//           ></div>

//           {/* Dialog */}
//           <div className="relative z-10 flex flex-col h-full">
//             <div className="bg-white dark:bg-gray-900 p-4 shadow-xl">
//               {/* Header */}
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="flex-1 relative">
//                   <div className="absolute left-3 top-1/2 -translate-y-1/2">
//                     <svg
//                       className="w-5 h-5 text-gray-400"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                       />
//                     </svg>
//                   </div>
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                     placeholder="Search your files..."
//                     className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 dark:text-white"
//                     autoFocus
//                   />
//                 </div>
//                 <button
//                   onClick={() => setIsMobileDialogOpen(false)}
//                   className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
//                 >
//                   <svg
//                     className="w-6 h-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {/* Results */}
//             <div className="flex-1 bg-white dark:bg-gray-900 p-4 overflow-y-auto">
//               {isLoading ? (
//                 <div className="flex items-center justify-center py-8">
//                   <div className="w-8 h-8 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 rounded-full animate-spin"></div>
//                 </div>
//               ) : (
//                 <SearchFilterResults
//                   results={results}
//                   setOpen={setIsMobileDialogOpen}
//                   searchQuery={searchQuery}
//                   onNavigate={handleNavigate}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Desktop Search Bar */}
//       <div className="hidden sm:block max-w-md w-full relative" ref={searchRef}>
//         <div className="relative">
//           {/* Search Input */}
//           <div
//             className={`flex items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
//               isOpen
//                 ? "bg-white dark:bg-gray-800 border-purple-300 dark:border-purple-600 shadow-xl shadow-purple-500/10"
//                 : "bg-white/50 dark:bg-gray-800/50 border-white/20 dark:border-gray-700/50 hover:border-purple-200 dark:hover:border-purple-800"
//             }`}
//           >
//             <svg
//               className="w-5 h-5 text-gray-400 flex-shrink-0"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>

//             <input
//               type="text"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               onFocus={() => setIsOpen(true)}
//               placeholder="Search your files..."
//               className="flex-1 bg-transparent text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none"
//             />

//             {searchQuery && (
//               <button
//                 onClick={() => {
//                   setSearchQuery("");
//                   setResults([]);
//                 }}
//                 className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
//               >
//                 <svg
//                   className="w-4 h-4 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </button>
//             )}
//           </div>

//           {/* Search Results Dropdown */}
//           {isOpen && (
//             <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-purple-200/50 dark:border-purple-800/50 rounded-2xl shadow-2xl shadow-purple-500/10 z-50 max-h-96 overflow-hidden">
//               {/* Header */}
//               <div className="px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50">
//                 <div className="flex items-center justify-between">
//                   <h3 className="font-semibold text-gray-900 dark:text-white">
//                     {searchQuery ? `Search Results` : "Recent Files"}
//                   </h3>
//                   {searchQuery && (
//                     <span className="text-xs text-gray-500 dark:text-gray-400">
//                       {results.length} result{results.length !== 1 ? "s" : ""}
//                     </span>
//                   )}
//                 </div>
//               </div>

//               {/* Results */}
//               <div className="max-h-80 overflow-y-auto p-2">
//                 {isLoading ? (
//                   <div className="flex items-center justify-center py-8">
//                     <div className="w-6 h-6 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 rounded-full animate-spin"></div>
//                   </div>
//                 ) : (
//                   <SearchFilterResults
//                     results={
//                       searchQuery ? results : mockSearchResults.slice(0, 3)
//                     }
//                     setOpen={setIsOpen}
//                     searchQuery={searchQuery}
//                     onNavigate={handleNavigate}
//                   />
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Searchbar;
