import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FunnelForm from "@/pages/dashboard/funnels/_components/FunnelForm";
import PropTypes from "prop-types";
import { useState } from "react";

const DialogCreateFunnels = ({ subAccountId, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} setIsOpen={setIsOpen}>
      <DialogTrigger asChild>
        <span className="text-muted-foreground">Create Funnels</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create A Funnel</DialogTitle>
          <DialogDescription className="text-grayLight dark:text-grayDark">
            Funnels are a like websites, but better! Try creating one!
          </DialogDescription>
        </DialogHeader>
        <FunnelForm
          subAccountId={subAccountId}
          setIsOpen={setIsOpen}
          refetch={refetch}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateFunnels;

DialogCreateFunnels.propTypes = {
  subAccountId: PropTypes.string,
  refetch: PropTypes.any,
};
