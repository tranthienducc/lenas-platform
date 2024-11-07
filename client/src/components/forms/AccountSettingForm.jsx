import FileUpload from "@/components/common/FileUpload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/UserProvider";
import { editProfle } from "@/lib/actions/user/edit-profile";
import { useGetAllProfile } from "@/lib/tanstack-query/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  username: z.string(),
  profileImage: z.string(),
  bio: z.string().max(100, { message: "Bio at leasts 100 characters." }),
});

const AccountSettingForm = () => {
  const [files, setFiles] = useState([]);
  const { user } = useUser();

  const { data: profile } = useGetAllProfile(user?.id);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      email: profile?.email || "",
      username: profile?.username || "",
      profileImage: profile?.profileImage || "",
      bio: profile?.bio || "",
    },
  });
  console.log("files", files);

  const onSubmit = async (data) => {
    try {
      const response = await editProfle({
        id: profile?.user_id,
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
        username: data?.username,
        profileImage: data?.profileImage || files,
        bio: data?.bio,
      });

      toast.success("Update profile successfully");
      form.reset();
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile!");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[500px] w-full"
      >
        <h2 className="mt-4 mb-3 text-2xl font-bold">Edit Profile</h2>
        <p className="mb-4 text-lg font-normal text-grayLight dark:text-grayDark">
          Set up your Lenas profile presence and hiring needs
        </p>
        <div className="flex flex-row items-center gap-5">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="Jone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="profileImage"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Profile Photo</FormLabel>
              <FormControl>
                <FileUpload
                  fieldChange={field.onChange}
                  setFiles={setFiles}
                  mediaUrl={profile?.profileImage}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-end justify-end">
          <Button
            type="submit"
            className="px-4 py-2 text-sm font-medium bg-black rounded-xl dark:bg-white"
          >
            Save changes
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AccountSettingForm;
