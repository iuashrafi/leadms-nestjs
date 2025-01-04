import { CreateLeadSchemaDto } from "@/types/dashboard";
import { RestaurantLeadStatus } from "contract/enum";

export const intialLeadValues: CreateLeadSchemaDto = {
  restaurantName: "",
  restaurantAddress: "",
  contactNumber: "",
  restaurantLeadStatus: RestaurantLeadStatus.New,
  assignedKAM: "",
};
