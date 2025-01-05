import { Phone, Store, Users } from "lucide-react";

const DashboardCardIcon = ({ title }: { title: string }) => {
  if (title === "Total Restaurants")
    return <Store className="h-5 w-5 text-muted-foreground" />;
  else if (title === "Total Staffs")
    return <Users className="h-5 w-5 text-muted-foreground" />;
  else return <Phone className="h-5 w-5 text-muted-foreground" />;
};

export default DashboardCardIcon;
