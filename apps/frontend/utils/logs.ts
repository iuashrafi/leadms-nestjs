import { RestaurantInteractionType } from "contract/enum";
import { CreateInteractionSchemaDto } from "@/types/logs";

export const intialInteracationValues: CreateInteractionSchemaDto = {
  interactionType: RestaurantInteractionType.Call,
  notes: "",
  followUp: "No",
  interactionDate: new Date(),
};
