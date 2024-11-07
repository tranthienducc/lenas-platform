import { useGetFunnels } from "@/lib/tanstack-query/queries";
import { columns } from "@/pages/dashboard/funnels/_components/columns";
import FunnelsDataTable from "@/pages/dashboard/funnels/_components/data-table";
import FunnelForm from "@/pages/dashboard/funnels/_components/FunnelForm";
import { useParams } from "@tanstack/react-router";
import { Plus } from "lucide-react";

const Funnels = () => {
  const { id } = useParams({ strict: false });
  const { data: funnels, refetch } = useGetFunnels(id);
  console.log("funnels", id);
  if (!funnels) return null;

  return (
    <>
      <FunnelsDataTable
        actionButtonText={
          <>
            <Plus size={15} />
            Create Funnel
          </>
        }
        modalChildren={
          <FunnelForm subAccountId={id} refetch={refetch}></FunnelForm>
        }
        subAccountId={id}
        filterValue="name"
        columns={columns}
        data={funnels}
        refetch={refetch}
      />
    </>
  );
};

export default Funnels;
