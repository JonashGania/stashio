import { signOutUser } from "@/actions/auth";
import { LogOut } from "lucide-react";

const SignOutButton = ({ position }: { position: string }) => {
  return (
    <form action={signOutUser}>
      <button
        className={`flex items-center gap-2 bg-black w-full  px-3 ${
          position === "mobile-nav"
            ? `rounded-3xl py-2 justify-center`
            : `rounded-md py-1`
        }`}
      >
        <LogOut size={18} color="#ffffff" />
        <span
          className={`text-white ${
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
