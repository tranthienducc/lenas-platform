import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LaneForm from "@/pages/subaccount/pipelines/_components/form/LaneForm";
import { Plus } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";

const DialogCreateLane = ({ pipelineId, prevData, refetchLanes }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="flex items-center gap-4">
          <Plus size={15} />
          Upsert lane
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate lanes for your pipelines</DialogTitle>
          <DialogDescription>
            Detail infomation for lanes like name
          </DialogDescription>
        </DialogHeader>
        <LaneForm
          pipelineId={pipelineId}
          prevData={prevData}
          refetchLanes={refetchLanes}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateLane;

DialogCreateLane.propTypes = {
  pipelineId: PropTypes.string,
  prevData: PropTypes.any,
  refetchLanes: PropTypes.any,
};
