"use client";

import { useEffect, useState } from "react";
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
import DialogWrapper from "@/components/DialogWrapper";
import PreLoader from "@/components/PreLoader";
import CustomPagination from "@/components/CustomPagination";
import { contract } from "contract";
import { getQueryClient } from "@/lib/api";
import { SearchFormType } from "@/types/common";
import { InteractionForm } from "./InteractionForm";

export function StaffTable({
  allStaffsSearchQuery,
}: {
  allStaffsSearchQuery: SearchFormType;
}) {
  const { searchText, role } = allStaffsSearchQuery;
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<number>(0);

  const handleInteraction = (staffId: number) => {
    setSelectedStaffId(staffId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStaffId(0);
  };

  useEffect(() => {
    setPageNumber(1);
  }, [allStaffsSearchQuery]);

  const { data, isLoading, error } =
    getQueryClient().staff.getAllStaffs.useInfiniteQuery(
      [
        contract.staff.getAllStaffs.path,
        allStaffsSearchQuery,
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
              pageSize: String(5),
              searchText: searchText,
              roles: role,
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

  const staffsList = data.pages.flatMap((eachPage) => eachPage.body.results);

  const totalPages = data.pages[0].body.totalPages;

  return (
    <div className="rounded-md border bg-white p-2">
      <DialogWrapper
        title="Interaction"
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <InteractionForm staffId={selectedStaffId} closeModal={closeModal} />
      </DialogWrapper>
      <Table className="">
        <TableHeader>
          <TableRow>
            <TableHead className="">Staff Name</TableHead>
            <TableHead className="">Restaurant</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead className="">Email</TableHead>
            <TableHead className=""></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffsList.map((staff: any) => (
            <TableRow key={staff.id}>
              <TableCell className="font-medium">{staff.name}</TableCell>
              <TableCell className="">{staff.leadName}</TableCell>
              <TableCell>{staff.role}</TableCell>
              <TableCell>{staff.contactNumber}</TableCell>
              <TableCell className="">{staff.email}</TableCell>
              <TableCell className="">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis size={16} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleInteraction(staff.id)}
                    >
                      Interact
                    </DropdownMenuItem>
                    <DropdownMenuItem>View Interactions</DropdownMenuItem>
                    <DropdownMenuItem>Edit Staff</DropdownMenuItem>
                    <DropdownMenuItem>Delete Staff</DropdownMenuItem>
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
