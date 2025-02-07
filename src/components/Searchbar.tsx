import { Search } from "lucide-react";

const Searchbar = () => {
  return (
    <div className="max-w-[480px] flex items-center gap-2 w-full px-3 py-3 rounded-3xl border border-transparent focus-within:border-blue-400 bg-[rgba(207,250,254,0.5)]">
      <Search color="rgba(113,113,122)" size={20} />
      <input
        type="text"
        placeholder="Type here to seach..."
        className="flex-1 bg-transparent text-zinc-700 placeholder:text-zinc-500 focus:outline-none"
      />
    </div>
  );
};

export default Searchbar;
