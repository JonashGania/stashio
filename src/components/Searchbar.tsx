import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTrigger,
  DialogTitle,
} from "./ui/dialog";

const Searchbar = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="block phone:hidden">
            <Search color="rgba(113,113,122)" size={30} />
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-[340px] px-3">
          <DialogHeader className="border-b border-b-zinc-200 py-1">
            <DialogTitle className="flex items-center gap-2">
              <Search color="#3f3f46" size={20} className="flex-shrink-0" />
              <input
                type="text"
                placeholder="Type here to search..."
                className="flex-1 bg-transparent text-zinc-700 font-normal placeholder:font-normal placeholder:text-zinc-400 focus:outline-none"
              />
            </DialogTitle>
          </DialogHeader>
          <DialogDescription></DialogDescription>
        </DialogContent>
      </Dialog>

      <div className="max-w-[480px] w-full hidden phone:flex items-center gap-2 px-3 py-3 rounded-3xl border border-transparent focus-within:border-blue-400 bg-[rgba(207,250,254,0.5)] overflow-hidden">
        <Search color="rgba(113,113,122)" size={20} className="flex-shrink-0" />
        <input
          type="text"
          placeholder="Type here to search..."
          className="flex-1 bg-transparent text-zinc-700 placeholder:text-zinc-500 focus:outline-none"
        />
      </div>
    </>
  );
};

export default Searchbar;
