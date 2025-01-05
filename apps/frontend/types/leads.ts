import { z } from "zod";
import {
  ReastaurantLeadListSchema,
  RestaurantStaffsSchema,
} from "contract/lead/type";

export type LeadListType = z.infer<typeof ReastaurantLeadListSchema>;

export type LeadStaffType = z.infer<typeof RestaurantStaffsSchema>;
