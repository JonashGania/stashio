import { auth } from "@/auth";
import { redirect } from "next/navigation";
import FilesWrapper from "../../../components/FilesWrapper";

const Others = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="py-8 pl-5 pr-6 sm:pr-12">
      <h1 className="text-3xl font-bold text-zinc-600 dark:text-gray-200">
        Others
      </h1>
      <FilesWrapper userId={user.id} category="OTHER" />
    </div>
  );
};

export default Others;
