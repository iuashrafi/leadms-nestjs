import { RestaurantLeadStatus } from "contract/enum";

export function getLeadOptions(): { value: string; label: string }[] {
  return Object.values(RestaurantLeadStatus).map((role) => ({
    value: role,
    label: role,
  }));
}
