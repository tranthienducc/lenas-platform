import DialogCreateTeamMember from "@/components/common/DialogCreateTeamMember";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Search } from "lucide-react";
import PropTypes from "prop-types";

const DataTable = ({ data, filterValue, columns, agencyId }) => {
  const safeColumn = Array.isArray(columns) ? columns : [];
  const table = useReactTable({
    data: data || [],
    columns: safeColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  console.log(
    "table",
    table.getRowModel().rows.map((item) => item)
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 py-4">
          <Search />
          <Input
            placeholder="Seach username..."
            value={table.getColumn(filterValue).getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn(filterValue).setFilterValue(event.target.value)
            }
            className="h-9"
          />
        </div>
        <DialogCreateTeamMember agencyId={agencyId} />
      </div>
      <div className="border bg-background rounded-xl">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cells) => (
                    <TableCell key={cells.id}>
                      {flexRender(
                        cells.column.columnDef.cell,
                        cells.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="h-24 text-center"
                >
                  No Results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default DataTable;

DataTable.propTypes = {
  data: PropTypes.array,
  filterValue: PropTypes.string,
  columns: PropTypes.array,
  agencyId: PropTypes.string,
};
