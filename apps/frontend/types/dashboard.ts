import {
  DashboardCardSchema,
  RecentInterationsSchema,
  RecentRestaurantsSchema,
} from "contract/lead/type";

import { z } from "zod";

export type DashboardCardType = z.infer<typeof DashboardCardSchema>;

export type RecentRestaurantsType = z.infer<typeof RecentRestaurantsSchema>;

export type RecentInterationsType = z.infer<typeof RecentInterationsSchema>;
