import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ForgotPasswordForm from "@/components/form/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col px-4">
      <div className="w-[430px]">
        <div className="flex justify-center text-center items-center flex-col w-full space-y-2 mb-4">
          <Image src="/assets/logo.svg" alt="logo" height={50} width={50} />
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Forgot your password?
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Enter your email address and we&apos;ll send you a link to reset
            your password
          </p>
        </div>
        <Card className="w-full pt-8 pb-6 shadow-md border-gray-100 dark:border-neutral-800 rounded-2xl">
          <CardContent className="p-0 px-6">
            <ForgotPasswordForm />
            <div className="flex items-center justify-center mt-6 text-sm">
              <Link
                href="/sign-in"
                className="flex items-center gap-2 text-gray-600 hover:text-neutral-900 dark:text-gray-500 hover:dark:text-gray-400"
              >
                <ArrowLeft size={18} />
                Back to login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
