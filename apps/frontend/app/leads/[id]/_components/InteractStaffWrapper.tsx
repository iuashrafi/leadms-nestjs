import { InteractionForm } from "@/app/staffs/_components/InteractionForm";
import DialogWrapper from "@/components/DialogWrapper";

const InteractStaffWrapper = ({
  staff,
  isOpen,
  onClose,
}: {
  staff: any;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <DialogWrapper title="Add Interaction" isOpen={isOpen} onClose={onClose}>
      {!staff && <p>Loading...</p>}
      {staff && (
        <InteractionForm staffId={staff.staffId} closeModal={onClose} />
      )}
    </DialogWrapper>
  );
};

export default InteractStaffWrapper;
