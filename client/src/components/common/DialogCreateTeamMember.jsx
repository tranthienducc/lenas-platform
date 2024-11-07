import SendInvitation from "@/components/common/SendInvitation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";

const DialogCreateTeamMember = ({ agencyId }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button type="button" className="flex gap-2 px-4 py-2 w-fit">
          <PlusIcon size={15} />
          <span>Add Team Member</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Team Member</DialogTitle>
          <DialogDescription>
            Invite a new member to join your team.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <SendInvitation agencyId={agencyId} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateTeamMember;

DialogCreateTeamMember.propTypes = {
  agencyId: PropTypes.string,
};
