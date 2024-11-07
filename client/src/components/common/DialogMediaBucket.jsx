import MediaBucketForm from "@/components/forms/MediaBucketForm";
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

const DialogMediaBucket = ({ subAccountId, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button">
          <PlusIcon size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Media</DialogTitle>
          <DialogDescription>
            Upload a file to your media bucket
          </DialogDescription>
        </DialogHeader>
        <MediaBucketForm
          subAccountId={subAccountId}
          refetch={refetch}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DialogMediaBucket;

DialogMediaBucket.propTypes = {
  subAccountId: PropTypes.string,
  refetch: PropTypes.any,
};
