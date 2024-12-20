import { getAuthUserDetail } from "@/lib/actions/user/get-auth-user-detail";
import { useEffect, useState } from "react";
import { z } from "zod";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUserPermission } from "@/lib/actions/user/get-user-permission";
import { changeUserPermission } from "@/lib/actions/user/change-user-permission";

import { saveActivityLogsNotification } from "@/lib/actions/notifications/saveActivityLogsNotification";
import { toast } from "sonner";
import { updatedUser } from "@/lib/actions/user/update-profile-by-email";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FileUpload from "@/components/common/FileUpload";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import IconsLoading from "@/components/icons/IconsLoading";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useModal } from "@/providers/modal-provider";

const userDataSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  profileImage: z.string(),
  role: z.enum([
    "AGENCY_OWNER",
    "AGENCY_ADMIN",
    "SUBACCOUNT_USER",
    "SUBACCOUNT_GUEST",
  ]),
});

const UserDetailsForms = ({ id, type, subAccounts, userData }) => {
  const [subAccountPermission, setSubAccountPermission] = useState(null);
  const [roleState, setRoleState] = useState("");
  const [loadingPermission, setLoadingPermission] = useState(false);
  const [authUserData, setAuthUserData] = useState(null);
  const [file, setFile] = useState([]);
  const { data, setClose } = useModal();

  useEffect(() => {
    if (data.user) {
      const fetchDetails = async () => {
        const response = await getAuthUserDetail();
        if (response) setAuthUserData(response);
      };
      fetchDetails();
    }
  }, [data]);

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(userDataSchema),
    defaultValues: {
      username: userData ? userData?.username : data?.user?.username,
      email: userData ? userData?.email : data?.user?.email,
      profileImage: userData
        ? userData?.profileImage
        : data?.user?.profileImage,
      role: userData ? userData?.role : data?.user?.role,
    },
  });

  useEffect(() => {
    if (!data.user) return;
    const getPermission = async () => {
      if (!data.user) return;
      const permission = await getUserPermission({
        userId: data?.user?.user_id,
      });
      setSubAccountPermission(permission);
    };
    getPermission();
  }, [data, form]);

  const onChangePermission = async (subAccountId, val, permissionsId) => {
    if (!data?.user?.email) return;
    setLoadingPermission(true);
    try {
      const response = await changeUserPermission(
        permissionsId,
        data?.user?.email,
        subAccountId,
        val
      );

      if (response) {
        if (type === "agency") {
          await saveActivityLogsNotification({
            agencyId: authUserData?.agency?.id,
            description: `Gave ${userData?.username} access to | ${
              subAccountPermission?.Permissions.find(
                (permission) => permission.subAccountId === subAccountId
              )?.SubAccount?.name
            }`,
            subAccountId: subAccountId,
          });
        }

        toast("Success", {
          description: "Successfully changed permission",
        });

        if (subAccountPermission) {
          setSubAccountPermission((prev) => ({
            ...prev,
            Permissions: prev.Permissions.map((per) =>
              per.subAccountId === subAccountId ? { ...per, access: val } : per
            ),
          }));
        }
      }
    } catch (error) {
      console.error("Permission change error:", error);
      toast.error("Failed to change permission");
    } finally {
      setLoadingPermission(false);
    }
  };

  const onSubmit = async (values) => {
    if (!id) return;
    try {
      if (userData || data?.user) {
        const updateUser = await updatedUser({
          user: {
            profileImage: values.profileImage || file,
            ...values,
          },
        });
        authUserData?.agency?.SubAccount?.filter((sub) =>
          authUserData?.Permissions?.find(
            (per) => per.subAccountId === sub?.id && per?.access
          )
        )?.forEach(async (subaccount) => {
          await saveActivityLogsNotification({
            agencyId: undefined,
            description: `Updated ${userData?.username} infomation`,
            subAccountId: subaccount?.id,
          });
        });
        if (updateUser) {
          toast("Success", {
            description: "Update user infomation",
          });
          setClose();
        } else {
          toast("Oppse!", {
            description: "Could not update user information",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("user-detail-permission", id);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User Details</CardTitle>
        <CardDescription className="text-grayLight dark:text-grayDark">
          Add or update your information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              disabled={form.formState.isSubmitting}
              control={form.control}
              name="profileImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Photo</FormLabel>
                  <FormControl>
                    <FileUpload
                      fieldChange={field.onChange}
                      setFiles={setFile}
                      mediaUrl={userData?.profileImage}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={form.formState.isSubmitting}
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>User fullname</FormLabel>
                  <FormControl>
                    <Input {...field} required placeholder="full name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={form.formState.isSubmitting}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly={
                        userData?.role === "AGENCY_OWNER" ||
                        form.formState.isSubmitting
                      }
                      placeholder="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={form.formState.isSubmitting}
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>User role</FormLabel>
                  <Select
                    disabled={field?.value === "AGENCY_OWNER"}
                    onValueChange={(value) => {
                      if (
                        value === "SUBACCOUNT_USER" ||
                        value === "SUBACCOUNT_GUEST"
                      ) {
                        setRoleState(
                          "You need to have a subaccounts to asign Subaccount access to team members."
                        );
                      } else {
                        setRoleState("");
                      }
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select user role..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="AGENCY_ADMIN">Agency Admin</SelectItem>
                      {(userData?.role === "AGENCY_OWNER" ||
                        userData?.role === "AGENCY_OWNER") && (
                        <SelectItem value="AGENCY_OWNER">
                          Agency Owner
                        </SelectItem>
                      )}

                      <SelectItem value="SUBACCOUNT_USER">
                        Sub Account User
                      </SelectItem>
                      <SelectItem value="SUBACCOUNT_GUEST">
                        Sub Account Guest
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-muted-foreground">{roleState}</p>
                </FormItem>
              )}
            />

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <IconsLoading />
              ) : (
                "Save User Details"
              )}
            </Button>
            {authUserData?.role === "AGENCY_OWNER" && (
              <>
                <Separator className="my-4" />
                <FormLabel>User permissions</FormLabel>
                <FormDescription className="mb-4">
                  You can give Sub Account access to team member by turning on
                  access control for each Sub Account. This is only visible to
                  agency owners
                </FormDescription>

                <div className="flex flex-col gap-4">
                  {subAccounts?.map((item) => {
                    const subAccountPermissionsDetails =
                      subAccountPermission?.Permissions?.find(
                        (per) => per.subAccountId === item?.id
                      );

                    return (
                      <div
                        className="flex items-center justify-between p-4 border rounded-xl border-white/15"
                        key={item?.id}
                      >
                        <p>{item?.name}</p>
                        <Switch
                          disabled={loadingPermission}
                          checked={
                            subAccountPermissionsDetails?.access || false
                          }
                          onCheckedChange={(per) => {
                            onChangePermission(
                              item?.id,
                              per,
                              subAccountPermissionsDetails?.id
                            );
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UserDetailsForms;

UserDetailsForms.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  subAccounts: PropTypes.any,
  userData: PropTypes.any,
};
