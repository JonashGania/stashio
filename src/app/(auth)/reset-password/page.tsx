import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";
import ResetPasswordForm from "@/components/form/ResetPasswordForm";
import Link from "next/link";

const ResetPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full h-screen flex justify-center items-center flex-col px-4">
        <div className="w-[430px]">
          <div className="flex justify-center text-center items-center flex-col w-full space-y-2 mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Reset your password
            </h1>
            <p className="text-gray-600">Enter your new password below</p>
          </div>
          <Card>
            <CardContent>
              <ResetPasswordForm />
              <div className="flex items-center justify-center mt-6 text-sm">
                <Link
                  href="/sign-in"
                  className="flex items-center gap-2 text-gray-600 hover:text-neutral-900"
                >
                  <ArrowLeft size={18} />
                  Back to login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Suspense>
  );
};

export default ResetPassword;
