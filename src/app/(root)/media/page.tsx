import { auth } from "@/auth";
import { redirect } from "next/navigation";
import FilesWrapper from "../../../components/FilesWrapper";

const Media = async () => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="pt-8 pl-5 pr-12">
      <h1 className="text-3xl font-bold text-zinc-600">Media</h1>
      <FilesWrapper userId={user.id} category="MEDIA" />
    </div>
  );
};

export default Media;
