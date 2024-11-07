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
import { loginUser } from "@/lib/actions/user/login-user";
import { useGetCurrentUser } from "@/lib/tanstack-query/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

const SignInForm = () => {
  const { refetch } = useGetCurrentUser();

  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await loginUser({
        email: data?.email,
        password: data?.password,
      });

      if (response.user) {
        toast.success("Sign in successfully.");
        form.reset();
        navigate({ to: "/" });
        refetch();
      } else if (response.weakPassword) {
        toast.error("Your password is too weak. Please try again.");
      } else if (response.error) {
        toast.error(response.error || "Invalid credentials, please try again.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Fail to sign-in. Please try again!");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="lenas@gmail.com" {...field} />
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
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-end justify-end">
          <Button type="submit">Sign In</Button>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;

// {!otpSent ? (
//   <>
//     <FormField
//       control={form.control}
//       name="email"
//       render={({ field }) => (
//         <FormItem className="mb-4">
//           <FormLabel>Email</FormLabel>
//           <FormControl>
//             <Input placeholder="lenas@gmail.com" {...field} />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//     <FormField
//       control={form.control}
//       name="password"
//       render={({ field }) => (
//         <FormItem className="mb-4">
//           <FormLabel>Password</FormLabel>
//           <FormControl>
//             <Input type="password" {...field} />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />

//     <Button type="button" onClick={() => setOTPSent(true)}>
//       Continue
//     </Button>
//   </>
// ) : (
//   <>
//     <InputOTP maxLength={6}>
//       <InputOTPGroup>
//         <InputOTPSlot index={0} />
//         <InputOTPSlot index={1} />
//         <InputOTPSlot index={2} />
//       </InputOTPGroup>
//       <InputOTPSeparator />
//       <InputOTPGroup>
//         <InputOTPSlot index={3} />
//         <InputOTPSlot index={4} />
//         <InputOTPSlot index={5} />
//       </InputOTPGroup>
//     </InputOTP>
//     <div className="flex items-end justify-end mt-3">
//       <Button type="submit">Sign In</Button>
//     </div>
//   </>
// )}

// SignInForm.propTypes = {
// otpSent: PropTypes.bool,
// setOTPSent: PropTypes.any,
// };
// import PropTypes from "prop-types";
