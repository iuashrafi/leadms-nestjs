"use client";
import { CreateLeadSchema } from "@/types/dashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RestaurantLeadStatus } from "contract/enum";
import { useApi } from "@/hooks/useApi";
import { getQueryClient } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { contract } from "contract";

const EditLeadForm = ({
  data,
  closeModal,
}: {
  data: any;
  closeModal: () => void;
}) => {
  const { makeApiCall } = useApi();
  const invalidationQueryClient = useQueryClient();

  const editLeadForm = useForm<z.infer<typeof CreateLeadSchema>>({
    resolver: zodResolver(CreateLeadSchema),
    defaultValues: {
      restaurantName: data.restaurantName,
      restaurantAddress: data.address,
      contactNumber: data.contactNumber,
      assignedKAM: data.assignedKAM,
      restaurantLeadStatus: data.currentStatus,
    },
  });

  const { handleSubmit, control } = editLeadForm;

  function onSubmit(values: z.infer<typeof CreateLeadSchema>) {
    const body = {
      id: Number(data.id),
      restaurantName: values.restaurantName,
      address: values.restaurantAddress,
      contactNumber: values.contactNumber,
      assignedKAM: values.assignedKAM,
      currentStatus: values.restaurantLeadStatus,
    };
    makeApiCall({
      fetcherFn: async () => {
        return await getQueryClient().lead.updateLead.mutation({
          body,
        });
      },
      successMsgProps: {
        title: `Lead updated successfully`,
        duration: 2000,
      },
      onSuccessFn: () => {
        invalidationQueryClient.invalidateQueries({
          queryKey: [contract.lead.getLeadById.path],
          refetchType: "active",
        });
        closeModal();
      },
    });
  }

  return (
    <Form {...editLeadForm}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="restaurantName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Restaurant Name</FormLabel>
              <FormControl>
                <Input placeholder="Restaurant Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="restaurantAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Restaurant Address</FormLabel>
              <FormControl>
                <Input placeholder="Restaurant Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input placeholder="Contact Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="assignedKAM"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assigned KAM</FormLabel>
              <FormControl>
                <Input placeholder="Assigned KAM" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="restaurantLeadStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lead Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={RestaurantLeadStatus.New}>New</SelectItem>
                  <SelectItem value={RestaurantLeadStatus.Active}>
                    Active
                  </SelectItem>
                  <SelectItem value={RestaurantLeadStatus.Inactive}>
                    Inactive
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Update Lead</Button>
      </form>
    </Form>
  );
};

export default EditLeadForm;
