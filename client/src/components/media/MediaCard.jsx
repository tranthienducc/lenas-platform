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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteMedia } from "@/lib/actions/media/delete-media";
import { saveActivityLogsNotification } from "@/lib/actions/notifications/saveActivityLogsNotification";
import { Copy, MoreHorizontal, Trash } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "sonner";

const MediaCard = ({ file, refetch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const onCopy = (data) => {
    navigator.clipboard.writeText(data);
    toast.success("Copied to clipboard");
  };

  const handleDeleteMedia = async (file) => {
    setIsLoading(true);
    try {
      const response = await deleteMedia(file);
      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Deleted a media file | ${response?.name}`,
        subAccountId: response?.subAccountId,
      });
      toast.success("Delete media successfully");
      setIsLoading(false);
      refetch();
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete media");
    }
  };

  return (
    <AlertDialog>
      <DropdownMenu>
        <article className="w-full bg-black border rounded-xl">
          <div className="relative w-full h-40">
            <img
              src={file?.link}
              alt="media-image"
              loading="lazy"
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
          <p className="opacity-0 size-0">{file?.name}</p>
          <div className="relative p-4">
            <p className="text-muted-foreground">
              {new Date(file?.createdAt).toDateString()}
            </p>
            <p>{file?.name}</p>
            <div className="absolute top-4 right-4 p-[1px] cursor-pointer">
              <DropdownMenuTrigger>
                <MoreHorizontal />
              </DropdownMenuTrigger>
            </div>
          </div>

          <DropdownMenuContent>
            <DropdownMenuLabel>Menu</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex gap-2"
              onClick={() => onCopy(file?.link)}
            >
              <Copy size={15} /> Copy image link
            </DropdownMenuItem>
            <AlertDialogTrigger>
              <DropdownMenuItem className="flex gap-2">
                <Trash size={15} /> Delete File
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </article>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left">
            Are you sure you want to delete this file? All subaccount using this
            file will no longer have access to it!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={() => handleDeleteMedia(file?.id)}
            className="text-white bg-destructive hover:bg-destructive"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MediaCard;

MediaCard.propTypes = {
  file: PropTypes.any,
  refetch: PropTypes.any,
};
