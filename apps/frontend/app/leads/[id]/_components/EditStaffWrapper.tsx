import DialogWrapper from "@/components/DialogWrapper";
import EditStaffForm from "@/app/leads/_components/EditStaffForm";

const EditStaffWrapper = ({
  staff,
  isOpen,
  onClose,
}: {
  staff: any;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <DialogWrapper title="Edit Staff" isOpen={isOpen} onClose={onClose}>
      <EditStaffForm staff={staff} closeModal={onClose} />
    </DialogWrapper>
  );
};

export default EditStaffWrapper;
