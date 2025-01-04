import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { SearchFormType } from "@/types/common";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Fragment } from "react";
import { getInteractionsOptions } from "@/utils/interactions";

const InteractionsSearchForm = ({
  searchForm,
  onInteractionsSearch,
}: {
  searchForm: UseFormReturn<SearchFormType>;
  onInteractionsSearch: SubmitHandler<SearchFormType>;
}) => {
  const { handleSubmit, control } = searchForm;
  const interactionsOptions = getInteractionsOptions();

  return (
    <Form {...searchForm}>
      <form
        onSubmit={handleSubmit(onInteractionsSearch)}
        className="flex gap-3"
      >
        <FormField
          control={control}
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
                <SelectValue placeholder={"Type"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {interactionsOptions.map((item, index) => (
                    <Fragment key={"interactOption" + index}>
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
          onClick={handleSubmit(onInteractionsSearch)}
        >
          Search <Search />
        </Button>
      </form>
    </Form>
  );
};

export default InteractionsSearchForm;
