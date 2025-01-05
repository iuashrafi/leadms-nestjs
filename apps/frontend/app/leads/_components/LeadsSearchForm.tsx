import { Fragment } from "react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Search } from "lucide-react";
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
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { getLeadOptions } from "@/utils/leads";

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
      <form
        onSubmit={handleSubmit(onSearchLeads)}
        className="flex flex-col md:flex-row flex-wrap lg:flex-nowrap gap-2 h-full"
      >
        <FormField
          control={searchForm.control}
          name="searchText"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Search for Staff Name, Restaurant"
                  className="rounded-lg min-h-11 max-w-md px-4 bg-white min-w-[300px]"
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
              <SelectTrigger className="w-full md:w-[140px]">
                <SelectValue placeholder={"Select status"} />
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
          className="rounded-lg text-md min-h-11"
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
