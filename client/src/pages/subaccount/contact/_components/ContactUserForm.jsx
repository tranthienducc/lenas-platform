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
import { upsertContact } from "@/lib/actions/contacts/upsert-contact";
import { saveActivityLogsNotification } from "@/lib/actions/notifications/saveActivityLogsNotification";
import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const ContactUserFormSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email(),
});

const ContactUserForm = ({ refetch, subAccountId, setIsOpen }) => {
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(ContactUserFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const isLoading = form.formState.isLoading;

  const onSubmit = async (values) => {
    try {
      const contactData = {
        ...values,
        subAccountId: subAccountId,
      };
      const response = await upsertContact(contactData);

      refetch();

      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Updated a contact | ${response?.name}`,
        subAccountId: subAccountId,
      });

      toast.success("Create contact successfully");
      setIsOpen(false);
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Failed to create contact!");
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          disabled={isLoading}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Contact name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Contact email" type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="mt-4">
          {form.formState.isSubmitting ? <IconsLoading /> : "Save contact"}
        </Button>
      </form>
    </Form>
  );
};

export default ContactUserForm;

ContactUserForm.propTypes = {
  subAccountId: PropTypes.string,
  refetch: PropTypes.any,
  setIsOpen: PropTypes.func,
};
