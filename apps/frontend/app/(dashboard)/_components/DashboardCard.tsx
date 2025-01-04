import { Phone, Store, Users } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardCardType } from "@/types/dashboard";

const DashboardCard = ({ data }: { data: DashboardCardType }) => {
  return (
    <Link href={data.link}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-[16px] font-medium">
            {data.title}
          </CardTitle>
          <DashboardCardIcon title={data.title} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.itemsCount}</div>
          <p className="text-sm text-muted-foreground">{data.subTitle}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

const DashboardCardIcon = ({ title }: { title: string }) => {
  if (title === "Total Restaurants")
    return <Store className="h-6 w-6 text-muted-foreground" />;
  else if (title === "Total Staffs")
    return <Users className="h-6 w-6 text-muted-foreground" />;
  else return <Phone className="h-6 w-6 text-muted-foreground" />;
};

export default DashboardCard;
