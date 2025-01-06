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
import { RestaurantLeadStatus } from "contract/enum";
import { useApi } from "@/hooks/useApi";
import { contract } from "contract";
import { getQueryClient } from "@/lib/api";
import { intialLeadValues } from "@/utils/dashboard";
import { CreateLeadSchema, CreateLeadSchemaDto } from "@/types/dashboard";

const CreateLeadForm = ({ closeModal }: { closeModal: () => void }) => {
  const { makeApiCall } = useApi();

  const leadForm = useForm<CreateLeadSchemaDto>({
    resolver: zodResolver(CreateLeadSchema),
    defaultValues: intialLeadValues,
  });

  const { reset, control, handleSubmit } = leadForm;

  const invalidationQueryClient = useQueryClient();

  const onCreateLead: SubmitHandler<CreateLeadSchemaDto> = (values) => {
    const body = {
      restaurantName: values.restaurantName,
      address: values.restaurantAddress,
      contactNumber: values.contactNumber,
      currentStatus: values.restaurantLeadStatus,
      assignedKAM: values.assignedKAM,
    };
    makeApiCall({
      fetcherFn: async () => {
        return await getQueryClient().lead.createLead.mutation({
          body,
        });
      },
      successMsgProps: {
        title: `Lead added successfully!`,
        duration: 2000,
      },
      onSuccessFn: () => {
        invalidationQueryClient.refetchQueries({
          queryKey: [contract.lead.getAllLeads.path],
        });
        closeModal();
        reset(intialLeadValues);
      },
    });
  };

  return (
    <div>
      <Form {...leadForm}>
        <form onSubmit={handleSubmit(onCreateLead)} className="space-y-4">
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
          <Button type="submit" className="w-full">
            Add Lead
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateLeadForm;
