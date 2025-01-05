import { RestaurantStaffRole } from "contract/enum";
import { z } from "zod";

export const CreateRestaurantStaffSchema = z.object({
  leadId: z.number(),
  name: z.string(),
  role: z.nativeEnum(RestaurantStaffRole),
  contactNumber: z.string(),
  email: z.string(),
});

export const UpdateRestaurantStaffSchema = z.object({
  staffId: z.number(),
  name: z.string(),
  role: z.nativeEnum(RestaurantStaffRole),
  contactNumber: z.string(),
  email: z.string(),
});
