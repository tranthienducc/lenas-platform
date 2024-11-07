import IconsLoading from "@/components/icons/IconsLoading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { searchContacts } from "@/lib/actions/contacts/search-contact";
import { saveActivityLogsNotification } from "@/lib/actions/notifications/saveActivityLogsNotification";
import { getSubaccountTeamMembers } from "@/lib/actions/subaccount/get-subaccount-team-members";
import { upsertTicket } from "@/lib/actions/ticket/upsert-ticket";
import { cn } from "@/lib/utils";
import TagCreator from "@/pages/subaccount/pipelines/_components/TagCreator";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, ChevronsUpDownIcon, User2, Users2 } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const currencyNumberRegex = /^\d+(\.\d{1,2})?$/;

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  value: z.string().refine((value) => currencyNumberRegex.test(value), {
    message: "Value must be a valid price.",
  }),
});
const CreateTicketForm = ({
  getNewTicket,
  laneId,
  subAccountId,
  prevData,
  refetchLanes,
  setClose,
}) => {
  const [tags, setTags] = useState(prevData?.Ticket?.Tag || []);
  const [contact, setContact] = useState("");
  const [search, setSearch] = useState("");
  const [contactList, setContactList] = useState([]);
  const saveTimeRef = useRef();
  const [allTeamMembers, setAllTeamMembers] = useState([]);
  const [assignedTo, setAssignedTo] = useState(
    prevData?.Ticket?.Assigned?.id || ""
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      name: prevData?.Ticket?.name || "",
      description: prevData?.Ticket?.description || "",
      value: String(prevData?.Ticket?.value || 0),
    },
  });

  const isLoading = form.formState.isLoading;

  const handleTagUpdate = (selectedTags) => {
    setTags(selectedTags);
  };

  useEffect(() => {
    if (subAccountId) {
      const fetchData = async () => {
        const response = await getSubaccountTeamMembers(subAccountId);
        if (response) setAllTeamMembers(response);
      };
      fetchData();
    }
  }, [subAccountId]);

  console.log("member", allTeamMembers);

  useEffect(() => {
    if (prevData?.Ticket) {
      form.reset({
        name: prevData?.Ticket?.name || "",
        description: prevData?.Ticket?.description || "",
        value: String(prevData?.Ticket?.value || 0),
      });

      if (prevData?.Ticket?.Customer?.name)
        setContact(prevData?.Ticket?.customerId);

      const fetchData = async () => {
        const response = await searchContacts(prevData?.Ticket?.Customer?.name);

        setContactList(response);
      };
      fetchData();
    }
  }, [form, prevData]);

  const onSubmit = async (values) => {
    if (!laneId) return;
    try {
      const ticketData = {
        ...values,
        value: parseFloat(values.value) || 0,
        laneId,
        id: prevData?.Ticket?.id || uuidv4(),
        assignedUserId: assignedTo || null,
        ...(contact ? { customerId: contact } : {}),
      };

      const response = await upsertTicket(ticketData, tags);
      await saveActivityLogsNotification({
        agencyId: undefined,
        description: `Updated a ticket | ${response?.name}`,
        subAccountId,
      });

      toast.success("Save ticket successfully");
      if (response) getNewTicket(response);

      refetchLanes();
      form.reset();
      setClose();
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Failed to save ticket!");
    }
  };

  console.log("tags-FORM", tags);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          disabled={isLoading}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ticket name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ticket name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ticket value</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Value" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <h2>Generate Tag</h2>
        <TagCreator
          subAccountId={subAccountId}
          getSelectedTags={handleTagUpdate}
          defaultTags={prevData?.[0]?.Ticket?.[0]?.Tags || []}
        />
        <FormLabel>Assigned To Team Member</FormLabel>
        <Select onValueChange={setAssignedTo} defaultValue={assignedTo}>
          <SelectTrigger>
            <SelectValue
              placeholder={
                <div className="flex items-center gap-2">
                  <Avatar className="size-8">
                    <AvatarImage alt="contact" />
                    <AvatarFallback className="text-sm text-white bg-primary">
                      <Users2 size={14} />
                    </AvatarFallback>
                  </Avatar>

                  <span className="text-sm text-muted-foreground">
                    Not Assigned
                  </span>
                </div>
              }
            />
          </SelectTrigger>
          <SelectContent>
            {allTeamMembers?.map((member) => (
              <SelectItem key={member?.id} value={member?.id}>
                <div className="flex items-center gap-2">
                  <Avatar className="size-8">
                    <AvatarImage alt="contact" src={member?.avatarUrl} />
                    <AvatarFallback className="text-sm text-white bg-primary">
                      <User2 size={14} />
                    </AvatarFallback>
                  </Avatar>

                  <span className="text-sm text-muted-foreground">
                    {member?.name}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormLabel>Customer</FormLabel>
        <Popover>
          <PopoverTrigger asChild className="w-full">
            <Button type="button" role="combobox" className="justify-between">
              {contact
                ? contactList?.find((c) => c?.id === contact)?.name
                : "Select customer..."}
              <ChevronsUpDownIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0">
            <Command>
              <CommandInput
                placeholder="Search"
                className="h-9"
                value={search}
                onChangeCapture={async (value) => {
                  setSearch(value.target.value);
                  if (saveTimeRef.current) clearTimeout(saveTimeRef?.current);
                  saveTimeRef.current = setTimeout(async () => {
                    const response = await searchContacts(value?.target.value);
                    setContactList(response);
                    setSearch("");
                  }, 1000);
                }}
              />
              <CommandEmpty>No Customer found.</CommandEmpty>
              <CommandGroup>
                {contactList?.map((c) => (
                  <CommandItem
                    key={c?.id}
                    value={c?.id}
                    onSelect={(currentValue) => {
                      setContact(currentValue === contact ? "" : currentValue);
                    }}
                  >
                    {c?.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto size-4",
                        contact === c?.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        <Button className="w-20 mt-4" type="submit" disabled={isLoading}>
          {form.formState.isSubmitting ? <IconsLoading /> : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateTicketForm;

CreateTicketForm.propTypes = {
  getNewTicket: PropTypes.any,
  laneId: PropTypes.string,
  subAccountId: PropTypes.string,
  prevData: PropTypes.any,
  refetchLanes: PropTypes.func,
  setClose: PropTypes.func,
};
