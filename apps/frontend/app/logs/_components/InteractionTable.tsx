"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CustomPagination from "@/components/CustomPagination";
import { Ellipsis } from "lucide-react";
import DialogWrapper from "@/components/DialogWrapper";
import { useState, useEffect } from "react";
import { EditInteractionForm } from "./EditInteractionForm";
import DeleteInteraction from "./DeleteInteraction";
import { InteractionsSearchFormType } from "@/lib/schema";
import { contract } from "contract";
import { getQueryClient } from "@/lib/api";
import PreLoader from "@/components/PreLoader";

export function InteractionTable({
  allInteractionsSearchQuery,
}: {
  allInteractionsSearchQuery: InteractionsSearchFormType;
}) {
  const { searchText } = allInteractionsSearchQuery;
  const [pageNumber, setPageNumber] = useState<number>(1);

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

  useEffect(() => {
    setPageNumber(1);
  }, [allInteractionsSearchQuery]);

  const { data, isLoading, error } =
    getQueryClient().lead.getAllInteractions.useInfiniteQuery(
      [
        contract.lead.getAllInteractions.path,
        allInteractionsSearchQuery,
        searchText,
        pageNumber,
      ],
      () =>
        //TODO: uncomment when it is changed to createPaginatedResponse
        // { pageParam = { pageNumber: 1 } }
        {
          return {
            query: {
              pageNumber: String(pageNumber),
              pageSize: String(4),
              searchText: searchText,
            },
          };
        },
      {
        getNextPageParam: (lastPage) => {
          if (
            lastPage.status === 200 &&
            lastPage.body.currentPageNumber < lastPage.body.totalPages
          ) {
            return { pageNumber: lastPage.body.currentPageNumber + 1 };
          }
          return undefined;
        },
      }
    );

  if (isLoading) {
    return <PreLoader />;
  }

  if (error) {
    return <>an error occurred while loading staffs</>;
  }

  const interactionsList = data.pages.flatMap(
    (eachPage) => eachPage.body.results
  );
  const totalPages = data.pages[0].body.totalPages;

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
        //TODO: uncommend when adding delete interaction
        // interactionId={selectedInteractionId}
        // onClose={closeDeleteModal}
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
          {interactionsList.map((interaction: any) => (
            <TableRow key={interaction.id}>
              <TableCell className="font-medium">{interaction.id}</TableCell>
              <TableCell className="">{interaction.staffName}</TableCell>
              <TableCell>{interaction.interactionType}</TableCell>
              <TableCell>{interaction.interactionDate}</TableCell>
              <TableCell className="">
                {interaction.followUp ? "Yes" : "No"}
              </TableCell>
              <TableCell className="">{interaction.notes ?? "-"}</TableCell>
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

      <CustomPagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        totalPages={totalPages}
      />
    </div>
  );
}
