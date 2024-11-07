import { saveActivityLogsNotification } from "@/lib/actions/notifications/saveActivityLogsNotification";
import { deleteTicket } from "@/lib/actions/ticket/delete-ticket";
import { useDraggable } from "@dnd-kit/core";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { CSS } from "@dnd-kit/utilities";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Contact2,
  LinkIcon,
  MoreHorizontalIcon,
  PlusCircleIcon,
  Trash,
  User2,
} from "lucide-react";
import Tags from "@/pages/subaccount/pipelines/_components/Tags";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useModal } from "@/providers/modal-provider";
import CustomModal from "@/pages/subaccount/pipelines/_components/CustomModal";
import CreateTicketForm from "@/pages/subaccount/pipelines/_components/form/CreateTicketForm";

const PipelineTicket = ({
  ticket,
  allTickets,
  setAllTickets,
  subAccountId,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: ticket?.id.toString(),
  });

  const { setOpen } = useModal();

  const editNewTicket = (ticket) => {
    setAllTickets(() =>
      allTickets?.map((tick) => {
        if (tick?.id === ticket?.id) {
          return ticket;
        }
        return tick;
      })
    );
  };

  const handleCreateTicket = () => {
    setOpen(
      <CustomModal
        title="Upset a ticket"
        subheading="Tickets are a great way to keep track of tasks"
      >
        <CreateTicketForm
          getNewTicket={editNewTicket}
          laneId={ticket?.laneId}
          subAccountId={subAccountId}
        />
      </CustomModal>
    );
  };

  const handleDeleteTicket = async () => {
    try {
      setAllTickets((tickets) => tickets.filter((t) => t?.id !== ticket?.id));
      const response = await deleteTicket(ticket?.id);
      toast.success("Delete ticket successfully");

      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Deleted a ticket | ${response?.name}`,
        subAccountId: subAccountId,
      });

      return response;
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete ticket");
    }
  };

  const offset = { x: 300, y: 20 };
  const style = {
    transform: transform
      ? CSS.Translate.toString({
          x: transform.x - offset.x,
          y: transform.y - offset.y,
        })
      : undefined,
  };

  return (
    <div {...attributes} {...listeners} ref={setNodeRef} style={style}>
      <AlertDialog>
        <DropdownMenu>
          <Card className="my-4 dark:bg-[#000] bg-white shadow-none transition-all">
            <CardHeader className="p-[12px]">
              <CardTitle className="flex items-center justify-between">
                <span className="w-full text-lg">{ticket?.name}</span>
                <DropdownMenuTrigger>
                  <MoreHorizontalIcon className="text-muted-foreground" />
                </DropdownMenuTrigger>
              </CardTitle>
              <span className="text-xs text-muted-foreground">
                {new Date().toLocaleDateString()}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {ticket?.Tags?.map((tag) => (
                  <Tags
                    key={tag?.id}
                    title={tag?.name}
                    colorName={tag?.color}
                  />
                ))}
              </div>
              <CardDescription className="w-full">
                {ticket?.description}
              </CardDescription>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="flex items-center gap-2 p-2 transition-all rounded-lg cursor-pointer text-muted-foreground hover:bg-muted">
                    <LinkIcon />
                    <span>Contact</span>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent side="left" className="w-fit">
                  <div className="flex justify-between space-x-4">
                    <Avatar>
                      <AvatarImage />
                      <AvatarFallback className="bg-primary">
                        {ticket?.Customer?.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">
                        {ticket?.Customer?.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {ticket?.Customer?.email}
                      </p>
                      <div className="flex items-center pt-2">
                        <Contact2 className="mr-2 size-4 opacity-70" />
                        <span className="text-xs text-muted-foreground">
                          Joined{" "}
                          {ticket.Customer?.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </CardHeader>
            <CardFooter className="m-0 p-2 border-t-[1px] border-muted-foreground/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage alt="contact" src={ticket.Assigned?.avatarUrl} />
                  <AvatarFallback className="text-sm text-white bg-primary">
                    {ticket.Assigned?.name}
                    {!ticket.assignedUserId && <User2 size={14} />}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center">
                  <span>
                    {ticket?.assignedUserId ? "Assigned to" : "Not Assigned"}
                  </span>
                  {ticket.assignedUserId && (
                    <span className="overflow-hidden text-xs w-28 overflow-ellipsis whitespace-nowrap text-muted-foreground">
                      {ticket?.Assigned?.name}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-sm font-bold">
                {!!ticket.value &&
                  new Intl.NumberFormat(undefined, {
                    style: "currency",
                    currency: "USD",
                  }).format(+ticket.value)}
              </span>
            </CardFooter>

            <DropdownMenuContent>
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <AlertDialogTrigger>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Trash size={15} />
                  Delete Ticket
                </DropdownMenuItem>
              </AlertDialogTrigger>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={handleCreateTicket}
              >
                <PlusCircleIcon size={15} />
                Upsert ticket
              </DropdownMenuItem>
            </DropdownMenuContent>
          </Card>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                ticket and remove it from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex items-center">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive"
                onClick={handleDeleteTicket}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </DropdownMenu>
      </AlertDialog>
    </div>
  );
};

export default PipelineTicket;

PipelineTicket.propTypes = {
  ticket: PropTypes.any,
  index: PropTypes.number,
  allTickets: PropTypes.array,
  setAllTickets: PropTypes.func,
  subAccountId: PropTypes.string,
};
