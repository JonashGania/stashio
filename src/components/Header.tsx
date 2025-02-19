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
import MobileNavigation from "./MobileNavigation";
import { redirect } from "next/navigation";
import { getAvailabeStorage } from "@/actions/files";

const Header = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/sign-in");
  }

  const storageInfo = await getAvailabeStorage(user.id);

  return (
    <header className="w-full flex gap-4 justify-between py-3 px-6">
      <Searchbar userId={user.id} />

      <div className="hidden md:flex gap-4 items-center ">
        <UploadButton userId={user.id} />
        <ThemeButton />

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center flex-shrink-0 gap-1 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-800 pr-1 outline-none">
            <Avatar user={user} />
            <ChevronDown size={15} />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="px-4 py-2 overflow-hidden w-[200px]"
            align="end"
          >
            <div className="flex gap-2 items-center mb-3">
              <Avatar user={user} />
              <div className="flex flex-col gap-0 max-w-[130px]">
                <span className="font-medium text-sm capitalize">
                  {user?.name}
                </span>
                <span className="text-xs text-zinc-600 dark:text-zinc-300 overflow-hidden text-ellipsis">
                  {user?.email}
                </span>
              </div>
            </div>
            <SignOutButton position="header" />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex md:hidden items-center gap-2">
        <ThemeButton />
        <MobileNavigation user={user} storageInfo={storageInfo} />
      </div>
    </header>
  );
};

export default Header;
