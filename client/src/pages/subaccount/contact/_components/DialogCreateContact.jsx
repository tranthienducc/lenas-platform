import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ContactUserForm from "@/pages/subaccount/contact/_components/ContactUserForm";
import PropTypes from "prop-types";
import { useState } from "react";

const DialogCreateContact = ({ subAccountId, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button className="mb-4" type="button">
          Create Contact
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Or Update Contact information</DialogTitle>
          <DialogDescription>Contacts are like customers.</DialogDescription>
        </DialogHeader>

        <ContactUserForm
          subAccountId={subAccountId}
          refetch={refetch}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateContact;

DialogCreateContact.propTypes = {
  subAccountId: PropTypes.string,
  refetch: PropTypes.any,
};
