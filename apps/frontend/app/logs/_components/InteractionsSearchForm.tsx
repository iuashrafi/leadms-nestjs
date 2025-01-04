import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InteractionsSearchFormType } from "@/lib/schema";
import { Search } from "lucide-react";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { SubmitHandler, UseFormReturn } from "react-hook-form";

const InteractionsSearchForm = ({
  searchForm,
  onInteractionsSearch,
}: {
  searchForm: UseFormReturn<InteractionsSearchFormType>;
  onInteractionsSearch: SubmitHandler<InteractionsSearchFormType>;
}) => {
  const { handleSubmit } = searchForm;

  return (
    <Form {...searchForm}>
      <form
        onSubmit={handleSubmit(onInteractionsSearch)}
        className="flex gap-3"
      >
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
