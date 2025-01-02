import { Button } from "@/components/ui/button";

const DeleteInteraction = () => {
  return (
    <div>
      <p>Are you sure you want to delete this interaction ?</p>
      <div className="flex justify-end">
        <Button variant={"destructive"}>Delete</Button>
      </div>
    </div>
  );
};

export default DeleteInteraction;
