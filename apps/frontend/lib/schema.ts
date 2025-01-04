import { ReactNode } from "react";
import { RestaurantInteractionType } from "contract/enum";
import { z } from "zod";

export const CreateInteractionSchema = z.object({
  interactionType: z.nativeEnum(RestaurantInteractionType),
  notes: z.string(),
  followUp: z.string(),
  interactionDate: z.date(),
});

export type CreateInteractionSchemaDto = z.infer<
  typeof CreateInteractionSchema
>;

export interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}
