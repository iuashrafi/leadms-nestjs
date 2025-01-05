import {
  RestaurantInteractionType,
  RestaurantLeadStatus,
  RestaurantStaffRole,
} from "../enum";
import { z } from "zod";

export const DashboardCardSchema = z.object({
  title: z.string(),
  subTitle: z.string(),
  link: z.string(),
  itemsCount: z.number(),
});

export const RecentRestaurantsSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    restaurantLeadStatus: z.string(),
    contactNumber: z.string(),
    address: z.string(),
  })
);

export const RecentInterationsSchema = z.array(
  z.object({
    id: z.number(),
    staffName: z.string(),
    staffEmail: z.string(),
    interactionType: z.nativeEnum(RestaurantInteractionType),
    interactionDate: z.date(),
    notes: z.string(),
  })
);

export const TodaysPendingCallsSchema = z.array(
  z.object({
    id: z.number(),
    staffName: z.string(),
    staffEmail: z.string(),
    staffContact: z.string(),
    interactionDate: z.date(),
  })
);

export const DashboardResponseSchema = z.object({
  dashboardCards: DashboardCardSchema.array(),
  recentRestaurants: RecentRestaurantsSchema,
  recentInteractions: RecentInterationsSchema,
  todaysPendingCalls: TodaysPendingCallsSchema,
});

export const CreateLeadSchema = z.object({
  restaurantName: z.string(),
  address: z.string(),
  contactNumber: z.string(),
  currentStatus: z.nativeEnum(RestaurantLeadStatus),
  assignedKAM: z.string(),
});

export const RestaurantLeadSchema = CreateLeadSchema.extend({
  id: z.number(),
  staffsCount: z.number(),
});

export const RestaurantStaffsSchema = z.object({
  staffId: z.number(),
  staffName: z.string(),
  role: z.nativeEnum(RestaurantStaffRole),
  contactNumber: z.string(),
  email: z.string(),
});

export const ReastaurantLeadListSchema = RestaurantLeadSchema.extend({
  staffs: z.array(RestaurantStaffsSchema),
});
export const RestaurantStaffSchema = z.object({
  id: z.number(),
  name: z.string(),
  leadName: z.string(),
  role: z.nativeEnum(RestaurantStaffRole),
  contactNumber: z.string(),
  email: z.string(),
});
