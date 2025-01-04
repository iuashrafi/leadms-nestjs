import { Input } from "@/components/ui/input";
import { LeadsSearchFormType } from "@/lib/schema";
import { Search } from "lucide-react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const LeadsSearchForm = ({
  searchForm,
  onLeadsSearch,
}: {
  searchForm: UseFormReturn<LeadsSearchFormType>;
  onLeadsSearch: SubmitHandler<LeadsSearchFormType>;
}) => {
  const { handleSubmit } = searchForm;

  return (
    <Form {...searchForm}>
      <form onSubmit={handleSubmit(onLeadsSearch)} className="flex gap-2">
        <FormField
          control={searchForm.control}
          name="searchText"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Search for Staff Name, Restaurant"
                  className="rounded-lg h-[43px] max-w-md px-4 bg-white"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          className="rounded-lg text-md"
          size="lg"
          onClick={handleSubmit(onLeadsSearch)}
        >
          Search <Search />
        </Button>
      </form>
    </Form>
  );
};

export default LeadsSearchForm;
