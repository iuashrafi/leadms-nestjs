import Link from "next/link";
import { ChefHat, ChevronsRight, MapPin, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getRestaurantBadgeVariant } from "@/utils/leads";

const RestaurantCard = ({ lead }: any) => {
  return (
    <div className="group col-span-12 sm:col-span-6 lg:col-span-4 transition ease-in-out border bg-white p-4 rounded-xl hover:shadow-lg  hover:scale-[1.01]">
      <div className="text-xl font-semibold flex justify-between items-center">
        <h3 className="text-gray-900 capitalize text-[20px]">
          {lead.restaurantName}
        </h3>
        <Badge variant={getRestaurantBadgeVariant(lead.restaurantLeadStatus)}>
          {lead.restaurantLeadStatus}
        </Badge>
      </div>
      <ul className="space-y-1 py-1">
        <li className="flex items-center space-x-2 text-lg text-gray-700">
          <MapPin size={16} />
          <p className="capitalize text-[16px]">{lead.address}</p>
        </li>
        <li className="flex items-center space-x-2 text-lg text-gray-700">
          <Phone size={16} />
          <p className="capitalize text-[16px]">{lead.contactNumber}</p>
        </li>
        <li className="flex items-center space-x-2 text-lg text-gray-700">
          <ChefHat size={16} />
          <p className="capitalize text-[16px]">{lead.staffsCount} Staffs</p>
        </li>
      </ul>
      <Button
        asChild
        className="w-full rounded-lg mt-3 text-md text-gray-800 font-medium bg-gradient-to-tr group-hover:bg-zinc-900   group-hover:border-zinc-600/30 group-hover:text-white"
        variant={"outline"}
        size={"lg"}
      >
        <Link href={`/leads/${lead.id}`}>
          View <ChevronsRight className="group-hover:animate-out " />
        </Link>
      </Button>
    </div>
  );
};

export default RestaurantCard;
