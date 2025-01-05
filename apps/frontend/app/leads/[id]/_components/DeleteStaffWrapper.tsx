import DialogWrapper from "@/components/DialogWrapper";
import { Button } from "@/components/ui/button";
import { useApi } from "@/hooks/useApi";
import { getQueryClient } from "@/lib/api";

const DeleteStaffWrapper = ({
  staff,
  isOpen,
  onClose,
}: {
  staff: any;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { makeApiCall } = useApi();

  function handleDelete() {
    const body = {
      staffId: staff.staffId,
    };
    makeApiCall({
      fetcherFn: async () => {
        return await getQueryClient().staff.deleteStaff.mutation({
          body,
        });
      },
      successMsgProps: {
        title: `Staff deleted successfully!`,
        duration: 2000,
      },
      onSuccessFn: () => {
        onClose();
      },
    });
  }

  return (
    <DialogWrapper title="Delete Staff" isOpen={isOpen} onClose={onClose}>
      This action will delete all the staffs and all the interactions with this
      staff. Are you sure you want to proceed ?
      <Button variant={"destructive"} onClick={handleDelete}>
        Delete
      </Button>
    </DialogWrapper>
  );
};

export default DeleteStaffWrapper;
