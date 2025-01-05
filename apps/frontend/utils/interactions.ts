import { RestaurantInteractionType } from "contract/enum";

export function getInteractionsOptions(): { value: string; label: string }[] {
  return Object.values(RestaurantInteractionType).map((role) => ({
    value: role,
    label: role,
  }));
}
