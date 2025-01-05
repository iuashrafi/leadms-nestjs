import { z } from "zod";
import { RestaurantInteractionType } from "contract/enum";

export const CreateInteractionSchema = z.object({
  interactionType: z.nativeEnum(RestaurantInteractionType),
  notes: z.string(),
  followUp: z.string(),
  interactionDate: z.date(),
});

export type CreateInteractionSchemaDto = z.infer<
  typeof CreateInteractionSchema
>;

export type InteractionsSearchFormType = {
  searchText: string;
  role: string;
};
