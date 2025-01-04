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

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Ellipsis } from "lucide-react";
import DialogWrapper from "@/components/DialogWrapper";
import { useEffect, useState } from "react";
import { getQueryClient } from "@/lib/api";
import { contract } from "contract";
import { SearchFormType } from "@/lib/schema";

export function StaffTable({
  allStaffsSearchQuery,
}: {
  allStaffsSearchQuery: SearchFormType;
}) {
  const { searchText, role } = allStaffsSearchQuery;
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<number | null>(null);

  const handleInteraction = (staffId: number) => {
    setSelectedStaffId(staffId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStaffId(null);
  };

  useEffect(() => {
    setPageNumber(1);
  }, [allStaffsSearchQuery]);

  const { data, isLoading, error } =
    getQueryClient().lead.getAllStaffs.useInfiniteQuery(
      [
        contract.lead.getAllStaffs.path,
        allStaffsSearchQuery,
        searchText,
        pageNumber,
      ],
      ({ pageParam = { pageNumber: 1 } }) => {
        return {
          query: {
            pageNumber: String(pageNumber),
            pageSize: String(4),
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
    return <>loading staffs data....</>;
  }

  if (error) {
    return <>an error occurred while loading staffs</>;
  }

  const staffsList = data.pages.flatMap((eachPage) => {
    return eachPage.body.results;
  });

  const totalPages = data.pages[0].body.totalPages;

  console.log("fetched staff data=  ", staffsList);

  const handlePrev = () => {
    setPageNumber((prev) => (prev === 1 ? 1 : prev - 1));
  };

  const handleNext = () => {
    setPageNumber((prev) => (prev === totalPages ? totalPages : prev + 1));
  };

  return (
    <div className="rounded-md border bg-white p-2">
      <DialogWrapper
        title="Interaction"
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        intersction form to be here
        {/* <InteractionForm staffId={selectedStaffId} onClose={closeModal} /> */}
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
              <TableCell className="">{staff.name}</TableCell>
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
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>

      <div className="flex gap-1">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePrev();
                }}
                className={`${pageNumber === 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
              />
            </PaginationItem>

            {Array()
              .fill(totalPages)
              .map((_, index) => {
                const page = index + 1;
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={pageNumber === page}
                      onClick={(e) => {
                        e.preventDefault();
                        setPageNumber(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
            {totalPages > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleNext();
                }}
                className={`${pageNumber === totalPages ? "cursor-not-allowed" : "cursor-pointer"}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
