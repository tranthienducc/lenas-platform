import { useDraggable } from "@dnd-kit/core";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Edit, MoreHorizontal, PlusCircleIcon, Trash } from "lucide-react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import PipelineTicket from "@/pages/subaccount/pipelines/_components/PipelineTicket";
import { deleteLane } from "@/lib/actions/lane/delete-lane";
import { saveActivityLogsNotification } from "@/lib/actions/notifications/saveActivityLogsNotification";
import { toast } from "sonner";
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
import { useModal } from "@/providers/modal-provider";
import CustomModal from "@/pages/subaccount/pipelines/_components/CustomModal";
import CreateTicketForm from "@/pages/subaccount/pipelines/_components/form/CreateTicketForm";
import LaneForm from "@/pages/subaccount/pipelines/_components/form/LaneForm";

const PipelineLane = ({
  laneDetails,
  allTickets,
  setAllTickets,
  subAccountId,
  pipelineId,
  tickets = [],
  refetchLanes,
  prevData,
}) => {
  const amt = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
  });

  const { setOpen, setClose } = useModal();

  const laneAmt = useMemo(() => {
    if (!Array.isArray(tickets) || tickets.length === 0) return 0;
    return tickets.reduce(
      (sum, ticket) => sum + (Number(ticket?.value) || 0),
      0
    );
  }, [tickets]);

  const randomColor = `#${Math.random().toString(16).slice(2, 8)}`;

  const addNewTickets = (ticket) => {
    setAllTickets([...allTickets, ticket]);
  };

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: laneDetails?.id.toString(),
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition: "transform 200ms ease",
  };

  const handleDeleteLane = async () => {
    try {
      const response = await deleteLane(laneDetails?.id);
      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Deleted a lane | ${response?.name}`,
        subAccountId,
      });

      toast.success("Deleted lane successfully");
      refetchLanes();
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Failed to deleted lane!");
    }
  };

  const handleCreateTicket = () => {
    setOpen(
      <CustomModal
        title="Upset a ticket"
        subheading="Tickets are a great way to keep track of tasks"
      >
        <CreateTicketForm
          getNewTicket={addNewTickets}
          laneId={laneDetails.id}
          subAccountId={subAccountId}
          prevData={prevData}
          refetchLanes={refetchLanes}
          setClose={setClose}
        />
      </CustomModal>
    );
  };

  const handleEditTicket = () => {
    setOpen(
      <CustomModal title="Edit Lane Details" subheading="Upsert a lane details">
        <LaneForm
          pipelineId={pipelineId}
          defaultData={laneDetails}
          prevData={prevData}
          refetchLanes={refetchLanes}
        />
      </CustomModal>
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="h-full"
    >
      <AlertDialog>
        <DropdownMenu>
          <div className="bg-slate-200/30 dark:bg-inherit h-[700px] w-[300px] px-4 relative rounded-lg overflow-visible flex-shrink-0">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-inherit bg-[radial-gradient(#8685852e_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div
              {...attributes}
              {...listeners}
              className="absolute top-0 left-0 right-0 z-10 h-14 backdrop-blur-lg dark:bg-background/40 bg-slate-200/60"
            >
              <div className="h-full flex items-center p-4 justify-between cursor-grab border-b-[1px]">
                <div className="flex items-center w-full gap-2">
                  <div
                    className={cn("size-4 rounded-full")}
                    style={{ background: randomColor }}
                  />
                  <span className="text-sm font-bold">{laneDetails?.name}</span>
                </div>
                <div className="flex flex-row items-center">
                  <Badge className="text-black bg-white">
                    {amt.format(laneAmt)}
                  </Badge>
                  <DropdownMenuTrigger asChild>
                    <MoreHorizontal className="cursor-pointer text-muted-foreground" />
                  </DropdownMenuTrigger>
                </div>
              </div>
            </div>

            <div className="max-h-[700px] overflow-scroll pt-12">
              <SortableContext
                items={tickets?.map((t) => t?.id.toString())}
                strategy={verticalListSortingStrategy}
              >
                <div className="mt-2">
                  {tickets?.map((ticket, index) => (
                    <PipelineTicket
                      key={ticket?.id.toString()}
                      ticket={ticket}
                      index={index}
                      allTickets={allTickets}
                      setAllTickets={setAllTickets}
                      subAccountId={subAccountId}
                    />
                  ))}
                </div>

                <DropdownMenuContent>
                  <DropdownMenuLabel>Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <AlertDialogTrigger>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Trash size={15} />
                      Delete
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <DropdownMenuItem
                    className="flex items-center gap-2"
                    onClick={handleEditTicket}
                  >
                    <Edit size={15} />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleCreateTicket}>
                    <PlusCircleIcon size={15} />
                    Upsert ticket
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </SortableContext>
            </div>
          </div>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex items-center">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive"
                onClick={handleDeleteLane}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </DropdownMenu>
      </AlertDialog>
    </div>
  );
};

export default PipelineLane;

PipelineLane.propTypes = {
  laneDetails: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  allTickets: PropTypes.array,
  setAllTickets: PropTypes.func,
  subAccountId: PropTypes.string,
  pipelineId: PropTypes.string,
  tickets: PropTypes.any,
  index: PropTypes.number,
  refetchLanes: PropTypes.func,
  prevData: PropTypes.any,
};
