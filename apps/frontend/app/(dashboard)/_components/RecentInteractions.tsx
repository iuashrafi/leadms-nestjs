import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import RecentInteractionsList from "@/app/(dashboard)/_components/RecentInteractionsList";
import { RecentInterationsType } from "@/types/dashboard";

const RecentInteractions = ({
  interactions,
}: {
  interactions: RecentInterationsType;
}) => {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Recent Interactions</CardTitle>
        <RecentInteractionsList interactions={interactions} />
      </CardHeader>
    </Card>
  );
};

export default RecentInteractions;
