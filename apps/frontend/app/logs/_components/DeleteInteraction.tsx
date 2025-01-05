import { Button } from "@/components/ui/button";
import { useApi } from "@/hooks/useApi";
import { getQueryClient } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import { contract } from "contract";

const DeleteInteraction = ({
  interactionId,
  closeModal,
}: {
  interactionId: number;
  closeModal: () => void;
}) => {
  const { makeApiCall } = useApi();
  const invalidationQueryClient = useQueryClient();

  function handleDelete() {
    const body = {
      interactionId,
    };
    makeApiCall({
      fetcherFn: async () => {
        return await getQueryClient().interaction.deleteInteraction.mutation({
          body,
        });
      },
      successMsgProps: {
        title: `Interaction deleted successfully`,
        duration: 2000,
      },
      onSuccessFn: () => {
        invalidationQueryClient.invalidateQueries({
          queryKey: [contract.interaction.getAllInteractions.path],
          refetchType: "active",
        });
        closeModal();
      },
    });
  }

  return (
    <div>
      <p>Are you sure you want to delete this interaction ?</p>
      <div className="flex justify-end">
        <Button variant={"destructive"} onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteInteraction;
