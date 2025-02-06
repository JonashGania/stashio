import { Search, Moon, ChevronDown } from "lucide-react";
import { auth } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./ui/dropdown-menu";
import Avatar from "./Avatar";
import SignOutButton from "./SignOutButton";

const Header = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="w-full flex justify-between py-3 pr-6">
      <div className="max-w-[480px] flex items-center gap-2 w-full px-3 py-3 rounded-3xl border border-transparent focus-within:border-blue-400 bg-[rgba(207,250,254,0.5)]">
        <Search color="rgba(113,113,122)" size={20} />
        <input
          type="text"
          placeholder="Type here to seach..."
          className="flex-1 bg-transparent text-zinc-700 placeholder:text-zinc-500 focus:outline-none"
        />
      </div>
      <div className="flex gap-4 items-center">
        <div className="w-[30px] h-[30px]">
          <button className="px-1 py-1 rounded-full border transition-all border-zinc-300 hover:bg-zinc-200">
            <Moon color="#71717a" size={20} />
          </button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 rounded-xl hover:bg-zinc-200 pr-1 outline-none">
            <Avatar user={user} />
            <ChevronDown color="#52525b" size={15} />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="px-4 py-2 overflow-hidden w-[200px]"
            align="end"
          >
            <div className="flex gap-2 items-center mb-3">
              <Avatar user={user} />
              <div className="flex flex-col gap-0 max-w-[130px]">
                <span className="font-medium text-sm">{user?.name}</span>
                <span className="text-xs text-zinc-600 overflow-hidden text-ellipsis">
                  {user?.email}
                </span>
              </div>
            </div>
            <SignOutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
