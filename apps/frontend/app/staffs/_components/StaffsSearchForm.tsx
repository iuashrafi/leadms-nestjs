"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search } from "lucide-react";

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

type Checked = DropdownMenuCheckboxItemProps["checked"];
type StaffsSearchFormType = {
  searchText: string;
};

const StaffsSearchForm = ({
  searchForm,
  onStaffsSearch,
}: {
  searchForm: UseFormReturn<StaffsSearchFormType>;
  onStaffsSearch: SubmitHandler<StaffsSearchFormType>;
}) => {
  const { handleSubmit } = searchForm;

  const [showStatusBar, setShowStatusBar] = useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = useState<Checked>(false);
  const [showPanel, setShowPanel] = useState<Checked>(false);

  return (
    <div>
      <Form {...searchForm}>
        <form onSubmit={handleSubmit(onStaffsSearch)}>
          <FormField
            control={searchForm.control}
            name="searchText"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Search for Staff Name, Restaurant"
                    className="rounded-full h-[43px] max-w-md px-4 bg-white"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="rounded-full text-md"
            size="lg"
            onClick={handleSubmit(onStaffsSearch)}
          >
            Search <Search />
          </Button>
        </form>
      </Form>

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
    </div>
  );
};

export default StaffsSearchForm;
