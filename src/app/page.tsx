import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";

export default async function Home() {
  // const session = await auth();

  // if (!session) {
  //   redirect("/sign-in");
  // }

  return (
    <div>
      <h1>Dashboard</h1>
      <SignOutButton />
    </div>
  );
}
