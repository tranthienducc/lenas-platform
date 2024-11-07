import DialogCreateSubAccount from "@/components/common/DialogCreateSubAccount";
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
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { saveActivityLogsNotification } from "@/lib/actions/notifications/saveActivityLogsNotification";
import { deleteSubAccount } from "@/lib/actions/subaccount/delete-sub-account";

import {
  useGetAuthUserDetail,
  useGetNotificationsAndUser,
} from "@/lib/tanstack-query/queries";
import { Link } from "@tanstack/react-router";

const AllSubaccountPage = () => {
  const { data: user } = useGetAuthUserDetail();
  const { refetch } = useGetNotificationsAndUser(user?.agency?.id);

  const handleDeleteSubAccount = async (id, subaccountName) => {
    try {
      const response = await deleteSubAccount(id);
      await saveActivityLogsNotification({
        agencyId: user?.agency?.id,
        description: `Deleted a subaccount | ${subaccountName?.name}`,
        subAccountId: id,
      });
      refetch();

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog>
      <div className="flex flex-col">
        <DialogCreateSubAccount
          refetch={refetch}
          userId={user?.user_id}
          userName={user?.username}
          agencyDetails={user?.agency}
        />
        <Command className="mt-2 bg-transparent rounded-xl">
          <CommandInput placeholder="Sub Accounts" />
          <CommandList>
            <CommandEmpty>No Results Found.</CommandEmpty>
            <CommandGroup heading="Sub Accounts">
              {!!user?.agency?.SubAccount.length > 0 ? (
                user?.agency?.SubAccount?.map((subaccount) => (
                  <CommandItem
                    key={subaccount?.id}
                    className="h-32 !bg-background my-2 text-primary border border-border p-4 rounded-md hover:!bg-background cursor-pointer transition-all "
                  >
                    <Link
                      to={`/subaccount/${subaccount?.id}`}
                      className="flex w-full h-full gap-4"
                    >
                      <div className="relative w-32">
                        <img
                          src={
                            subaccount?.subAccountLogo ||
                            "/assets/images/avatar-user.png"
                          }
                          alt="subaccount-logo"
                          className="object-contain w-full h-full p-4 rounded-md bg-muted/50"
                        />
                      </div>
                      <div className="flex flex-col justify-between">
                        <div className="flex flex-col">
                          {subaccount?.name}
                          <span className="text-muted-foreground">
                            {subaccount?.address}
                          </span>
                        </div>
                      </div>
                    </Link>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        className="w-20 hover:bg-red-600 hover:text-white !text-white"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-left">
                          Are your absolutely sure
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-left">
                          This action cannot be undon. This will delete the
                          subaccount and all data related to the subaccount.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="mb-2">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="text-white bg-destructive hover:bg-destructive"
                          onClick={() =>
                            handleDeleteSubAccount(
                              subaccount?.id,
                              subaccount?.[0]?.name
                            )
                          }
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </CommandItem>
                ))
              ) : (
                <div className="p-4 text-sm text-center text-muted-foreground">
                  No Sub accounts
                </div>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </AlertDialog>
  );
};

export default AllSubaccountPage;
