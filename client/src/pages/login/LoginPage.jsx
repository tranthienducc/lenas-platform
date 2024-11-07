import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignInPage from "@/pages/login/sign-in/SignInPage";
import SignUpPage from "@/pages/login/sign-up/SignUpPage";

const LoginPage = () => {
  return (
    <section className="relative w-full h-screen bg-center bg-cover bg-signInPattern">
      <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 ">
        <Tabs defaultValue="sign-in" className="w-full max-w-full">
          <TabsList>
            <TabsTrigger value="sign-in">Login</TabsTrigger>
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in">
            <SignInPage />
          </TabsContent>
          <TabsContent value="sign-up">
            <SignUpPage />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default LoginPage;
