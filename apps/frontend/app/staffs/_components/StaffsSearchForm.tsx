"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { SearchFormType } from "@/types/common";
import { getRoleOptions } from "@/utils/staffs";
import { Fragment } from "react";

const StaffsSearchForm = ({
  searchForm,
  onStaffsSearch,
}: {
  searchForm: UseFormReturn<SearchFormType>;
  onStaffsSearch: SubmitHandler<SearchFormType>;
}) => {
  const { handleSubmit } = searchForm;
  const { control } = searchForm;

  const staffRoles = getRoleOptions();

  return (
    <div>
      <Form {...searchForm}>
        <form
          onSubmit={handleSubmit(onStaffsSearch)}
          className="flex gap-2 w-full"
        >
          <FormField
            control={control}
            name="searchText"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Search for Staff Name, Restaurant"
                    className="rounded-lg h-[43px] px-4 bg-white min-w-[300px]"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={"role"}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={"Roles"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {staffRoles.map((item, index) => (
                      <Fragment key={"roleOption" + index}>
                        <SelectItem value={item.value}>{item.label}</SelectItem>
                      </Fragment>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          <Button
            className="rounded-lg text-md"
            size="lg"
            onClick={handleSubmit(onStaffsSearch)}
          >
            Search <Search />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default StaffsSearchForm;
