import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentInterationsType } from "@/types/dashboard";
import RecentInteractionsList from "./RecentInteractionsList";

const RecentInteractions = ({
  interactions,
}: {
  interactions: RecentInterationsType;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Interactions</CardTitle>
        <RecentInteractionsList interactions={interactions} />
      </CardHeader>
    </Card>
  );
};

export default RecentInteractions;
