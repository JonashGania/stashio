import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import SignInForm from "@/components/form/SignInForm";
import GoogleSignIn from "@/components/GoogleSignIn";

const SignIn = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center px-4">
      <Card className="w-[430px] py-8">
        <CardHeader className="text-center pt-0 pb-8">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent className="px-8">
          <SignInForm />
          <div className="w-full my-4 flex items-center justify-center">
            <div className="bg-zinc-300 flex-grow h-[1px]"></div>
            <div className="mx-2 text-sm text-zinc-400">OR CONTINUE WITH</div>
            <div className="bg-zinc-300 flex-grow h-[1px]"></div>
          </div>
          <GoogleSignIn />
          <p className="text-center pt-2 text-sm text-zinc-700">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-violet-500 font-semibold">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
