import CustomErrorMessage from "@/components/CustomErrorMessage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardContent } from "@/components/ui/card";
import { RecentInterationsType } from "@/types/dashboard";

const RecentInteractionsList = ({
  interactions,
}: {
  interactions: RecentInterationsType;
}) => {
  if (interactions.length === 0)
    return (
      <CustomErrorMessage
        title={"No interactions"}
        description={"No recent interactions found"}
        wrapperClassName={"min-h-[10vh]"}
      />
    );

  return (
    <CardContent className="grid gap-5 px-0 py-2">
      {interactions.map((interaction) => (
        <div key={interaction.id} className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex uppercase border">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback className="uppercase">
              {interaction.staffName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">
              {interaction.staffName}
            </p>
            <p className="text-sm text-muted-foreground">
              {interaction.staffEmail}
            </p>
          </div>
          <div className="ml-auto font-medium text-sm">
            {interaction.interactionType}
          </div>
        </div>
      ))}
    </CardContent>
  );
};

export default RecentInteractionsList;
