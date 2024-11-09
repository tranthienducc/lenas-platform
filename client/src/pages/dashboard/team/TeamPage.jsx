import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetAgencyBySub,
  useGetTeamMembersByAgency,
} from "@/lib/tanstack-query/queries";
import { columns } from "@/pages/dashboard/team/_components/Columns";
import DataTable from "@/pages/dashboard/team/_components/DataTable";
import { useParams } from "@tanstack/react-router";

import { Suspense } from "react";

const TeamPage = () => {
  const { id } = useParams({ strict: false });
  const { data: agencyDetails } = useGetAgencyBySub(id);
  const { data: teamMembers } = useGetTeamMembersByAgency(id);

  console.log("team-page", teamMembers);

  return (
    <Suspense fallback={<Skeleton className="w-full h-10" />}>
      <DataTable
        filterValue="username"
        columns={columns}
        data={teamMembers}
        agencyId={agencyDetails?.id}
      ></DataTable>
    </Suspense>
  );
};

export default TeamPage;
