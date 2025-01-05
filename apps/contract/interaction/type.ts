import { RestaurantInteractionType } from "contract/enum";
import { z } from "zod";

export const CreateInteractionSchema = z.object({
  staffId: z.number(),
  interactionDate: z.string().transform((val) => new Date(val)),
  type: z.nativeEnum(RestaurantInteractionType),
  notes: z.string().nullable(),
  followUp: z.boolean(),
});

export const UpdateInteractionSchema = z.object({
  interactionId: z.number(),
  interactionDate: z.string().transform((val) => new Date(val)),
  interactionType: z.nativeEnum(RestaurantInteractionType),
  notes: z.string().nullable(),
  followUp: z.boolean(),
});

export const InteractionSchema = z.object({
  id: z.number(),
  staffName: z.string(),
  leadId: z.number(),
  leadName: z.string(),
  staffId: z.number(),
  interactionType: z.nativeEnum(RestaurantInteractionType),
  notes: z.string(),
  interactionDate: z.date(),
  followUp: z.boolean(),
});
