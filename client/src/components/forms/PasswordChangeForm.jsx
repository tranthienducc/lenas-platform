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
import { useUser } from "@/context/UserProvider";
import { changePassword } from "@/lib/actions/user/change-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    currentPassword: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
    password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
    confirmPassword: z
      .string()
      .min(8, "Mật khẩu xác nhận phải có ít nhất 8 ký tự"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });
const PassowordChangeForm = () => {
  const { user } = useUser();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
  });
  console.log("user-password", user.email);

  const onSubmit = async (data) => {
    try {
      const response = await changePassword({
        email: user?.email,
        password: data?.password,
      });

      toast.success("Change password successfully");
      form.reset();
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Failed to change password!");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[500px] w-full"
      >
        <h2 className="mt-4 mb-3 text-2xl font-bold">Password Change</h2>
        <p className="mb-4 text-lg font-normal text-grayLight dark:text-grayDark">
          Change password every time.
        </p>

        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input placeholder="***" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="***" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input placeholder="***" type="password" {...field} />
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

export default PassowordChangeForm;
