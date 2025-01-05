import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
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
import { Button } from "@/components/ui/button";
import { useApi } from "@/hooks/useApi";
import { RestaurantStaffRole } from "contract/enum";
import { contract } from "contract";
import { getQueryClient } from "@/lib/api";
import {
  CreateStaffFormSchema,
  CreateStaffFormSchemaDto,
} from "@/types/staffs";
import { initialStaffValue } from "@/utils/leads";

const EditStaffForm = ({
  staff,
  closeModal,
}: {
  staff: any;
  closeModal: () => void;
}) => {
  const { makeApiCall } = useApi();
  const invalidationQueryClient = useQueryClient();

  const staffForm = useForm<CreateStaffFormSchemaDto>({
    resolver: zodResolver(CreateStaffFormSchema),
    defaultValues: staff
      ? {
          name: staff.staffName,
          role: staff.role,
          contactNumber: staff.contactNumber,
          email: staff.email,
        }
      : initialStaffValue,
  });

  const { handleSubmit, control } = staffForm;

  const onSubmit: SubmitHandler<CreateStaffFormSchemaDto> = (values) => {
    const body = {
      staffId: staff.staffId,
      ...values,
    };
    makeApiCall({
      fetcherFn: async () => {
        return await getQueryClient().staff.updateStaff.mutation({
          body,
        });
      },
      successMsgProps: {
        title: `Staff updated successfully!`,
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
  };

  return (
    <Form {...staffForm}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
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
          control={control}
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
          control={control}
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
          control={control}
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
          Edit Staff
        </Button>
      </form>
    </Form>
  );
};

export default EditStaffForm;
