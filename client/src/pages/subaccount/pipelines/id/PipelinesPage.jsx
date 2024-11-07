import { Link, useParams } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetAllPipelines,
  useGetLanesWithTickAndTags,
  useGetPipelinesDetails,
} from "@/lib/tanstack-query/queries";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import DialogCreatePipelines from "@/pages/subaccount/pipelines/_components/DialogCreatePipelines";
import { updateLandTicketAndTags } from "@/lib/actions/lane/update-lands-order";

import DialogCreateLane from "@/pages/subaccount/pipelines/_components/DialogCreateLane";

import { DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import PipelineLane from "@/pages/subaccount/pipelines/_components/PipelineLane";
import { updateTicketsOrder } from "@/lib/actions/ticket/update-ticket-order";
import PipelineSettings from "@/pages/subaccount/pipelines/_components/PipelineSetting";

const PipelinesPage = () => {
  const { pipelineId, id } = useParams({ strict: false });
  const { data: pipelineDetails } = useGetPipelinesDetails(pipelineId);
  const { data: pipelines = [], refetch } = useGetAllPipelines(id);
  const { data: lanes = [], refetch: refetchLanes } =
    useGetLanesWithTickAndTags(pipelineId);
  if (!pipelines) return null;

  console.log("lanes type:", typeof lanes, "lanes value:", lanes);

  return (
    <Tabs defaultValue="view" className="w-full">
      <TabsList className="justify-between w-full h-16 mb-4 bg-transparent border-b-2">
        <PipelineInfoBar
          pipelineId={pipelineId}
          subAccountId={id}
          pipelines={pipelines}
          refetch={refetch}
        />
        <TabsTrigger value="view">Pipeline view</TabsTrigger>
        <TabsTrigger value="settings">Pipeline settings</TabsTrigger>
      </TabsList>

      <TabsContent value="view">
        <PipelineView
          lanes={lanes}
          pipelineDetails={pipelineDetails}
          pipelineId={pipelineId}
          subAccountId={id}
          refetchLanes={refetchLanes}
          updateLanesOrder={updateLandTicketAndTags}
          updateTicketsOrder={updateTicketsOrder}
        />
      </TabsContent>
      <TabsContent value="settings">
        <PipelineSettings
          pipelineId={pipelineId}
          pipelines={pipelines}
          subAccountId={id}
        />
      </TabsContent>
    </Tabs>
  );
};

export default PipelinesPage;

function PipelineInfoBar({ pipelineId, subAccountId, pipelines, refetch }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex items-end gap-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              role="combobox"
              variant="outline"
              aria-expanded={isOpen}
              className="w-[200px] justify-between"
            >
              {pipelineId
                ? pipelines?.find((pipe) => pipe?.id === pipelineId)?.name
                : "Select a pipeline"}
              <ChevronsUpDown className="ml-2 opacity-50 size-4 shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandEmpty>No pipelines found</CommandEmpty>
              <CommandList>
                <CommandGroup heading="name">
                  {pipelines?.map((pipe) => (
                    <Link
                      key={pipe?.id}
                      to={`/subaccount/${subAccountId}/pipelines/${pipelineId}`}
                    >
                      <CommandItem key={pipe?.id} value={pipe?.id}>
                        <Check
                          className={cn(
                            "size-4 mr-2",
                            pipe?.id === pipelineId
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {pipe?.name}
                      </CommandItem>
                    </Link>
                  ))}
                  <DialogCreatePipelines
                    subAccountId={subAccountId}
                    refetch={refetch}
                    className="mt-4"
                  />
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
PipelineInfoBar.propTypes = {
  pipelineId: PropTypes.string,
  subAccountId: PropTypes.string.isRequired,
  pipelines: PropTypes.array.isRequired,
  refetch: PropTypes.func.isRequired,
};

function PipelineView({
  pipelineId,
  lanes,
  pipelineDetails,
  subAccountId,
  updateLanesOrder,
  updateTicketsOrder,
  refetchLanes,
}) {
  const [allLanes, setAllLanes] = useState([]);

  useEffect(() => {
    if (lanes?.data && Array.isArray(lanes.data)) {
      setAllLanes(lanes.data);
    }
  }, [lanes]);

  const ticketsFromAllLanes = [];
  console.log("all-lane", allLanes);

  lanes?.data?.forEach((item) => {
    item?.Ticket?.forEach((i) => {
      ticketsFromAllLanes?.push(i);
    });
  });

  const [allTickets, setAllTickets] = useState(ticketsFromAllLanes);

  const onDragEnd = ({ active, over }) => {
    if (!over) return;

    if (active?.id.startsWith("lane") && over?.id.startsWith("lane")) {
      const oldIndex = allLanes.findIndex(
        (lane) => `lane-${lane?.id}` === active?.id
      );
      const newIndex = allLanes.findIndex(
        (lane) => `lane-${lane?.id}` === over?.id
      );

      if (oldIndex !== newIndex) {
        const newLanes = arrayMove(allLanes, oldIndex, newIndex)?.map(
          (lane, idx) => ({
            ...lane,
            order: idx,
          })
        );
        setAllLanes(newLanes);
        updateLanesOrder(newLanes);
      }
    }
    if (active.id.startsWith("ticket") && over.id.startsWith("ticket")) {
      const [activeLaneId, activeTicketId] = active.id.split("-").slice(1);
      const [overLaneId, overTicketId] = over.id.split("-").slice(1);

      const originLane = allLanes.find((lane) => lane.id === activeLaneId);
      const destinationLane = allLanes.find((lane) => lane.id === overLaneId);

      if (!originLane || !destinationLane) return;

      if (activeLaneId === overLaneId) {
        const oldIndex = originLane.Tickets.findIndex(
          (ticket) => ticket.id === activeTicketId
        );
        const newIndex = destinationLane.Tickets.findIndex(
          (ticket) => ticket.id === overTicketId
        );

        if (oldIndex !== newIndex) {
          const newLanes = arrayMove(allLanes, oldIndex, newIndex)?.map(
            (lane, idx) => ({
              ...lane,
              order: idx,
            })
          );
          setAllLanes(newLanes);
          updateLanesOrder(newLanes);
        }
      } else {
        const originLaneTickets = originLane?.Ticket || [];
        const originTicketIndex = originLaneTickets.findIndex(
          (ticket) => ticket.id === activeTicketId
        );

        if (originTicketIndex !== -1) {
          const [currentTicket] = originLaneTickets.splice(
            originTicketIndex,
            1
          );

          // Đảm bảo `currentTicket` hợp lệ trước khi thay đổi `laneId`
          if (currentTicket) {
            currentTicket.laneId = destinationLane?.id;

            const destinationLaneTickets = destinationLane?.Ticket || [];
            const destinationTicketIndex = destinationLaneTickets.findIndex(
              (ticket) => ticket?.id === overTicketId
            );

            // Nếu không tìm thấy vị trí để thêm ticket vào, mặc định thêm vào đầu
            const insertPosition =
              destinationTicketIndex !== -1 ? destinationTicketIndex : 0;

            destinationLaneTickets.splice(insertPosition, 0, currentTicket);

            // Cập nhật thứ tự
            originLaneTickets.forEach((ticket, idx) => (ticket.order = idx));
            destinationLaneTickets.forEach(
              (ticket, idx) => (ticket.order = idx)
            );

            // Cập nhật lại dữ liệu lanes
            setAllLanes([...allLanes]);
            updateTicketsOrder([
              ...originLaneTickets,
              ...destinationLaneTickets,
            ]);
            refetchLanes();
          }
        }
      }
    }
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="p-4 bg-white/60 dark:bg-[#080808] rounded-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">{pipelineDetails?.name}</h1>
          <DialogCreateLane pipelineId={pipelineId} />
        </div>
        {Array.isArray(allLanes) && allLanes.length > 0 ? (
          <SortableContext
            items={allLanes.map((lane) => `lane-${lane.id}`)}
            strategy={horizontalListSortingStrategy}
          >
            <div className="flex items-center overflow-scroll gap-x-2">
              <div className="flex mt-4">
                {allLanes.map((lane, index) => (
                  <PipelineLane
                    prevData={lanes?.data}
                    key={lane?.id}
                    laneDetails={lane}
                    allTickets={allTickets}
                    setAllTickets={setAllTickets}
                    subAccountId={subAccountId}
                    pipelineId={pipelineId}
                    tickets={lane?.Ticket}
                    index={index}
                    refetchLanes={refetchLanes}
                  />
                ))}
              </div>
            </div>
          </SortableContext>
        ) : (
          <div className="flex items-center justify-center h-40">
            <p className="text-gray-500">No lanes available</p>
          </div>
        )}
      </div>
    </DndContext>
  );
}

PipelineView.propTypes = {
  pipelineId: PropTypes.string,
  subAccountId: PropTypes.string,
  lanes: PropTypes.any,
  pipelineDetails: PropTypes.any,
  updateLanesOrder: PropTypes.func,
  updateTicketsOrder: PropTypes.func,
  refetchLanes: PropTypes.func,
};
