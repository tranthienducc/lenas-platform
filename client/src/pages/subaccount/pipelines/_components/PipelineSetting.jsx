import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deletePipelines } from "@/lib/actions/pipelines/delete-pipelines";
import DialogCreatePipelines from "@/pages/subaccount/pipelines/_components/DialogCreatePipelines";
import { useRouter } from "@tanstack/react-router";
import PropTypes from "prop-types";
import { toast } from "sonner";

const PipelineSettings = ({ pipelineId, pipelines, subAccountId }) => {
  const router = useRouter();

  const handleDeletePipeline = async (id) => {
    try {
      const response = await deletePipelines(id);

      toast.success("Delete pipeline successfully");
      router.navigate(`/subaccount/${subAccountId}/pipelines`);
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Faild to delete pipelines");
    }
  };
  return (
    <AlertDialog>
      <div className="flex items-center justify-between mb-4">
        <AlertDialogTrigger asChild>
          <Button variant="destructive" type="button">
            Delete pipeline
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="items-start">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeletePipeline(pipelineId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </div>

      <DialogCreatePipelines
        subAccountId={subAccountId}
        prevData={pipelines?.find((p) => p?.id === pipelineId)}
      />
    </AlertDialog>
  );
};

export default PipelineSettings;

PipelineSettings.propTypes = {
  pipelineId: PropTypes.string,
  subAccountId: PropTypes.string,
  pipelines: PropTypes.array,
};
