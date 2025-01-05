import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecentRestaurantsType } from "@/types/dashboard";
import RestaurantsList from "@/app/(dashboard)/_components/RestaurantsList";

const RecentRestaurants = ({
  restaurants,
}: {
  restaurants: RecentRestaurantsType;
}) => {
  return (
    <Card className="xl:col-span-2 shadow-none">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Restaurants</CardTitle>
          <CardDescription>Recent leads from our system.</CardDescription>
        </div>
        <Button
          asChild
          size="sm"
          className="ml-auto gap-2 text-[14px] ease-in-out hover:scale-[1.02]"
        >
          <Link href="/leads">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <RestaurantsList restaurants={restaurants} />
    </Card>
  );
};

export default RecentRestaurants;
