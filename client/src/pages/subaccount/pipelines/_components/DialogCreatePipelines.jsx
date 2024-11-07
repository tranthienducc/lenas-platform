import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import CreatePipelinesForm from "@/pages/subaccount/pipelines/_components/form/CreatePipelinesForm";
import PropTypes from "prop-types";
import { useState } from "react";

const DialogCreatePipelines = ({
  subAccountId,
  refetch,
  className,
  prevData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button type="button" className={cn("mt-0", className)}>
          Generate pipeline
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate pipeline</DialogTitle>
          <DialogDescription className="text-grayDark">
            Create pipeline for your project
          </DialogDescription>
        </DialogHeader>
        <CreatePipelinesForm
          subAccountId={subAccountId}
          refetch={refetch}
          setIsOpen={setIsOpen}
          prevData={prevData}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreatePipelines;

DialogCreatePipelines.propTypes = {
  subAccountId: PropTypes.string,
  className: PropTypes.string,
  refetch: PropTypes.any,
  prevData: PropTypes.any,
};
