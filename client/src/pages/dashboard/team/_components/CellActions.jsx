import DialogUpdateUser from "@/components/common/DialogUpdateUser";
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
import { useGetAuthUserDetail } from "@/lib/tanstack-query/queries";
import { Copy, MoreHorizontal, Trash } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "sonner";

const CellActions = ({ rowData }) => {
  const { refetch } = useGetAuthUserDetail();
  const [isCopy, setIsCopy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!rowData?.agency) return null;

  const handleCopyEmail = (data) => {
    navigator.clipboard.writeText(data);
    setIsCopy(true);
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await deleteUser(id);

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

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreHorizontal className="w-4 h-4 transition-all rounded-md cursor-pointer hover:bg-white/50" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleCopyEmail}>
            {isCopy ? (
              <Copy className="w-4 h-4 mr-2 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 mr-2" />
            )}
            Copy Email
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <DialogUpdateUser rowData={rowData} />
          </DropdownMenuItem>
          {rowData?.role !== "AGENCY_OWNER" && (
            <AlertDialogTrigger asChild>
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
