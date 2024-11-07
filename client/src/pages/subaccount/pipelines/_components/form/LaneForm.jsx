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
import { upsertLane } from "@/lib/actions/lane/upsert-lane";
import { saveActivityLogsNotification } from "@/lib/actions/notifications/saveActivityLogsNotification";
import { getPipelinesDetails } from "@/lib/actions/pipelines/get-pipelines-details";
import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const formShema = z.object({
  name: z.string(),
});
const LaneForm = ({ pipelineId, prevData, refetchLanes, setIsOpen }) => {
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(formShema),
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
  }, [form, prevData]);

  const isLoading = form.formState.isLoading;

  const onSubmit = async (values) => {
    if (!pipelineId) return;
    try {
      const response = await upsertLane({
        ...values,
        id: prevData?.id || uuidv4(),
        pipelineId: pipelineId,
        order: prevData?.order,
      });

      const pipeline = await getPipelinesDetails({ pipelineId: pipelineId });
      if (!pipeline) return;

      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Updated a lane | ${response?.name}`,
        subAccountId: pipeline?.subAccountId,
      });

      toast.success("Upsert lane successfully");
      refetchLanes();
      setIsOpen();

      return response;
    } catch (error) {
      console.log(error);
      toast.error("Failed to upsert lanes!");
    }
  };

  return (
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
              <FormLabel>Lane name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Lane name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading} className="w-20 mt-4">
          {form.formState.isSubmitting ? <IconsLoading /> : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default LaneForm;

LaneForm.propTypes = {
  pipelineId: PropTypes.string,
  prevData: PropTypes.any,
  refetchLanes: PropTypes.any,
  setIsOpen: PropTypes.func,
};
