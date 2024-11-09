import UserDetailsForms from "@/components/forms/UserDetailsForm";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteUser } from "@/lib/actions/user/delete-user";
import getAllProfile from "@/lib/actions/user/get-all-profile";
import { useGetAuthUserDetail } from "@/lib/tanstack-query/queries";
import CustomModal from "@/pages/subaccount/pipelines/_components/CustomModal";
import { useModal } from "@/providers/modal-provider";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "sonner";

const CellActions = ({ rowData }) => {
  const { setOpen } = useModal();
  const { refetch } = useGetAuthUserDetail();
  const [isCopy, setIsCopy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopyEmail = (data) => {
    navigator.clipboard.writeText(data);
    setIsCopy(true);
  };

  const handleDeleteUser = async () => {
    try {
      const response = await deleteUser(rowData?.user_id);

      toast.success("Delete users", {
        description:
          "The user has been deleted from this agency they no longer have access to the agency",
      });
      setIsLoading(false);
      refetch();
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: THÊM TÍNH NĂNG BAN USER

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal className="w-4 h-4 transition-all rounded-md cursor-pointer hover:bg-white/50" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => handleCopyEmail(rowData.email)}>
            {isCopy ? (
              <Copy className="w-4 h-4 mr-2 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 mr-2" />
            )}
            Copy Email
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex gap-2"
            onClick={() => {
              setOpen(
                <CustomModal
                  subheading="You can change permissions only when the user has an owned subaccount"
                  title="Edit User Details"
                >
                  <UserDetailsForms
                    type="agency"
                    id={rowData?.agency?.id || null}
                    subAccounts={rowData?.agency?.SubAccount}
                  />
                </CustomModal>,
                async () => {
                  return {
                    user: await getAllProfile({ userId: rowData?.user_id }),
                  };
                }
              );
            }}
          >
            <Edit size={15} />
            Edit Details
          </DropdownMenuItem>
          {rowData?.role !== "AGENCY_OWNER" && (
            <AlertDialogTrigger>
              <DropdownMenuItem className="text-red-600">
                <Trash className="w-4 h-4 mr-2" /> Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user
            and related data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteUser}
            disabled={isLoading}
            className="text-white bg-red-600 hover:bg-red-700"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CellActions;

CellActions.propTypes = {
  rowData: PropTypes.any,
};
