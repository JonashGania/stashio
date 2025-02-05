import { signOutUser } from "@/actions/auth";

const SignOutButton = () => {
  return (
    <form action={signOutUser}>
      <button className="px-4 py-1 bg-black text-white text-center rounded-2xl">
        Sign Out
      </button>
    </form>
  );
};

export default SignOutButton;
