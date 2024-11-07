import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { createColumnHelper } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";

const columnsHelper = createColumnHelper();

export const columns = [
  columnsHelper.accessor("name", {
    header: "Name",
    cell: ({ row }) => {
      const rowData = row.original;
      const subAccountId = rowData.subAccountId;
      const funnelId = rowData.id;

      return (
        <Link
          to={`/subaccount/${subAccountId}/funnel/${funnelId}`}
          className="flex flex-row items-center gap-2"
        >
          {row.getValue("name")}
          <ExternalLink size={15} />
        </Link>
      );
    },
  }),
  columnsHelper.accessor("updatedAt", {
    header: "Last Updated",
    cell: ({ row }) => {
      const rowData = row.original;
      const date = rowData?.updatedAt ? new Date(rowData.updatedAt) : null;
      return (
        <span className="text-muted-foreground">
          {date ? `${date.toDateString()} ${date.toLocaleTimeString()}` : "N/A"}
        </span>
      );
    },
  }),
  columnsHelper.accessor("published", {
    header: "Status",
    cell: ({ row }) => {
      const rowData = row.original;
      const published = rowData.published;
      return published ? (
        <Badge variant="default">Live - {rowData.subDomainName}</Badge>
      ) : (
        <Badge variant="secondary">Draft</Badge>
      );
    },
  }),
];
