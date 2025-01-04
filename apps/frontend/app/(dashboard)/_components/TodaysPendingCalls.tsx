import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentInterationsType } from "@/types/dashboard";
import TodaysPendingCallsList from "./TodaysPendingCallsList";

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
