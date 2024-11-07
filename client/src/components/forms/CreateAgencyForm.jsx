import FileUpload from "@/components/common/FileUpload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import PropTypes from "prop-types";
import { initUser } from "@/lib/actions/user/init-user";
import { upsertAgency } from "@/lib/actions/agency/upsert-agency";
import { v4 } from "uuid";
import { useNavigate } from "@tanstack/react-router";
import IconsLoading from "@/components/icons/IconsLoading";
import { NumberInput } from "@tremor/react";
import { updateAgencyDetail } from "@/lib/actions/agency/update-agency-detail";
import { saveActivityLogsNotification } from "@/lib/actions/notifications/saveActivityLogsNotification";
import {
  useGetAgencyByUser,
  useGetAllProfile,
  useGetCurrentUser,
} from "@/lib/tanstack-query/queries";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteAgency } from "@/lib/actions/agency/delete-agency";

const formSchema = z.object({
  name: z.string().min(2, { message: "Agency name must be atleast 2 chars." }),
  companyEmail: z.string().min(1),
  companyPhone: z.string().min(1),
  whiteLabel: z.boolean(),
  address: z.string().min(1),
  city: z.string().min(1),
  zipCode: z.string().min(1),
  state: z.string().min(1),
  country: z.string().min(1),
  agencyLogo: z.string().min(1),
});

