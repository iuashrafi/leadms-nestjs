import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LeadOptions = ({ openEditLeadModal, openDeleteLeadModal, leadId }) => {
  const router = useRouter();
  const onClickViewInteractions = () => {
    router.push("/logs?leadId=" + leadId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Settings</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={openEditLeadModal}>
          Edit Lead
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openDeleteLeadModal}>
          Delete Lead
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onClickViewInteractions}>
          View Interactions
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default LeadOptions;
