import UserDetailsForms from "@/components/forms/UserDetailsForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";

const DialogUpdateUser = ({ rowData }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center">
          <Edit className="w-4 h-4 mr-2" /> Edit
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>This is text</DialogTitle>
          <DialogDescription>this is text</DialogDescription>
        </DialogHeader>
        <UserDetailsForms
          type="agency"
          id={rowData?.[0]?.agency?.id || null}
          subAccounts={rowData?.[0]?.agency?.SubAccount}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DialogUpdateUser;

DialogUpdateUser.propTypes = {
  rowData: PropTypes.any,
};
