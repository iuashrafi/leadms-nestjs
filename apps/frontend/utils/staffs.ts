import { RestaurantStaffRole } from "contract/enum";

export function getRoleOptions(): { value: string; label: string }[] {
  return Object.values(RestaurantStaffRole).map((role) => ({
    value: role,
    label: role,
  }));
}
