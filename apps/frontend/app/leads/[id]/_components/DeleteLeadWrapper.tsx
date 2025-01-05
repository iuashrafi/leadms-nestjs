import { useRouter } from "next/navigation";
import DialogWrapper from "@/components/DialogWrapper";
import { Button } from "@/components/ui/button";
import { useApi } from "@/hooks/useApi";
import { getQueryClient } from "@/lib/api";

const DeleteLeadWrapper = ({
  data,
  isOpen,
  onClose,
}: {
  data: any;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const { makeApiCall } = useApi();

  function handleDelete() {
    const body = {
      id: Number(data.id),
    };
    makeApiCall({
      fetcherFn: async () => {
        return await getQueryClient().lead.deleteLead.mutation({
          body,
        });
      },
      successMsgProps: {
        title: `Lead deleted successfully!`,
        duration: 2000,
      },
      onSuccessFn: () => {
        onClose();
        router.push("/leads");
      },
    });
  }

  return (
    <DialogWrapper title="Delete Lead" isOpen={isOpen} onClose={onClose}>
      <div>
        <p>Are you sure you want to delete this Lead ?</p>
        <div className="flex justify-end">
          <Button variant={"destructive"} onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </DialogWrapper>
  );
};

export default DeleteLeadWrapper;
