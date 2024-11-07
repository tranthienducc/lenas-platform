import { Badge } from "@/components/ui/badge";
import CellActions from "@/pages/dashboard/team/_components/CellActions";
import { createColumnHelper } from "@tanstack/react-table";
import clsx from "clsx";

const columnsHelper = createColumnHelper();

export const columns = [
  columnsHelper.accessor("#", {
    header: "#",
    cell: ({ row }) => {
      const rowData = row.original.length;

      return <span className="text-muted-foreground">{rowData}</span>;
    },
  }),
  columnsHelper.accessor("username", {
    header: "User name",
    cell: ({ row }) => {
      const rowData = row.original;
      const username = rowData.username;
      return <span>{username}</span>;
    },
  }),
  columnsHelper.accessor("profileImage", {
    header: "Avatar",
    cell: ({ row }) => {
      const rowData = row.original;
      const avatarUrl = rowData.profileImage;
      return (
        <div className="relative flex-none size-11">
          <img
            src={avatarUrl}
            alt="avatar-user"
            className="object-cover w-full h-full rounded-full"
          />
        </div>
      );
    },
  }),
  columnsHelper.accessor("email", {
    header: "Email",
    cell: ({ row }) => {
      const rowData = row.original;
      const email = rowData?.email;

      return <span className="font-medium text-muted-foreground">{email}</span>;
    },
  }),
  columnsHelper.accessor("SubAccount", {
    header: "Owner Accounts",
    cell: ({ row }) => {
      const role = row.getValue("role");
      const rowData = row?.original;
      const permissions = rowData?.Permissions;
      const agency = rowData?.agency || [];
      const subAccounts = agency?.SubAccount || [];

      const accessibleSubAccountIds = permissions
        ?.filter((per) => per.access)
        .map((data) => data.subAccountId);

      const accessibleSubAccounts = subAccounts.filter((subAccount) =>
        accessibleSubAccountIds.includes(subAccount?.id)
      );

      return (
        <div className="flex flex-col items-start">
          <div className="flex flex-col gap-2">
            {role === "AGENCY_OWNER" && (
              <Badge className="bg-white whitespace-nowrap w-fit">
                Agency - {agency.name}
              </Badge>
            )}

            {accessibleSubAccounts.length > 0 ? (
              accessibleSubAccounts.map((account) => (
                <Badge
                  key={account?.id}
                  className="bg-white w-fit whitespace-nowrap"
                >
                  Sub Account - {account.name}
                </Badge>
              ))
            ) : (
              <div className="text-muted-foreground">No Access Yet</div>
            )}
          </div>
        </div>
      );
    },
  }),
  columnsHelper.accessor("role", {
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role");
      return (
        <Badge
          className={clsx({
            "bg-[#d5f980]": role === "AGENCY_OWNER",
            "bg-[#a2bbe7]": role === "AGENCY_ADMIN",
            "bg-[#f2bae2]": role === "SUBACCOUNT_USER",
            "bg-[#66e9fa]": role === "SUBACCOUNT_GUEST",
          })}
        >
          {role}
        </Badge>
      );
    },
  }),
  columnsHelper.accessor("actions", {
    header: "Actions",
    cell: ({ row }) => {
      const rowData = row.original;
      return <CellActions rowData={rowData} />;
    },
  }),
];
