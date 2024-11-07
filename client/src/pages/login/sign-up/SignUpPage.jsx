import SignUpForm from "@/components/forms/SignUpForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SignUpPage = () => {
  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
        <div className="mt-4 text-sm text-center text-grayLight dark:text-grayDark">
          Already have an account?{" "}
          <span className="text-black dark:text-white">
            Please click Sign In Tabs
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpPage;
