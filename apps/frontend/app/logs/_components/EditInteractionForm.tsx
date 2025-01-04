import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useApi } from "@/hooks/useApi";
import {
  CreateInteractionSchema,
  CreateInteractionSchemaDto,
} from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RestaurantInteractionType } from "contract/enum";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calender";
import { getQueryClient } from "@/lib/api";

const initialValues: CreateInteractionSchemaDto = {
  interactionType: RestaurantInteractionType.Call,
  notes: "",
  followUp: "No",
  interactionDate: new Date(),
};

export function EditInteractionForm({
  interactionId,
}: {
  interactionId: number;
  onClose?: () => void;
}) {
  const { makeApiCall } = useApi();

  const form = useForm<CreateInteractionSchemaDto>({
    resolver: zodResolver(CreateInteractionSchema),
    defaultValues: initialValues,
  });

  function onSubmit(values: CreateInteractionSchemaDto) {
    console.log("form values=", values);

    const body = {
      interactionId,
      interactionDate: values.interactionDate.toISOString(),
      type: values.interactionType,
      notes:
        values.notes && values.notes.trim().length > 0
          ? values.notes.trim()
          : null,
      followUp: values.followUp === "Yes" ? true : false,
    };

    // makeApiCall({
    //   fetcherFn: async () => {
    //     return await getQueryClient().lead.createInteraction.mutation({
    //       body,
    //     });
    //   },
    //   successMsgProps: {
    //     title: `Interaction Added successfully`,
    //     duration: 2000,
    //   },
    //   onSuccessFn: () => {
    //     form.reset(initialValues);
    //   },
    // });
  }

  return (
    <div>
      <h2>Interaction id = {interactionId}</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="interactionType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interaction Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={RestaurantInteractionType.Call}>
                      Call
                    </SelectItem>
                    <SelectItem value={RestaurantInteractionType.Order}>
                      Order
                    </SelectItem>
                    <SelectItem value={RestaurantInteractionType.Visit}>
                      Visit
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Take Notes"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="followUp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Follow Up</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Follow Up" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"Yes"}>Yes</SelectItem>
                    <SelectItem value={"No"}>No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interactionDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex">
            <Button type="submit" className="">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
