import { RestaurantStaffRole } from "contract/enum";
import { z } from "zod";

export const CreateStaffFormSchema = z.object({
  name: z.string().min(2).max(50),
  role: z.nativeEnum(RestaurantStaffRole),
  contactNumber: z.string().min(10).max(10),
  email: z.string().email(),
});

export type CreateStaffFormSchemaDto = z.infer<typeof CreateStaffFormSchema>;
