import { upsertFunnels } from "@/lib/actions/funnels/upsert-funnels";
import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { saveActivityLogsNotification } from "@/lib/actions/notifications/saveActivityLogsNotification";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import FileUpload from "@/components/common/FileUpload";
import { Button } from "@/components/ui/button";
import IconsLoading from "@/components/icons/IconsLoading";
import { useModal } from "@/providers/modal-provider";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  subDomainName: z.string().optional(),
  favicon: z.string().optional(),
});

const FunnelForm = ({ prevData, subAccountId, refetch }) => {
  const [files, setFiles] = useState([]);
  const { setClose } = useModal();
  console.log("files", files);

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: prevData?.name || "",
      description: prevData?.description || "",
      favicon: prevData?.favicon || "",
      subDomainName: prevData?.subDomainName || "",
    },
  });

  const isLoading = form.formState.isLoading;

  const onSubmit = async (values) => {
    if (!subAccountId) return;
    try {
      const response = await upsertFunnels({
        subAccountId: subAccountId,
        funnel: {
          name: values?.name,
          description: values?.description,
          favicon: values?.favicon || files,
          subDomainName: values?.subDomainName,
        },
        funnelId: prevData?.id,
      });

      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Update funnel | ${response?.name}`,
        subaccountId: subAccountId,
      });
      toast.success("Create funnel successfully");
      refetch();
      form.reset();
      setClose();
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Failed to create funnel!");
    }
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Funnels Details</CardTitle>
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
                  <FormLabel>Funnel Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Funnel Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Tell us a little bit more about this funnel."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="subDomainName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub domain</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Sub domain for funnel" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="favicon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Funnel Name</FormLabel>
                  <FormControl>
                    <FileUpload
                      fieldChange={field.onChange}
                      setFiles={setFiles}
                      mediaUrl={prevData?.favicon}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isLoading} className="w-20 mt-4" type="submit">
              {form.formState.isSubmitting ? <IconsLoading /> : "Save"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FunnelForm;

FunnelForm.propTypes = {
  subAccountId: PropTypes.string,
  prevData: PropTypes.any,
  refetch: PropTypes.any,
};
