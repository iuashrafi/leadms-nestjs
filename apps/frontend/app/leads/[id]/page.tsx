"use client";
import { Fragment, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import PreLoader from "@/components/PreLoader";
import DeleteLeadWrapper from "@/app/leads/[id]/_components/DeleteLeadWrapper";
import EditLeadWrapper from "@/app/leads/[id]/_components/EditLeadWrapper";
import EditStaffWrapper from "@/app/leads/[id]/_components/EditStaffWrapper";
import DeleteStaffWrapper from "@/app/leads/[id]/_components/DeleteStaffWrapper";
import InteractStaffWrapper from "@/app/leads/[id]/_components/InteractStaffWrapper";
import CreateStaffWrapper from "@/app/leads/[id]/_components/CreateStaffWrapper";
import LeadOptions from "@/app/leads/[id]/_components/LeadOptions";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import StaffCard from "@/app/leads/[id]/_components/StaffCard";
import { contract } from "contract";
import { getQueryClient } from "@/lib/api";
import { LeadStaffType } from "@/types/leads";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const LeadPage = () => {
  const params = useParams();
  const [isDeleteLeadModalOpen, setIsDeleteLeadModalOpen] =
    useState<boolean>(false);
  const [isEditLeadModalOpen, setIsEditLeadModalOpen] =
    useState<boolean>(false);
  const [isEditStaffModalOpen, setIsEditStaffModalOpen] =
    useState<boolean>(false);
  const [isDeleteStaffModalOpen, setIsDeleteStaffModalOpen] =
    useState<boolean>(false);
  const [isCreateStaffModalOpen, setIsCreateStaffModalOpen] =
    useState<boolean>(false);
  const [isInteractStaffModalOpen, setIsInteractStaffModalOpen] =
    useState<boolean>(false);
  const [selectedStaff, setSelectedStaff] = useState<LeadStaffType | null>(
    null
  );

  const closeCreateStaffModal = () => {
    setIsCreateStaffModalOpen(false);
  };

  const openEditStaffModal = (staff: LeadStaffType) => {
    setSelectedStaff(staff);
    setIsEditStaffModalOpen(true);
  };

  const closeEditStaffModal = () => {
    setIsEditStaffModalOpen(false);
    setSelectedStaff(null);
  };

  const openDeleteStaffModal = (staff: LeadStaffType) => {
    setSelectedStaff(staff);
    setIsDeleteStaffModalOpen(true);
  };
  const closeDeleteStaffModal = () => {
    setIsDeleteStaffModalOpen(false);
    setSelectedStaff(null);
  };

  const openInteractStaffModal = (staff: LeadStaffType) => {
    setSelectedStaff(staff);
    setIsInteractStaffModalOpen(true);
  };
  const closeInteractStaffModal = () => {
    setIsInteractStaffModalOpen(false);
    setSelectedStaff(null);
  };

  const { data, isError, isLoading } =
    getQueryClient().lead.getLeadById.useQuery(
      [contract.lead.getLeadById.path],
      {
        query: {
          id: String(params.id),
        },
      }
    );

  if (isLoading) {
    return <PreLoader />;
  } else if (isError) {
    return (
      <CustomErrorMessage
        title={"Error"}
        description={"OOPS! An error occurred while loading lead's data."}
      />
    );
  }

  if (data?.status !== 200)
    return (
      <CustomErrorMessage
        title={"Error"}
        description={"Error loading lead's data"}
      />
    );

  const lead = data.body;
  return (
    <div>
      <div className="bg-green-00 p-4 mb-4">
        <div className="flex  items-center space-x-6 bg-green-00 mb-6">
          <Image width={120} height={120} src={"/restaurant.png"} alt={""} />
          <div className="">
            <h1 className="text-3xl font-bold capitalize">
              {lead.restaurantName}
            </h1>

            <div className="flex space-x-2 items-center">
              <MapPin size={16} />
              <span className="text-lg">{lead.address}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center mt-2">
                <span>Assigned to : </span>
                <div className="ml-4 bg-indigo-100/40 border border-indigo-500 rounded-full flex items-center gap-1 p-1 pr-2 shadow-md shadow-indigo-100">
                  <Avatar className="h-8 w-8 flex uppercase border border-indigo-400">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback className="uppercase text-indigo-500">
                      {lead.assignedKAM[0]}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-indigo-500">{lead.assignedKAM}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span>Total Orders : </span>
                <Badge
                  variant={"new"}
                  className="rounded-full h-8 w-8 flex justify-center items-center text-lg"
                >
                  {lead.ordersCount}
                </Badge>
              </div>
              {lead.rankNo && (
                <div className="flex items-center space-x-2">
                  <span>Rank : </span>
                  <Badge
                    variant={"active"}
                    className="rounded-full h-8 w-8 flex justify-center items-center text-lg"
                  >
                    {lead.rankNo}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <Button onClick={() => setIsCreateStaffModalOpen(true)}>
            Add New Staff
          </Button>
          <LeadOptions
            leadId={params.id}
            openEditLeadModal={() => setIsEditLeadModalOpen(true)}
            openDeleteLeadModal={() => setIsDeleteLeadModalOpen(true)}
          />
        </div>
      </div>

      <div className="px-5 py-8 bg-indigo-00">
        {lead.staffs.length === 0 ? (
          <CustomErrorMessage
            title={"No staffs found"}
            description={"Try to add new staffs"}
            wrapperClassName="max-h-[4vh]"
            actionButton={
              <Button onClick={() => setIsCreateStaffModalOpen(true)}>
                Add New Staff
              </Button>
            }
          />
        ) : (
          <div className="gap-4 grid grid-cols-12">
            {lead.staffs.map((staff) => (
              <Fragment key={staff.staffId}>
                <StaffCard
                  staff={staff}
                  openInteractStaffModal={openInteractStaffModal}
                  openEditStaffModal={openEditStaffModal}
                  openDeleteStaffModal={openDeleteStaffModal}
                />
              </Fragment>
            ))}
          </div>
        )}
      </div>

      <DeleteLeadWrapper
        data={{ id: params.id }}
        isOpen={isDeleteLeadModalOpen}
        onClose={() => setIsDeleteLeadModalOpen(false)}
      />
      <EditLeadWrapper
        data={{ ...lead, id: params.id }}
        isOpen={isEditLeadModalOpen}
        onClose={() => setIsEditLeadModalOpen(false)}
      />
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
      <InteractStaffWrapper
        staff={selectedStaff}
        isOpen={isInteractStaffModalOpen}
        onClose={closeInteractStaffModal}
      />
      <CreateStaffWrapper
        leadId={Number(params.id)}
        isOpen={isCreateStaffModalOpen}
        onClose={closeCreateStaffModal}
      />
    </div>
  );
};

export default LeadPage;
