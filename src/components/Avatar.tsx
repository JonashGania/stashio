import { User } from "next-auth";
import Image from "next/image";

interface AvatarProps {
  user: User | undefined;
}

const Avatar = ({ user }: AvatarProps) => {
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
        <div
          className={`w-[28px] h-[28px] rounded-full bg-violet-500 font-medium text-white grid place-items-center`}
        >
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      )}
    </>
  );
};

export default Avatar;
