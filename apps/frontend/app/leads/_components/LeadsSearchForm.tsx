import { Input } from "@/components/ui/input";
import { SearchFormType } from "@/types/common";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { getLeadOptions } from "@/utils/leads";
import { Fragment } from "react";

const LeadsSearchForm = ({
  searchForm,
  onSearchLeads,
}: {
  searchForm: UseFormReturn<SearchFormType>;
  onSearchLeads: SubmitHandler<SearchFormType>;
}) => {
  const { handleSubmit, control } = searchForm;
  const leadsOptions = getLeadOptions();

  return (
    <Form {...searchForm}>
      <form onSubmit={handleSubmit(onSearchLeads)} className="flex gap-2">
        <FormField
          control={searchForm.control}
          name="searchText"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Search for Staff Name, Restaurant"
                  className="rounded-lg h-[43px] max-w-md px-4 bg-white min-w-[300px]"
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
                  {leadsOptions.map((item, index) => (
                    <Fragment key={"leadOption" + index}>
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
          onClick={handleSubmit(onSearchLeads)}
        >
          Search <Search />
        </Button>
      </form>
    </Form>
  );
};

export default LeadsSearchForm;
