"use client";

import { getQueryClient } from "@/lib/api";
import React, { useState } from "react";
import { contract } from "../../../contract";
import { Badge } from "@/components/ui/badge";
import { StaffTable } from "./_components/StaffTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search } from "lucide-react";

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const page = () => {
  const [showStatusBar, setShowStatusBar] = useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = useState<Checked>(false);
  const [showPanel, setShowPanel] = useState<Checked>(false);

  const { data, isError, isLoading } =
    getQueryClient().lead.getAllStaffs.useQuery(
      [contract.lead.getAllStaffs.path],
      {}
    );

  if (isLoading) {
    return <>Loading...</>;
  } else if (isError) {
    return <>En Error occurred!</>;
  }

  if (data?.status !== 200) return <>Error : Leads fetching error</>;

  const staffs = data.body;
  return (
    <div>
      <div className="py-4">
        <h1 className="text-3xl font-bold text-indigo-950 text-center">
          Restaurants Staffs
        </h1>
        <div className="mt-4 mb-8 flex justify-center space-x-3">
          <Input
            placeholder="Search for Staff Name, Restaurant"
            className="rounded-full h-[43px] max-w-md px-4 bg-white"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size={"lg"} className="rounded-full">
                Roles <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
              >
                Chef
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showActivityBar}
                onCheckedChange={setShowActivityBar}
              >
                Owner
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showPanel}
                onCheckedChange={setShowPanel}
              >
                Others
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="rounded-full text-md" size="lg">
            Search <Search />
          </Button>
        </div>
      </div>
      <StaffTable data={staffs} />
    </div>
  );
};

export default page;
