import FileUpload from "@/components/common/FileUpload";
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
import { upsertSubAccount } from "@/lib/actions/subaccount/upsert-sub-account";
import { zodResolver } from "@hookform/resolvers/zod";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 } from "uuid";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  companyEmail: z.string(),
  companyPhone: z.string().min(1),
  address: z.string(),
  city: z.string(),
  subAccountLogo: z.string(),
  zipCode: z.string(),
  state: z.string(),
  country: z.string(),
});

// Give access for Subaccount Guest they should see a different view maybe a form that allows them to create tickets

const SubAccountDetails = ({
  agencyDetails,
  userId,
  userName,
  details,
  refetch,
  setIsOpen,
}) => {
  const [file, setFile] = useState([]);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: details?.name || "",
      companyEmail: details?.companyEmail || "",
      companyPhone: details?.companyPhone || "",
      address: details?.address || "",
      city: details?.city || "",
      zipCode: details?.zipCode || "",
      state: details?.state || "",
      country: details?.country || "",
      subAccountLogo: details?.subAccountLogo || "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const response = await upsertSubAccount({
        id: details?.id || v4(),
        address: values.address,
        subAccountLogo: values?.subAccountLogo || file,
        city: values?.city,
        companyPhone: values?.companyPhone,
        country: values?.country,
        name: values?.name,
        state: values?.state,
        zipCode: values?.zipCode,
        createdAt: new Date(),
        updatedAt: new Date(),
        companyEmail: values?.companyEmail,
        agencyId: agencyDetails.id,
        connectAccountId: "",
        goal: 5000,
      });
      toast.success("Sub account create successfullyy");
      form.reset();

      await saveActivityLogsNotification({
        agencyId: agencyDetails?.id,
        description: `${userName} | update sub account | ${response?.name}`,
        subAccountId: agencyDetails?.SubAccount?.[0]?.id,
      });

      refetch();

      setIsOpen(false);

      return response;
    } catch (error) {
      console.log(error);
      toast.error("Fail to create subaccount");
    }
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          disabled={isLoading}
          control={form.control}
          name="subAccountLogo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Logo</FormLabel>
              <FormControl>
                <FileUpload fieldChange={field.onChange} setFiles={setFile} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 mt-3 md:flex-row">
          <FormField
            disabled={isLoading}
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Account Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your account name" required {...field} />
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
              <FormItem className="flex-1">
                <FormLabel>Account Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 mt-3 md:flex-row">
          <FormField
            disabled={isLoading}
            control={form.control}
            name="companyPhone"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Account Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone" required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isLoading}
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 st..." required {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 mt-3 md:flex-row">
          <FormField
            disabled={isLoading}
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="City" required {...field} />
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
              <FormItem className="flex-1">
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="State" required {...field} />
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
              <FormItem className="flex-1">
                <FormLabel>Zip code</FormLabel>
                <FormControl>
                  <Input placeholder="Zipcode" required {...field} />
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
            <FormItem className="flex-1 my-3">
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="Country" required {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? <IconsLoading /> : "Save Account Information"}
        </Button>
      </form>
    </Form>
  );
};

export default SubAccountDetails;

SubAccountDetails.propTypes = {
  agencyDetails: PropTypes.any,
  userId: PropTypes.string,
  userName: PropTypes.string,
  details: PropTypes.any,
  refetch: PropTypes.func,
  setIsOpen: PropTypes.func,
};
