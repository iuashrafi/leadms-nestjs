import { Fragment } from "react";
import { Eye, Pencil, Phone, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LeadStaffType } from "@/types/leads";

const StaffCard = ({
  staff,
  openInteractStaffModal,
  openEditStaffModal,
  openDeleteStaffModal,
}: {
  staff: LeadStaffType;
  openInteractStaffModal: (staff: LeadStaffType) => void;
  openEditStaffModal: (staff: LeadStaffType) => void;
  openDeleteStaffModal: (staff: LeadStaffType) => void;
}) => {
  const { staffId, staffName, role, email } = staff;
  const router = useRouter();

  const onClickViewLeadsInfo = () => {
    router.push("/logs?staffId=" + staffId);
  };

  const StaffCardActionsData = [
    {
      id: "view",
      Icon: Eye,
      label: `View ${staffName} Interactions`,
      onClick: () => onClickViewLeadsInfo(),
    },
    {
      id: "call",
      Icon: Phone,
      label: `Interact with ${staffName}`,
      onClick: () => openInteractStaffModal(staff),
    },
    {
      id: "edit",
      Icon: Pencil,
      label: `Edit ${staffName} data`,
      onClick: () => openEditStaffModal(staff),
    },
    {
      id: "delete",
      Icon: Trash2,
      label: `Delete ${staffName}`,
      onClick: () => openDeleteStaffModal(staff),
    },
  ];

  return (
    <div className="col-span-12 sm:col-span-6 lg:col-span-4  group transition ease-in hover:scale-[1.01] hover:shadow-md cursor-pointer border bg-white rounded-xl p-5 space-y-3">
      <div className="relative flex gap-0 justify-between">
        <div>
          <h3 className="text-xl font-semibold capitalize leading-tight">
            {staffName}
          </h3>
          <p className="text-muted-foreground text-[13px] leading-tight">
            {role}
          </p>
        </div>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-600/80">Email</span>
        <span>{email}</span>
      </div>
      <div className="flex justify-end">
        <TooltipProvider>
          {StaffCardActionsData.map((action) => {
            const { id, onClick, label, Icon } = action;

            return (
              <Fragment key={id}>
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant={"ghost"} size="sm" onClick={onClick}>
                      <Icon />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>{label}</p>
                  </TooltipContent>
                </Tooltip>
              </Fragment>
            );
          })}
        </TooltipProvider>
      </div>
    </div>
  );
};
export default StaffCard;
