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
import { saveActivityLogsNotification } from "@/lib/actions/notifications/saveActivityLogsNotification";
import { upsertPipelines } from "@/lib/actions/pipelines/upsert-pipelines";
import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
});
const CreatePipelinesForm = ({
  subAccountId,
  refetch,
  setIsOpen,
  prevData,
}) => {
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: prevData?.name || "",
    },
  });

  useEffect(() => {
    if (prevData) {
      form.reset({
        name: prevData?.name || "",
      });
    }
  }, [prevData, form]);

  const onSubmit = async (values) => {
    if (!subAccountId) return;
    try {
      const response = await upsertPipelines({
        name: values?.name,
        id: prevData?.id,
        subAccountId: subAccountId,
      });
      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Updates a pipeline | ${response?.name}`,
        subAccountId: subAccountId,
      });
      refetch();
      setIsOpen(false);
      toast.success("Saved pipeline details successfully");
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Failed to save pipeline");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pipeline Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Pipelines name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="mt-4"
        >
          {form.formState.isSubmitting ? <IconsLoading /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default CreatePipelinesForm;

CreatePipelinesForm.propTypes = {
  subAccountId: PropTypes.string,
  refetch: PropTypes.any,
  setIsOpen: PropTypes.func,
  prevData: PropTypes.any,
};
