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
import { deleteFunnelPage } from "@/lib/actions/funnels/delete-funnel-page";
import { getFunnels } from "@/lib/actions/funnels/get-funnels";
import { upsertFunnelPage } from "@/lib/actions/funnels/upsert- funnelpage";
import { saveActivityLogsNotification } from "@/lib/actions/notifications/saveActivityLogsNotification";
import { useModal } from "@/providers/modal-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { CopyPlusIcon, Trash } from "lucide-react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  pathName: z.string().optional(),
});

const CreateFunnelPageForm = ({
  subAccountId,
  funnelId,
  order,
  prevData,
  refetch,
}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: prevData?.name || "",
      pathName: prevData?.pathName || "",
    },
  });

  const { setClose } = useModal();

  const onSubmit = async (values) => {
    if (order !== 0 && !values.pathName)
      return form.setError("pathName", {
        message:
          "Pages other than the first page in the funnel require a path name example 'secondstep'.",
      });

    try {
      const response = await upsertFunnelPage(
        subAccountId,
        {
          ...values,
          id: prevData?.id,
          order: prevData?.order || order || 0,
          pathName: values.pathName || "",
        },
        funnelId
      );

      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Updated a funnel page | ${response?.name}`,
        subAccountId: subAccountId,
      });

      toast.success("Save funnel page details successfully");
      refetch();
      setClose();

      return response;
    } catch (error) {
      console.log(error);
      toast.error("Could not save funnel page details");
    }
  };

  const handleDeleteFunnelPage = async () => {
    try {
      const response = await deleteFunnelPage(prevData?.id);

      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Deleted a funnel page | ${response?.name}`,
        subAccountId: subAccountId,
      });

      refetch();
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete funnel page!");
    }
  };

  const handleUpsertFunnelPage = async () => {
    try {
      const funnels = await getFunnels(subAccountId);
      const lastFunnelPage = funnels.find((funnel) => funnel.id === funnelId);

      const response = await upsertFunnelPage(
        subAccountId,
        {
          ...prevData,
          order: lastFunnelPage ? lastFunnelPage : 0,
          visits: 0,
          name: `${prevData?.name} Copy`,
          pathName: `${prevData?.pathName} Copy`,
          content: prevData?.content,
        },
        funnelId
      );
      toast.success("Save funnel page details successfully");
      refetch();

      return response;
    } catch (error) {
      console.log(error);
      toast.error("Could not save funnel page details");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Funnel Page</CardTitle>
        <CardDescription>
          Funnel pages are flow in the order they are created by default. You
          can move them around to change their order.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              disabled={form.formState.isSubmitting}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              disabled={form.formState.isSubmitting || order === 0}
              control={form.control}
              name="pathName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Path name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="path of the page"
                      value={field.value?.toLowerCase()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-2">
              <Button
                size="default"
                className="self-end"
                disabled={form.formState.isSubmitting}
                type="submit"
              >
                {form.formState.isSubmitting ? <IconsLoading /> : "Save page"}
              </Button>

              {prevData?.id && (
                <Button
                  variant="destructive"
                  className="w-[74px] self-end"
                  disabled={form.formState.isSubmitting}
                  type="button"
                  onClick={handleDeleteFunnelPage}
                >
                  {form.formState.isSubmitting ? <IconsLoading /> : <Trash />}
                </Button>
              )}

              {prevData?.id && (
                <Button
                  variant="outline"
                  size="icon"
                  disabled={form.formState.isSubmitting}
                  onClick={handleUpsertFunnelPage}
                >
                  {form.formState.isSubmitting ? (
                    <IconsLoading />
                  ) : (
                    <CopyPlusIcon />
                  )}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateFunnelPageForm;

CreateFunnelPageForm.propTypes = {
  subAccountId: PropTypes.string,
  funnelId: PropTypes.string,
  order: PropTypes.number,
  prevData: PropTypes.any,
  refetch: PropTypes.any,
};
