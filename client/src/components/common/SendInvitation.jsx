import IconsLoading from "@/components/icons/IconsLoading";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sendInvitation } from "@/lib/actions/invitation/send-invitation";
import { saveActivityLogsNotification } from "@/lib/actions/notifications/saveActivityLogsNotification";
import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const userFormSchema = z.object({
  email: z.string().email(),
  role: z.enum(["AGENCY_ADMIN", "SUBACCOUNT_GUEST", "SUBACCOUNT_USER"]),
});
const SendInvitation = ({ agencyId, setIsOpen }) => {
  const form = useForm({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "",
      role: "SUBACCOUNT_USER",
    },
  });

  const onSubmit = async (values) => {
    try {
      const res = await sendInvitation(values.role, values.email, agencyId);
      await saveActivityLogsNotification({
        agencyId: agencyId,
        description: `Invited ${res.email}`,
        subAccountId: undefined,
      });

      toast("Success", {
        description: "Created and sent invitation",
      });
      setIsOpen(false);
      return res;
    } catch (error) {
      console.log(error);
      toast.error("Failed to created and sent invitation");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          disabled={form.formState.isLoading}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={form.formState.isLoading}
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>User role</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value)}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user role..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="AGENCY_ADMIN">Agency Admin</SelectItem>
                  <SelectItem value="SUBACCOUNT_USER">
                    Sub Account User
                  </SelectItem>
                  <SelectItem value="SUBACCOUNT_GUEST">
                    Sub Account Guest
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <IconsLoading /> : "Send Invitation"}
        </Button>
      </form>
    </Form>
  );
};

export default SendInvitation;

SendInvitation.propTypes = {
  agencyId: PropTypes.string,
  setIsOpen: PropTypes.func,
};
