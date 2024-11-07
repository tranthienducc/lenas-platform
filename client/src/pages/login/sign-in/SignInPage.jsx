import SignInForm from "@/components/forms/SignInForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

const SignInPage = () => {
  const [otpSent, setOTPSent] = useState(false);

  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">
          {!otpSent ? "Login" : "Verify email"}
        </CardTitle>
        <CardDescription>
          {!otpSent
            ? "Enter your email below to login to your account"
            : "Check mail for use OTP code is here to login"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm setOTPSent={setOTPSent} otpSent={otpSent} />
        <div className="mt-4 text-sm text-center text-grayLight dark:text-grayDark">
          Don&apos;t have an account?{" "}
          <span className="text-black dark:text-white">
            Please click Sign Up Tabs
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignInPage;
