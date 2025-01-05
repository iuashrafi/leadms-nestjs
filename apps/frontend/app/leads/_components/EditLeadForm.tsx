"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
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
import { Input } from "@/components/ui/input";
import { useApi } from "@/hooks/useApi";
import { contract } from "contract";
import { RestaurantLeadStatus } from "contract/enum";
import { CreateLeadSchema } from "contract/lead/type";
import { getQueryClient } from "@/lib/api";
import { CreateLeadSchemaDto } from "@/types/dashboard";

const EditLeadForm = ({ data }: any) => {
  const { makeApiCall } = useApi();
  const invalidationQueryClient = useQueryClient();

  const leadForm = useForm<CreateLeadSchemaDto>({
    resolver: zodResolver(CreateLeadSchema),
    defaultValues: {
      restaurantName: data.restaurantName,
      restaurantAddress: data.address,
      contactNumber: data.contactNumber,
      restaurantLeadStatus: data.currentStatus,
      assignedKAM: data.assignedKAM,
    },
  });

  const { handleSubmit, control } = leadForm;

  const onUpdateLead: SubmitHandler<CreateLeadSchemaDto> = (values) => {
    const body = {
      id: Number(data.id),
      restaurantName: values.restaurantName,
      address: values.restaurantAddress,
      contactNumber: values.contactNumber,
      currentStatus: values.restaurantLeadStatus,
      assignedKAM: values.assignedKAM,
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
      },
    });
  };

  return (
    <div>
      <Form {...leadForm}>
        <form onSubmit={handleSubmit(onUpdateLead)} className="space-y-4">
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
            name="restaurantLeadStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Restaurant Lead Status</FormLabel>
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
                    <SelectItem value={RestaurantLeadStatus.New}>
                      New
                    </SelectItem>
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
          <Button type="submit">Update Lead</Button>
        </form>
      </Form>
    </div>
  );
};

export default EditLeadForm;
