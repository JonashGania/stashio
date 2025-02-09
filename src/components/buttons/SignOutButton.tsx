import { signOutUser } from "@/actions/auth";
import { LogOut } from "lucide-react";

const SignOutButton = () => {
  return (
    <form action={signOutUser}>
      <button className="flex items-center gap-2 bg-black w-full rounded-md px-3 py-1">
        <LogOut size={18} color="#ffffff" />
        <span className="text-white text-sm">Log out</span>
      </button>
    </form>
  );
};

export default SignOutButton;
