import { RestaurantLeadStatus } from "contract/enum";
import {
  DashboardCardSchema,
  RecentInterationsSchema,
  RecentRestaurantsSchema,
  TodaysPendingCallsSchema,
} from "contract/lead/type";

import { z } from "zod";

export type DashboardCardType = z.infer<typeof DashboardCardSchema>;

export type RecentRestaurantsType = z.infer<typeof RecentRestaurantsSchema>;

export type RecentInterationsType = z.infer<typeof RecentInterationsSchema>;

export type TodaysPendingCallsType = z.infer<typeof TodaysPendingCallsSchema>;

export const CreateLeadSchema = z.object({
  restaurantName: z.string().min(2).max(50),
  restaurantAddress: z.string().min(2).max(50),
  contactNumber: z.string().min(10).max(10),
  assignedKAM: z.string().min(2).max(50),
  restaurantLeadStatus: z.nativeEnum(RestaurantLeadStatus),
});

export type CreateLeadSchemaDto = z.infer<typeof CreateLeadSchema>;