const CreateAgencyForm = ({ data }) => {
  const [files, setFiles] = useState([]);
  const [deletedAgency, setDeletedAgency] = useState(false);
  const navigate = useNavigate();
  const { data: user } = useGetCurrentUser();
  const { data: profile } = useGetAllProfile(user?.id);
  const { data: agencyId, refetch } = useGetAgencyByUser(profile?.id);

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name,
      companyEmail: data?.companyEmail,
      companyPhone: data?.companyPhone || "",
      whiteLabel: data?.whiteLabel || false,
      address: data?.address || "",
      city: data?.city || "",
      zipCode: data?.zipCode || "",
      state: data?.state || "",
      country: data?.country || "",
      agencyLogo: data?.agencyLogo || "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleDeleteAgency = async () => {
    if (!data?.id) return;
    setDeletedAgency(true);
    try {
      const response = await deleteAgency(data?.id);
      toast.success("Delete agency successfully");
      setDeletedAgency(false);
      navigate({ to: `/agency` });
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete agency");
    }
  };

  const onSubmit = async (values) => {
    try {
      let custId;

      if (!data?.id) {
        const bodyData = {
          email: values.companyEmail,
          name: values.name,
          shipping: {
            address: {
              city: values.city,
              country: values.country,
              line1: values.address,
              postal_code: values.zipCode,
              state: values.state,
            },
            name: values?.name,
          },
          address: {
            city: values.city,
            country: values.country,
            line1: values.address,
            postal_code: values.zipCode,
            state: values.state,
          },
        };

        const customerResponse = await fetch("/api/stripe/create-customer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        });

        const customData = await customerResponse.json();
        custId = customData.customerId;
      }

      await initUser({ role: "AGENCY_OWNER" });

      if (!data?.customerId && !custId) return;
      const response = await upsertAgency({
        id: data?.id ? data.id : v4(),
        customerId: data?.customerId || custId || "",
        address: values.address,
        agencyLogo: values.agencyLogo || files,
        city: values.city,
        companyPhone: values.companyPhone,
        country: values.country,
        name: values.name,
        state: values.state,
        whiteLabel: values.whiteLabel,
        zipCode: values.zipCode,
        createdAt: new Date(),
        updatedAt: new Date(),
        companyEmail: values.companyEmail,
        connectAccountId: "",
        goal: 5,
      });
      toast.success("Create agency successfully");
      refetch();
      navigate({ to: `/dashboard/${agencyId?.[0]?.id}` });
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Failed to create agency!");
    }
  };

  return (
    <AlertDialog>
      <Card className="w-full max-w-[700px] mt-6">
        <CardHeader>
          <CardTitle>Agency Infomation</CardTitle>
          <CardDescription className="text-grayLight dark:text-grayDark">
            {" "}
            Lets create an agency for you business. You can edit agency settings
            later from the agency settings tab.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                disabled={isLoading}
                control={form.control}
                name="agencyLogo"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Agency Logo</FormLabel>
                    <FormControl>
                      <FileUpload
                        fieldChange={field.onChange}
                        setFiles={setFiles}
                        mediaUrl={data?.[0]?.agencyLogo}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-4">
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-4 max-w-[350px] w-full">
                      <FormLabel>Agency Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your agency name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="companyEmail"
                  render={({ field }) => (
                    <FormItem className="mb-4 max-w-[350px] w-full">
                      <FormLabel>Agency Email</FormLabel>
                      <FormControl>
                        <Input placeholder="agency@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                disabled={isLoading}
                control={form.control}
                name="companyPhone"
                render={({ field }) => (
                  <FormItem className="w-full mb-4">
                    <FormLabel>Agency Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+01 234 567 90" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="whiteLabel"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Whitelabel Agency
                      </FormLabel>
                      <FormDescription>
                        Turning on whitelable mode will show your agency logo to
                        all sub accounts by default. You can overwrite this
                        functionality through sub account settings.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-full mb-4">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 st..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-4">
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="mb-4 max-w-[350px] w-full">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="mb-4 max-w-[350px] w-full">
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="state" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem className="mb-4 max-w-[350px] w-full">
                      <FormLabel>Zipcode</FormLabel>
                      <FormControl>
                        <Input placeholder="0123456789" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                disabled={isLoading}
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="w-full mb-4">
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {data?.id && (
                <div className="flex flex-col gap-2">
                  <FormLabel>Create A Goal</FormLabel>
                  <FormDescription>
                    ✨Create a goal for your agency. As your business grows your
                    goals grow too so dont forget to set the bar higher!
                  </FormDescription>
                  <NumberInput
                    defaultValue={data?.goal}
                    onValueChange={async (val) => {
                      if (!data?.id) return;
                      await updateAgencyDetail(data?.id, { goal: val });
                      await saveActivityLogsNotification({
                        agencyId: data?.id,
                        description: `Updated the agency goal to | ${val} Sub Account`,
                        subAccountId: undefined,
                      });
                      refetch();
                    }}
                    min={1}
                    className="bg-background !border !border-input"
                    placeholder="Sub Account Goal"
                  />
                </div>
              )}
              <div className="flex items-end justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <IconsLoading /> : "Save changes"}
                </Button>
              </div>
            </form>
          </Form>
          {data?.id && (
            <div className="flex flex-row items-center justify-between gap-4 p-4 mt-4 border rounded-xl border-destructive">
              <span className="text-grayLight dark:text-grayDark">
                Danger Zone
              </span>
              <p className="text-muted-foreground">
                {" "}
                Deleting your agency cannpt be undone. This will also delete all
                sub accounts and all data related to your sub accounts. Sub
                accounts will no longer have access to funnels, contacts etc.
              </p>
              <AlertDialogTrigger
                disabled={isLoading || deletedAgency}
                className="p-2 mt-2 text-center text-red-600 rounded-md hover:bg-red-600 hover:text-white whitespace-nowrap"
              >
                {deletedAgency ? "Deleting..." : "Delete Agency"}
              </AlertDialogTrigger>
            </div>
          )}
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-left">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-left">
                This action cannot be undone. This will permanently delete the
                Agency account and all related sub accounts.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex items-center">
              <AlertDialogCancel className="mb-2">Cancel</AlertDialogCancel>
              <AlertDialogAction
                disabled={deletedAgency}
                className="bg-destructive hover:bg-destructive"
                onClick={handleDeleteAgency}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </CardContent>
      </Card>
    </AlertDialog>
  );
};

export default CreateAgencyForm;
CreateAgencyForm.propTypes = {
  data: PropTypes.any,
};
