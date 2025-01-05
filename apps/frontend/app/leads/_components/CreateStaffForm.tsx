import React from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useApi } from "@/hooks/useApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { RestaurantStaffRole } from "contract/enum";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getQueryClient } from "@/lib/api";
import { contract } from "contract";
import {
  CreateStaffFormSchema,
  CreateStaffFormSchemaDto,
} from "@/types/staffs";
import { initialStaffValue } from "@/utils/leads";

const CreateStaffForm = ({
  leadId,
  closeModal,
}: {
  leadId: number;
  closeModal: () => void;
}) => {
  const { makeApiCall } = useApi();
  const invalidationQueryClient = useQueryClient();

  const form = useForm<CreateStaffFormSchemaDto>({
    resolver: zodResolver(CreateStaffFormSchema),
    defaultValues: initialStaffValue,
  });

  function onSubmit(values: CreateStaffFormSchemaDto) {
    const body = {
      leadId,
      ...values,
    };
    makeApiCall({
      fetcherFn: async () => {
        return await getQueryClient().staff.createRestaurantStaff.mutation({
          body,
        });
      },
      successMsgProps: {
        title: `Staff added successfully!`,
        duration: 2000,
      },
      onSuccessFn: () => {
        invalidationQueryClient.invalidateQueries({
          queryKey: [contract.lead.getLeadById.path],
          refetchType: "active",
        });
        closeModal();
        form.reset(initialStaffValue);
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Staff Name</FormLabel>
              <FormControl>
                <Input placeholder="Staff Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Staff Contact number</FormLabel>
              <FormControl>
                <Input placeholder="Staff Contact number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Staff Email</FormLabel>
              <FormControl>
                <Input placeholder="Staff Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Staff Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={RestaurantStaffRole.Owner}>
                    Owner
                  </SelectItem>
                  <SelectItem value={RestaurantStaffRole.Manager}>
                    Manager
                  </SelectItem>
                  <SelectItem value={RestaurantStaffRole.Chef}>Chef</SelectItem>
                  <SelectItem value={RestaurantStaffRole.Others}>
                    Others
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Create Staff
        </Button>
      </form>
    </Form>
  );
};

export default CreateStaffForm;
