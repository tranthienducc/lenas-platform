import AccountSettingForm from "@/components/forms/AccountSettingForm";
import PassowordChangeForm from "@/components/forms/PasswordChangeForm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const EditProfle = () => {
  return (
    <Tabs
      defaultValue="account"
      className="flex flex-col items-center justify-center w-full max-w-full my-20 dark:bg-inherit"
    >
      <TabsList className="rounded-full dark:bg-white dark:text-black">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <AccountSettingForm />
      </TabsContent>
      <TabsContent value="password">
        <PassowordChangeForm />
      </TabsContent>
    </Tabs>
  );
};

export default EditProfle;
