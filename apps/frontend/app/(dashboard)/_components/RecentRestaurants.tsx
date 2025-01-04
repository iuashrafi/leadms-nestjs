import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RecentRestaurantsType } from "@/types/dashboard";

const RecentRestaurants = ({
  restaurants,
}: {
  restaurants: RecentRestaurantsType;
}) => {
  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Restaurants</CardTitle>
          <CardDescription>Recent leads from our system.</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href="/leads">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
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
                  <div className="font-medium">{restaurant.name}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {restaurant.address}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge className="text-xs" variant="outline">
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
    </Card>
  );
};

export default RecentRestaurants;
