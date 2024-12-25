import { RestaurantLeadStatus } from "./../../contract/enum";
import { z } from "zod";

export const CreateLeadSchema = z.object({
  restaurantName: z.string().min(2).max(50),
  restaurantAddress: z.string().min(2).max(50),
  contactNumber: z.string().min(10).max(10),
  assignedKAM: z.string().min(2).max(50),
  restaurantLeadStatus: z.nativeEnum(RestaurantLeadStatus),
});

export type CreateLeadSchemaDto = z.infer<typeof CreateLeadSchema>;
