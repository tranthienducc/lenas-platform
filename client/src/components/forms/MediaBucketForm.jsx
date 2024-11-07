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
import { createMedia } from "@/lib/actions/media/create-media";
import { saveActivityLogsNotification } from "@/lib/actions/notifications/saveActivityLogsNotification";
import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  link: z.string(),
});

const MediaBucketForm = ({ subAccountId, refetch, setIsOpen }) => {
  const [files, setFiles] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      link: "",
    },
  });
  console.log("sub-id", files);

  const onSubmit = async (values) => {
    try {
      const response = await createMedia({
        subAccountId: subAccountId,
        link: values?.link || files,
        name: values?.name,
      });
      await saveActivityLogsNotification({
        subAccountId: subAccountId,
        agencyId: undefined,
        description: `Upload a media file | ${response?.name}`,
      });
      toast("Create media successfully");
      refetch();
      setIsOpen(false);
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Failed to create media");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>File name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Your agency name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Media File</FormLabel>
              <FormControl>
                <FileUpload fieldChange={field.onChange} setFiles={setFiles} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="mt-4" type="submit">
          Upload
        </Button>
      </form>
    </Form>
  );
};

export default MediaBucketForm;

MediaBucketForm.propTypes = {
  subAccountId: PropTypes.string,
  refetch: PropTypes.any,
  setIsOpen: PropTypes.func,
};
