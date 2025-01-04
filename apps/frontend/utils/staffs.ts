import { RestaurantLeadStatus, RestaurantStaffRole } from "contract/enum";

export function getRoleOptions(): { value: string; label: string }[] {
  return Object.values(RestaurantStaffRole).map((role) => ({
    value: role,
    label: role,
  }));
}

export function getLeadOptions(): { value: string; label: string }[] {
  return Object.values(RestaurantLeadStatus).map((role) => ({
    value: role,
    label: role,
  }));
}
