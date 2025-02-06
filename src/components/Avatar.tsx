import { User } from "next-auth";
import Image from "next/image";

const Avatar = ({ user }: { user: User | undefined }) => {
  return (
    <>
      {user?.image ? (
        <Image
          src={user.image}
          alt="avatar"
          width={28}
          height={28}
          className="rounded-full"
        />
      ) : (
        <div className="w-[28px] h-[28px] rounded-full bg-violet-500 font-medium text-white grid place-items-center">
          {user?.name?.substring(0, 1).toUpperCase()}
        </div>
      )}
    </>
  );
};

export default Avatar;
