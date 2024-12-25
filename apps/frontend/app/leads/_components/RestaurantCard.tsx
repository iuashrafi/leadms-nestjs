import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChefHat, ChevronsRight, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const RestaurantCard = ({ lead }: any) => {
  return (
    <div className="group col-span-12 sm:col-span-6 lg:col-span-4 transition ease-in-out border bg-white p-4 rounded-xl hover:shadow-lg hover:scale-[1.01]">
      <div className="text-xl font-semibold flex justify-between items-center">
        <span className="text-gray-900 capitalize">{lead.name}</span>
        <Badge
          variant={
            lead.restaurantLeadStatus === "New"
              ? "new"
              : lead.restaurantLeadStatus === "Active"
                ? "active"
                : "inActive"
          }
        >
          {lead.restaurantLeadStatus}
        </Badge>
      </div>
      <ul className="space-y-1 py-1">
        <li className="flex items-center space-x-2 text-lg text-gray-700">
          <MapPin size={18} />
          <span className="capitalize">{lead.address}</span>
        </li>
        <li className="flex items-center space-x-2 text-lg text-gray-700">
          <Phone size={18} />
          <span>{lead.contactNumber}</span>
        </li>
        <li className="flex items-center space-x-2 text-lg text-gray-700">
          <ChefHat size={18} />
          <span>5 Staffs</span>
        </li>
      </ul>
      <Button
        asChild
        className="w-full rounded-lg mt-3 text-md text-gray-800 font-medium bg-gradient-to-tr group-hover:bg-violet-500   group-hover:border-violet-600/30 group-hover:text-white"
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
