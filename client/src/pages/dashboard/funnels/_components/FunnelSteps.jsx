import IconsFunnelPagePlaceholder from "@/components/icons/IconsFunnelPagePlaceholder";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { upsertFunnelPage } from "@/lib/actions/funnels/upsert- funnelpage";
import CreateFunnelPageForm from "@/pages/dashboard/funnels/_components/CreateFunnelPageForm";
import FunnelStepCard from "@/pages/dashboard/funnels/_components/FunnelStepCard";
import CustomModal from "@/pages/subaccount/pipelines/_components/CustomModal";
import { useModal } from "@/providers/modal-provider";
import {
  closestCenter,
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Link } from "@tanstack/react-router";
import { Check, ExternalLink, LucideEdit } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "sonner";

const FunnelSteps = ({ funnel, subAccountId, pages, funnelId, refetch }) => {
  const [clickedPage, setClickedPage] = useState(pages?.[0]);
  const { setOpen } = useModal();
  const [pagesState, setPagesState] = useState(pages);
  const [activePage, setActivePage] = useState(pages?.[0]?.id);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);
  const handlePageClick = (e, page) => {
    e.stopPropagation();
    setClickedPage(page);
    setActivePage(page?.id);
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const data = pagesState?.find((page) => page?.id === active?.id);

    return data;
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = pagesState.findIndex((page) => page.id === active.id);
    const newIndex = pagesState.findIndex((page) => page.id === over.id);

    if (oldIndex === newIndex) return;

    try {
      const newPageOrder = arrayMove(pagesState, oldIndex, newIndex);
      const updatedPages = newPageOrder.map((page, index) => ({
        ...page,
        order: index,
      }));

      setPagesState(updatedPages);

      await Promise.all(
        updatedPages.map((page) =>
          upsertFunnelPage(
            subAccountId,
            {
              id: page.id,
              order: page.order,
              name: page.name,
            },
            funnelId
          )
        )
      );

      toast.success("Page order updated");
      refetch();
    } catch (error) {
      console.error("Error updating page order:", error);
      toast.error("Failed to update page order");
      setPagesState(pagesState);
    }
  };

  return (
    <AlertDialog>
      <div className="flex border lg:!flex-row flex-col">
        <aside className="flex-[0.3] bg-background p-6 flex flex-col justify-between">
          <ScrollArea className="h-full">
            <div className="flex items-center gap-4 mb-4">
              <Check />
              Funnel Steps
            </div>
            {pagesState?.length > 0 ? (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={pagesState?.map((page) => page?.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {pagesState?.map(
                    (page) =>
                      page && (
                        <div
                          key={page?.id}
                          className="relative"
                          onClick={(e) => handlePageClick(e, page)}
                        >
                          <FunnelStepCard
                            activePage={page?.id === activePage}
                            funnelPage={page || {}}
                          />
                        </div>
                      )
                  )}
                </SortableContext>
              </DndContext>
            ) : (
              <div className="py-6 text-center text-muted-foreground">
                No Pages
              </div>
            )}
          </ScrollArea>

          <Button
            onClick={() => {
              setOpen(
                <CustomModal
                  title="Create or Update a Funnel Page"
                  subheading="Funnel Pages allow you to create step by step processes for customers to follow"
                >
                  <CreateFunnelPageForm
                    subAccountId={subAccountId}
                    funnelId={funnelId}
                    order={pagesState?.length}
                    refetch={refetch}
                  />
                </CustomModal>
              );
            }}
            className="w-full mt-4"
          >
            Create new steps
          </Button>
        </aside>
        <aside className="flex-[0.7] bg-[#1f1f1f] p-4">
          {pages?.length ? (
            <Card className="flex flex-col justify-between h-full">
              <CardHeader>
                <p className="text-sm text-muted-foreground">Page name</p>
                <CardTitle>{clickedPage?.name}</CardTitle>
                <CardDescription className="flex flex-col gap-4">
                  <div className="w-full border-2 rounded-lg sm:w-80 overflow-clip">
                    <Link
                      to={`/subaccount/${subAccountId}/funnel/${funnelId}/editor/${clickedPage?.id}`}
                      className="relative group"
                    >
                      <div className="w-full cursor-pointer group-hover:opacity-30">
                        <IconsFunnelPagePlaceholder />
                      </div>
                      <LucideEdit
                        size={50}
                        className="!text-muted-foreground absolute top-1/2 left-1/2 opacity-0 transform -translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 transition-all duration-100"
                      />
                    </Link>

                    <Link
                      target="_blank"
                      to={`${import.meta.env.VITE_SCHEME}${funnel?.subDomainName}.${import.meta.env.VITE_PUBLIC_DOMAIN}${clickedPage?.pathName}`}
                      className="flex items-center justify-start gap-2 p-2 transition-colors duration-200 group hover:text-primary"
                    >
                      <ExternalLink size={15} />
                      <div className="w-64 overflow-hidden overflow-ellipsis">
                        {import.meta.env.VITE_SCHEME}
                        {funnel?.subDomainName}.
                        {import.meta.env.VITE_PUBLIC_DOMAIN}
                        {clickedPage?.pathName}
                      </div>
                    </Link>
                  </div>

                  <CreateFunnelPageForm
                    subAccountId={subAccountId}
                    prevData={clickedPage}
                    funnelId={funnelId}
                    order={clickedPage?.order || 0}
                    refetch={refetch}
                  />
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="h-[600px] flex items-center justify-center text-muted-foreground">
              Create a page to view page settings.
            </div>
          )}
        </aside>
      </div>
    </AlertDialog>
  );
};

export default FunnelSteps;

FunnelSteps.propTypes = {
  funnel: PropTypes.any,
  subAccountId: PropTypes.string,
  pages: PropTypes.array,
  funnelId: PropTypes.string,
  refetch: PropTypes.func,
};
