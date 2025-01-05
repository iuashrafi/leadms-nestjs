import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CardContent } from "@/components/ui/card";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import { Badge } from "@/components/ui/badge";
import { RecentRestaurantsType } from "@/types/dashboard";
import { getRestaurantBadgeVariant } from "@/utils/leads";

const RestaurantsList = ({
  restaurants,
}: {
  restaurants: RecentRestaurantsType;
}) => {
  if (restaurants.length === 0)
    return (
      <CustomErrorMessage
        title={"No pending calls"}
        description={"No pending calls found"}
        wrapperClassName={"min-h-[6vh]"}
      />
    );
  return (
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Restaurant</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead className="text-right">Contact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {restaurants.map((restaurant) => (
            <TableRow key={restaurant.id}>
              <TableCell>
                <div className="font-medium capitalize">{restaurant.name}</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  {restaurant.address}
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge
                  variant={getRestaurantBadgeVariant(
                    restaurant.restaurantLeadStatus
                  )}
                >
                  {restaurant.restaurantLeadStatus}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {restaurant.contactNumber}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  );
};

export default RestaurantsList;
