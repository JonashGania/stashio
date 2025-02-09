import { ChevronDown } from "lucide-react";
import { auth } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./ui/dropdown-menu";
import Avatar from "./Avatar";
import Searchbar from "./Searchbar";
import UploadButton from "./buttons/UploadButton";
import SignOutButton from "./buttons/SignOutButton";
import ThemeButton from "./buttons/ThemeButton";
import { redirect } from "next/navigation";

const Header = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <header className="w-full flex gap-4 justify-between py-3 px-6">
      <Searchbar />

      <div className="flex gap-4 items-center">
        <UploadButton userId={user.id} />
        <ThemeButton />

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
