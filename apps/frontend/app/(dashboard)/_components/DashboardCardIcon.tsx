import { Phone, Store, Users } from "lucide-react";

const DashboardCardIcon = ({ title }: { title: string }) => {
  if (title === "Total Restaurants")
    return <Store className="h-6 w-6 text-muted-foreground" />;
  else if (title === "Total Staffs")
    return <Users className="h-6 w-6 text-muted-foreground" />;
  else return <Phone className="h-6 w-6 text-muted-foreground" />;
};

export default DashboardCardIcon;
