"use client";
import { useRouter } from "next/navigation";
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
import EditStaffWrapper from "@/app/leads/[id]/_components/EditStaffWrapper";
import DeleteStaffWrapper from "@/app/leads/[id]/_components/DeleteStaffWrapper";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import { Badge } from "@/components/ui/badge";

export function StaffTable({
  allStaffsSearchQuery,
}: {
  allStaffsSearchQuery: SearchFormType;
}) {
  const router = useRouter();
  const { searchText, role } = allStaffsSearchQuery;
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<number>(0);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const [isEditStaffModalOpen, setIsEditStaffModalOpen] =
    useState<boolean>(false);
  const [isDeleteStaffModalOpen, setIsDeleteStaffModalOpen] =
    useState<boolean>(false);

  const openEditStaffModal = (staff) => {
    setSelectedStaff({ ...staff, staffId: staff.id, staffName: staff.name });
    setIsEditStaffModalOpen(true);
  };

  const closeEditStaffModal = () => {
    setIsEditStaffModalOpen(false);
    setSelectedStaff(null);
  };

  const openDeleteStaffModal = (staff) => {
    setSelectedStaff({ ...staff, staffId: staff.id });

    setIsDeleteStaffModalOpen(true);
  };
  const closeDeleteStaffModal = () => {
    setIsDeleteStaffModalOpen(false);
    setSelectedStaff(null);
  };

  const handleInteraction = (staffId: number) => {
    setSelectedStaffId(staffId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStaffId(0);
  };

  const onClickViewLeadsInfo = (staffId: number) => {
    router.push("/logs?staffId=" + staffId);
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
              pageSize: String(10),
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
  } else if (error) {
    return (
      <CustomErrorMessage
        title={"Error"}
        description={"OOPS! An error occurred while loading staffs data."}
      />
    );
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
      <EditStaffWrapper
        staff={selectedStaff}
        isOpen={isEditStaffModalOpen}
        onClose={closeEditStaffModal}
      />
      <DeleteStaffWrapper
        staff={selectedStaff}
        isOpen={isDeleteStaffModalOpen}
        onClose={closeDeleteStaffModal}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Staff Name</TableHead>
            <TableHead>Restaurant</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Email</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffsList.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center pt-8 italic text-muted-foreground"
              >
                No Staffs Found
              </TableCell>
            </TableRow>
          )}
          {staffsList.map((staff: any) => (
            <TableRow key={staff.id}>
              <TableCell className="font-semibold capitalize">
                {staff.name}
              </TableCell>
              <TableCell className="capitalize font-semibold">
                {staff.leadName}
              </TableCell>
              <TableCell>
                <Badge variant={"secondary"}>{staff.role}</Badge>
              </TableCell>
              <TableCell>{staff.contactNumber}</TableCell>
              <TableCell>{staff.email}</TableCell>
              <TableCell>
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
                    <DropdownMenuItem
                      onClick={() => onClickViewLeadsInfo(staff.id)}
                    >
                      View Interactions
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openEditStaffModal(staff)}>
                      Edit Staff
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => openDeleteStaffModal(staff)}
                    >
                      Delete Staff
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
