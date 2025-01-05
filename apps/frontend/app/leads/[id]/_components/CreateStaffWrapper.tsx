import DialogWrapper from "@/components/DialogWrapper";
import CreateStaffForm from "@/app/leads/_components/CreateStaffForm";

const CreateStaffWrapper = ({
  leadId,
  isOpen,
  onClose,
}: {
  leadId: number;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <DialogWrapper title="Add New Staff" isOpen={isOpen} onClose={onClose}>
      <CreateStaffForm leadId={leadId} closeModal={onClose} />
    </DialogWrapper>
  );
};

export default CreateStaffWrapper;
