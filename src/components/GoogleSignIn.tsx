import Image from "next/image";

const GoogleSignIn = () => {
  return (
    <form>
      <button className="py-2 px-4 w-full border border-zinc-300 rounded-md hover:bg-gray-200 flex gap-4 items-center justify-center">
        <Image src={"/google.svg"} alt="google icon" height={20} width={20} />
        <span>Google</span>
      </button>
    </form>
  );
};

export default GoogleSignIn;
