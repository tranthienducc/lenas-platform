import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomModal from "@/pages/subaccount/pipelines/_components/CustomModal";
import { useModal } from "@/providers/modal-provider";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Search } from "lucide-react";
import PropTypes from "prop-types";

const FunnelsDataTable = ({
  data,
  subAccountId,
  filterValue,
  columns,
  modalChildren,
  actionButtonText,
}) => {
  const table = useReactTable({
    data,
    columns,
    filterValue,
    subAccountId,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const { setOpen } = useModal();

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 py-4">
          <Search />
          <Input
            placeholder="Search funnels name"
            value={table.getColumn(filterValue)?.getFilterValue() ?? ""}
            onChange={(event) =>
              table.getColumn(filterValue)?.setFilterValue(event.target.value)
            }
            className="h-7"
          />
        </div>
        <Button
          className="gap-2 flex-"
          onClick={() => {
            if (modalChildren)
              setOpen(
                <CustomModal
                  title="Create A Funnel"
                  subheading="Funnels are a like websites, but better! Try creating one!"
                >
                  {modalChildren}
                </CustomModal>
              );
          }}
        >
          {actionButtonText}
        </Button>
      </div>
      <div className="border bg-background rounded-xl">
        <Table className="rounded-2xl">
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
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
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

export default FunnelsDataTable;

FunnelsDataTable.propTypes = {
  data: PropTypes.array,
  subAccountId: PropTypes.string,
  columns: PropTypes.array,
  filterValue: PropTypes.string,
  refetch: PropTypes.any,
  modalChildren: PropTypes.any,
  actionButtonText: PropTypes.node,
};
