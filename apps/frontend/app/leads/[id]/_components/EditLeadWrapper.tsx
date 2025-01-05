import DialogWrapper from "@/components/DialogWrapper";
import EditLeadForm from "@/app/leads/_components/EditLeadForm";

const EditLeadWrapper = ({
  data,
  isOpen,
  onClose,
}: {
  data: any;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <DialogWrapper title="Edit Lead" isOpen={isOpen} onClose={onClose}>
      <EditLeadForm data={data} closeModal={onClose} />
    </DialogWrapper>
  );
};
export default EditLeadWrapper;
