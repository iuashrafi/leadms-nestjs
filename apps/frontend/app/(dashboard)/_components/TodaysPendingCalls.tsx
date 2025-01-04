import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import TodaysPendingCallsList from "@/app/(dashboard)/_components/TodaysPendingCallsList";
import { RecentInterationsType } from "@/types/dashboard";

const TodaysPendingCalls = ({
  interactions,
}: {
  interactions: RecentInterationsType;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Pending Calls</CardTitle>
        <TodaysPendingCallsList interactions={interactions} />
      </CardHeader>
    </Card>
  );
};

export default TodaysPendingCalls;
