import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import SignUpForm from "@/components/form/SignUpForm";
import GoogleSignIn from "@/components/GoogleSignIn";

const SignUp = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center px-4">
      <Card className="w-[430px] py-8">
        <CardHeader className="text-center pt-0 pb-8">
          <CardTitle className="text-2xl">Get started</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent className="px-8">
          <SignUpForm />
          <div className="w-full my-4 flex items-center justify-center">
            <div className="bg-zinc-300 flex-grow h-[1px]"></div>
            <div className="mx-2 text-sm text-zinc-400">OR CONTINUE WITH</div>
            <div className="bg-zinc-300 flex-grow h-[1px]"></div>
          </div>
          <GoogleSignIn />
          <p className="text-center pt-2 text-sm text-zinc-700">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-violet-500 font-semibold">
              Sign in
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
