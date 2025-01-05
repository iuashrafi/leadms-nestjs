import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TodaysPendingCallsList from "@/app/(dashboard)/_components/TodaysPendingCallsList";
import { TodaysPendingCallsType } from "@/types/dashboard";

const TodaysPendingCalls = ({
  interactions,
}: {
  interactions: TodaysPendingCallsType;
}) => {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="mb-2">Today's Pending Calls</CardTitle>
        <CardDescription>Follow up calls with Today's date.</CardDescription>
        <TodaysPendingCallsList interactions={interactions} />
      </CardHeader>
    </Card>
  );
};

export default TodaysPendingCalls;
