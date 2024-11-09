import SendInvitation from "@/components/common/SendInvitation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PropTypes from "prop-types";
import { useState } from "react";

const DialogCreateTeamMember = ({ agencyId }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button variant="outline">Add Team Member</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Team Member</DialogTitle>
          <DialogDescription>
            Invite a new member to join your team.
          </DialogDescription>
        </DialogHeader>
        <SendInvitation agencyId={agencyId} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateTeamMember;

DialogCreateTeamMember.propTypes = {
  agencyId: PropTypes.string,
};
