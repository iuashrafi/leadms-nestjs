import { RestaurantLeadStatus, RestaurantStaffRole } from "../enum";
import { z } from "zod";

export const DashboardResponseSchema = z
  .object({
    title: z.string(),
    link: z.string(),
    itemsCount: z.number(),
  })
  .array();

export const CreateLeadSchema = z.object({
  restaurantName: z.string(),
  address: z.string(),
  contactNumber: z.string(),
  currentStatus: z.nativeEnum(RestaurantLeadStatus),
  assignedKAM: z.string(),
});

export const RestaurantLeadSchema = CreateLeadSchema.extend({ id: z.number() });

export const RestaurantStaffSchema = z.object({
  id: z.number(),
  name: z.string(),
  role: z.nativeEnum(RestaurantStaffRole),
  contactNumber: z.string(),
  email: z.string(),
});
