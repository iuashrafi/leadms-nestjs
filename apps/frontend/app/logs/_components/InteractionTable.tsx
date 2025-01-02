"use client";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import DialogWrapper from "@/components/DialogWrapper";
import { useState } from "react";
import { InteractionForm } from "@/app/staffs/_components/InteractionForm";
import { EditInteractionForm } from "./EditInteractionForm";
import DeleteInteraction from "./DeleteInteraction";

export function InteractionTable({ data }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedInteractionId, setSelectedInteractionId] = useState<number>(0);

  const handleInteraction = (interactionId: number) => {
    setSelectedInteractionId(interactionId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInteractionId(0);
  };

  const handleDeleteInteraction = (interactionId: number) => {
    setSelectedInteractionId(interactionId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedInteractionId(0);
  };
  return (
    <div className="rounded-md border bg-white p-2">
      <DialogWrapper
        title="Edit Interaction"
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <EditInteractionForm
          interactionId={selectedInteractionId}
          onClose={closeModal}
        />
      </DialogWrapper>

      <DialogWrapper
        title="Delete Interaction"
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
      >
        <DeleteInteraction
          interactionId={selectedInteractionId}
          onClose={closeDeleteModal}
        />
      </DialogWrapper>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="">Id</TableHead>
            <TableHead className="">Interaction With</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="">Follow up</TableHead>
            <TableHead className="">Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((interaction: any) => (
            <TableRow key={interaction.id}>
              <TableCell className="font-medium">{interaction.id}</TableCell>
              <TableCell className="">{interaction.staffId}</TableCell>
              <TableCell>{interaction.interactionType}</TableCell>
              <TableCell>{interaction.interactionDate}</TableCell>
              <TableCell className="">{interaction.followUp}</TableCell>
              <TableCell className="">{interaction.notes}</TableCell>
              <TableCell className="">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis size={16} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleInteraction(interaction.id)}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteInteraction(interaction.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem>New Interaction</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
