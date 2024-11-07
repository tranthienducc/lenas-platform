import SubAccountDetails from "@/components/common/SubAccountDetails";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";

const DialogCreateSubAccount = ({
  agencyDetails,
  userId,
  userName,
  details,
  refetch,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="flex gap-2 px-4 py-2 w-fit">
          <PlusIcon size={15} />
          Create sub account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sub account infomation</DialogTitle>
          <DialogDescription className="text-grayLight dark:text-grayDark">
            Please enter business details
          </DialogDescription>
        </DialogHeader>
        <SubAccountDetails
          setIsOpen={setIsOpen}
          refetch={refetch}
          agencyDetails={agencyDetails}
          userId={userId}
          userName={userName}
          details={details}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateSubAccount;

DialogCreateSubAccount.propTypes = {
  agencyDetails: PropTypes.any,
  userId: PropTypes.string,
  userName: PropTypes.string,
  details: PropTypes.any,
  refetch: PropTypes.func,
};
