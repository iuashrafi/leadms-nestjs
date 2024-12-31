import {
  RestaurantInteractionType,
  RestaurantLeadStatus,
  RestaurantStaffRole,
} from "../enum";
import { z } from "zod";

export const DashboardResponseSchema = z.object({
  dashboardCards: z
    .object({
      title: z.string(),
      subTitle: z.string(),
      link: z.string(),
      itemsCount: z.number(),
    })
    .array(),

  recentRestaurants: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      restaurantLeadStatus: z.string(),
      contactNumber: z.string(),
      address: z.string(),
    })
  ),

  recentInteractions: z.array(
    z.object({
      id: z.number(),
      staffName: z.string(),
      staffEmail: z.string(),
      interactionType: z.nativeEnum(RestaurantInteractionType),
      interactionDate: z.date(),
      notes: z.string(),
    })
  ),
});

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
