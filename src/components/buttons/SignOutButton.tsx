import { signOutUser } from "@/actions/auth";
import { LogOut } from "lucide-react";

const SignOutButton = ({ position }: { position: string }) => {
  return (
    <form action={signOutUser}>
      <button
        className={`flex items-center gap-2 bg-black dark:bg-white w-full  px-3 ${
          position === "mobile-nav"
            ? `rounded-3xl py-2 justify-center`
            : `rounded-md py-1`
        }`}
      >
        <LogOut size={18} className="text-white dark:text-black" />
        <span
          className={`text-white dark:text-black ${
            position === "mobile-nav" ? "text-base" : "text-sm"
          }`}
        >
          Log out
        </span>
      </button>
    </form>
  );
};

export default SignOutButton;
