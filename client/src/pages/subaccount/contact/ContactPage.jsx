import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetSubaccountWithContact } from "@/lib/tanstack-query/queries";
import DialogCreateContact from "@/pages/subaccount/contact/_components/DialogCreateContact";
import { useParams } from "@tanstack/react-router";
import format from "date-fns/format";

const ContactPage = () => {
  const { id } = useParams({ strict: false });
  const { data: contacts, refetch } = useGetSubaccountWithContact(id);

  const allContacts = contacts?.Contact;

  const formatTotal = (tickets) => {
    if (!tickets || !tickets?.length) return "$0.00";
    const amt = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: "USD",
    });

    const laneAmt = tickets?.reduce(
      (sum, ticket) => sum + Number(ticket?.value),
      0
    );

    return amt.format(laneAmt);
  };

  return (
    <>
      <h1 className="mb-4 text-4xl font-medium">Contacts</h1>
      <DialogCreateContact subAccountId={id} refetch={refetch} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[300px]">Email</TableHead>
            <TableHead className="w-[200px]">Active</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead className="text-right">Total Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="font-medium truncate">
          {allContacts?.length > 0 ? (
            allContacts?.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage alt="@shadcn" />
                    <AvatarFallback className="text-black bg-primary">
                      {contact?.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{contact?.email}</TableCell>
                <TableCell>
                  {formatTotal(contact?.Ticket) === "$0.00" ? (
                    <Badge variant="destructive">Inactive</Badge>
                  ) : (
                    <Badge className="bg-emerald-700">Active</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {format(contact?.createdAt, "MM/dd/yyyy")}
                </TableCell>
                <TableCell className="text-right">
                  {formatTotal(contact?.Ticket)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <p className="mt-4 text-sm font-normal">No data result</p>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default ContactPage;
