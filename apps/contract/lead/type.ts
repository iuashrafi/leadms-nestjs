import { RestaurantLeadStatus } from "contract/enum";
import { z } from "zod";

export const CreateLeadSchema = z.object({
  restaurantName: z.string(),
  address: z.string(),
  contactNumber: z.string(),
  currentStatus: z.nativeEnum(RestaurantLeadStatus),
  assignedKAM: z.string(),
});

export const RestaurantLeadSchema = CreateLeadSchema.extend({ id: z.number() });
