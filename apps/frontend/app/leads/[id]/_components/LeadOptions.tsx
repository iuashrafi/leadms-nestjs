import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LeadOptions = ({ openEditLeadModal, openDeleteLeadModal }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Settings</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={openEditLeadModal}>
          Edit Lead
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openDeleteLeadModal}>
          Delete Lead
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default LeadOptions;
