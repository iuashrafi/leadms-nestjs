import { Eye, Pencil, Phone, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const StaffCard = ({
  staff,
  openInteractStaffModal,
  openEditStaffModal,
  openDeleteStaffModal,
}) => {
  const { staffId, staffName, role, email } = staff;
  const router = useRouter();

  const onClickViewLeadsInfo = () => {
    router.push("/logs?staffId=" + staffId);
  };

  return (
    <div className="col-span-12 sm:col-span-6 lg:col-span-4  group transition ease-in hover:scale-[1.01] hover:shadow-md cursor-pointer border bg-white rounded-2xl p-5 space-y-3">
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
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant={"ghost"}
                size="sm"
                onClick={onClickViewLeadsInfo}
              >
                <Eye />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>View leads info</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button
          variant={"ghost"}
          size="sm"
          onClick={() => openInteractStaffModal(staff)}
        >
          <Phone />
        </Button>
        <Button
          variant={"ghost"}
          size="sm"
          onClick={() => openEditStaffModal(staff)}
        >
          <Pencil />
        </Button>
        <Button
          variant={"ghost"}
          size="sm"
          onClick={() => openDeleteStaffModal(staff)}
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};
export default StaffCard;
