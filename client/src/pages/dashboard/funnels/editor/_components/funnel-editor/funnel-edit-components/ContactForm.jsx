import IconsLoading from "@/components/icons/IconsLoading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

const ContactForm = ({ state, goToNextPage, subAccountId }) => {
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const isLoading = form.formState.isLoading;

  const onSubmit = async (values) => {
    if (!state.editor.liveMode) return;
    try {
      const response = await upsertContact({
        ...values,
        subAccountId: subAccountId,
      });

      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `A New contact signed up | ${response?.name}`,
        subAccountId: subAccountId,
      });

      toast.success("Successfully save your info");
      await goToNextPage();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="max-w-[500px] w-[500px]">
      <CardHeader>
        <CardTitle>Contact us</CardTitle>
        <CardDescription>Want a free quote? We can help you</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              disabled={isLoading}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="name" />
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="email" type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-4" disabled={isLoading}>
              {form.formState.isSubmitting ? (
                <IconsLoading />
              ) : (
                "Get a free quote!"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  state: PropTypes.any,
  goToNextPage: PropTypes.func,
  subAccountId: PropTypes.string,
};
