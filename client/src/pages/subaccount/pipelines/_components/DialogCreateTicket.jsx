import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateTicketForm from "@/pages/subaccount/pipelines/_components/form/CreateTicketForm";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const DialogCreateTicket = ({
  getNewTicket,
  laneId,
  subAccountId,
  prevData,
  refetchLanes,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    console.log("Popover open state changed:", isOpen);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <span>Create Ticket</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create A Ticket</DialogTitle>
          <DialogDescription>
            Tickets are a great way to keep track of tasks
          </DialogDescription>
        </DialogHeader>
        <CreateTicketForm
          getNewTicket={getNewTicket}
          laneId={laneId}
          subAccountId={subAccountId}
          setIsOpen={setIsOpen}
          prevData={prevData}
          refetchLanes={refetchLanes}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateTicket;

DialogCreateTicket.propTypes = {
  getNewTicket: PropTypes.any,
  laneId: PropTypes.string,
  subAccountId: PropTypes.string,
  prevData: PropTypes.any,
  refetchLanes: PropTypes.func,
};
