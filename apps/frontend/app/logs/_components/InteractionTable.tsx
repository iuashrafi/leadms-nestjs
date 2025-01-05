"use client";
import { useState, useEffect } from "react";
import { Ellipsis } from "lucide-react";
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
import DialogWrapper from "@/components/DialogWrapper";
import { EditInteractionForm } from "@/app/logs/_components/EditInteractionForm";
import DeleteInteraction from "@/app/logs/_components/DeleteInteraction";
import PreLoader from "@/components/PreLoader";
import { contract } from "contract";
import { getQueryClient } from "@/lib/api";
import { InteractionsSearchFormType } from "@/types/logs";
import { InteractionForm } from "@/app/staffs/_components/InteractionForm";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import { Badge } from "@/components/ui/badge";
export function InteractionTable({
  allInteractionsSearchQuery,
  staffId,
  leadId,
}: {
  allInteractionsSearchQuery: InteractionsSearchFormType;
  staffId: string | null;
  leadId: string | null;
}) {
  const { searchText, role } = allInteractionsSearchQuery;
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedInteractionId, setSelectedInteractionId] = useState<number>(0);
  const [selectedInteraction, setSelectedInteraction] = useState<any>({});
  const [isCreateInteractionModalOpen, setIsCreateInteractionModalOpen] =
    useState<boolean>(false);
  const [selectedStaffId, setSelectedStaffId] = useState<number>(0);

  const handleCreateInteraction = (interaction: any) => {
    setSelectedStaffId(interaction.staffId);
    setIsCreateInteractionModalOpen(true);
  };

  const handleInteraction = (interaction: any) => {
    setSelectedInteractionId(interaction.id);
    setSelectedInteraction(interaction);
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
    getQueryClient().interaction.getAllInteractions.useInfiniteQuery(
      [
        contract.interaction.getAllInteractions.path,
        allInteractionsSearchQuery,
        searchText,
        pageNumber,
        staffId,
      ],
      () =>
        //TODO: uncomment when it is changed to createPaginatedResponse
        // { pageParam = { pageNumber: 1 } }
        {
          return {
            query: {
              pageNumber: String(pageNumber),
              pageSize: String(10),
              searchText: searchText,
              roles: role.trim().length === 0 ? undefined : role,
              staffId: staffId ?? undefined,
              leadId: leadId ?? undefined,
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
    return (
      <CustomErrorMessage
        title={"Error"}
        description={
          "OOPS! An error occurred while loading interactions's data."
        }
      />
    );
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
          interaction={selectedInteraction}
          closeModal={closeModal}
        />
      </DialogWrapper>

      <DialogWrapper
        title="Delete Interaction"
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
      >
        <DeleteInteraction
          interactionId={selectedInteractionId}
          closeModal={closeDeleteModal}
        />
      </DialogWrapper>

      <DialogWrapper
        title="Add New Interaction"
        isOpen={isCreateInteractionModalOpen}
        onClose={() => setIsCreateInteractionModalOpen(false)}
      >
        <InteractionForm
          staffId={selectedStaffId}
          closeModal={() => setIsCreateInteractionModalOpen(false)}
        />
      </DialogWrapper>
      <Table className="">
        <TableHeader>
          <TableRow>
            {/* <TableHead className="">Id</TableHead> */}
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
              {/* <TableCell className="font-medium">{interaction.id}</TableCell> */}
              <TableCell className="font-semibold capitalize">
                {interaction.staffName}
              </TableCell>
              <TableCell>
                <Badge variant={"secondary"}>
                  {interaction.interactionType}
                </Badge>
              </TableCell>
              <TableCell>{interaction.interactionDate}</TableCell>
              <TableCell className="">
                {interaction.followUp ? (
                  <Badge variant={"active"}>Yes</Badge>
                ) : (
                  <Badge variant={"inActive"}>No</Badge>
                )}
              </TableCell>
              <TableCell className="">
                <Badge variant={"notes"}>{interaction.notes ?? "-"}</Badge>
              </TableCell>
              <TableCell className="">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis size={16} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleInteraction(interaction)}
                    >
                      Edit Interaction
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDeleteInteraction(interaction.id)}
                    >
                      Delete Interaction
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleCreateInteraction(interaction)}
                    >
                      New Interaction
                    </DropdownMenuItem>
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
