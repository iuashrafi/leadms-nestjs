import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Store, Users } from "lucide-react";
import Link from "next/link";

const DashboardCard = ({ data }: any) => {
  return (
    <Link href={data.link}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{data.title}</CardTitle>
          {data.title === "Total Restaurants" && (
            <Store className="h-6 w-6 text-muted-foreground" />
          )}
          {data.title === "Total Staffs" && (
            <Users className="h-6 w-6 text-muted-foreground" />
          )}
          {data.title === "Total Interactions" && (
            <Phone className="h-6 w-6 text-muted-foreground" />
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.itemsCount}</div>
          <p className="text-xs text-muted-foreground">{data.subTitle}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DashboardCard;
