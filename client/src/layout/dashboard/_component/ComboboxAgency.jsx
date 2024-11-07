"use client";

import { ChevronsUpDown, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "@tanstack/react-router";
import DialogCreateSubAccount from "@/components/common/DialogCreateSubAccount";

import {
  useGetAllProfile,
  useGetCurrentUser,
} from "@/lib/tanstack-query/queries";

const ComboboxAgency = ({ details, subaccounts, users }) => {
  const [open, setOpen] = useState(false);
  const { data: user } = useGetCurrentUser();
  const { data: profiles } = useGetAllProfile(user?.id);

  console.log("sub-account", subaccounts);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="px-3">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between h-12"
          >
            <div className="flex items-center gap-2 text-left">
              <Compass size={6} />
              <div className="flex flex-col text-black dark:text-white">
                {details?.name}
                <span className="text-muted-foreground">
                  {details?.address}
                </span>
              </div>
            </div>

            <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="rounded-xl">
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            {(users?.role === "AGENCY_OWNER" ||
              users?.role === "AGENCY_ADMIN") &&
              users?.agency && (
                <CommandGroup heading="Agency">
                  <CommandItem className="!bg-transparent my-2 text-primary broder-[1px] border-border p-2 rounded-md hover:!bg-muted cursor-pointer transition-all">
                    <Link
                      to={`/dashboard/${users?.agency?.id}`}
                      className="flex w-full h-full gap-4"
                    >
                      <div className="relative w-16">
                        <img
                          src={users?.agency?.agencyLogo}
                          alt="agencyLogo"
                          className="object-contain w-full h-full rounded-md"
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <span className="text-muted-foreground">
                          {users?.agency?.name}
                        </span>
                        <span className="text-muted-foreground">
                          {users?.agency?.address}
                        </span>
                      </div>
                    </Link>
                  </CommandItem>
                </CommandGroup>
              )}

            <CommandGroup heading="Sub Accounts">
              {!!subaccounts &&
                subaccounts?.map((subaccount) => (
                  <CommandItem key={subaccount?.id}>
                    <Link
                      to={`/subaccount/${subaccount?.id}`}
                      className="flex w-full h-full gap-4"
                    >
                      <div className="relative w-16">
                        <img
                          src={subaccount.subAccountLogo}
                          alt="subaccount-logo"
                          className="object-contain w-full h-full rounded-md"
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <span className="text-muted-foreground">
                          {" "}
                          {subaccount.name}
                        </span>
                        <span className="text-muted-foreground">
                          {subaccount.address}
                        </span>
                      </div>
                    </Link>
                  </CommandItem>
                ))}
              {subaccounts?.length === 0 ? (
                <span className="pl-2 text-xs font-normal">No accounts</span>
              ) : null}
            </CommandGroup>
          </CommandList>
          {(users?.role === "AGENCY_OWNER" ||
            users?.role === "AGENCY_ADMIN") && (
            <DialogCreateSubAccount
              agencyDetails={users?.agency}
              userId={user?.id}
              userName={profiles?.firstName}
              details={details}
            />
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboboxAgency;

ComboboxAgency.propTypes = {
  users: PropTypes.any,
  details: PropTypes.any,
  subaccounts: PropTypes.array,
};
