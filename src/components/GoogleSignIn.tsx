import Image from "next/image";
import { googleSignIn } from "@/actions/auth";

const GoogleSignIn = () => {
  return (
    <form action={googleSignIn}>
      <button className="py-2 px-4 w-full border border-zinc-300 rounded-md hover:bg-gray-200 flex gap-4 items-center justify-center">
        <Image
          src="/assets/google.svg"
          alt="google icon"
          height={20}
          width={20}
        />
        <span>Google</span>
      </button>
    </form>
  );
};

export default GoogleSignIn;
