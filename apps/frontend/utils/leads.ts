import { RestaurantLeadStatus, RestaurantStaffRole } from "contract/enum";

export function getLeadOptions(): { value: string; label: string }[] {
  return Object.values(RestaurantLeadStatus).map((role) => ({
    value: role,
    label: role,
  }));
}

export const intialLeadsValue = {
  name: "",
  role: RestaurantStaffRole.Owner,
  contactNumber: "",
  email: "",
};

export const initialStaffValue = {
  name: "",
  role: RestaurantStaffRole.Owner,
  contactNumber: "",
  email: "",
};

export const getRestaurantBadgeVariant = (
  status: string
): "new" | "active" | "inActive" => {
  switch (status) {
    case "New":
      return "new";
    case "Active":
      return "active";
    default:
      return "inActive";
  }
};
