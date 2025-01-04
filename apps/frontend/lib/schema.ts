import { ReactNode } from "react";
import {
  RestaurantInteractionType,
  RestaurantLeadStatus,
  RestaurantStaffRole,
} from "./../../contract/enum";
import { z } from "zod";

export const CreateLeadSchema = z.object({
  restaurantName: z.string().min(2).max(50),
  restaurantAddress: z.string().min(2).max(50),
  contactNumber: z.string().min(10).max(10),
  assignedKAM: z.string().min(2).max(50),
  restaurantLeadStatus: z.nativeEnum(RestaurantLeadStatus),
});

export type CreateLeadSchemaDto = z.infer<typeof CreateLeadSchema>;

export const CreateStaffFormSchema = z.object({
  name: z.string().min(2).max(50),
  role: z.nativeEnum(RestaurantStaffRole),
  contactNumber: z.string().min(10).max(10),
  email: z.string().email(),
});

export type CreateStaffFormSchemaDto = z.infer<typeof CreateStaffFormSchema>;

export const CreateInteractionSchema = z.object({
  interactionType: z.nativeEnum(RestaurantInteractionType),
  notes: z.string(),
  followUp: z.string(),
  interactionDate: z.date(),
});

export type CreateInteractionSchemaDto = z.infer<
  typeof CreateInteractionSchema
>;

export type StaffsSearchFormType = {
  searchText: string;
};

export type LeadsSearchFormType = {
  searchText: string;
};

export interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}
