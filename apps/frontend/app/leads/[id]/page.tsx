"use client";
import { getQueryClient } from "@/lib/api";
import { useParams } from "next/navigation";
import { contract } from "../../../../contract";
import { Button } from "@/components/ui/button";
import CreateStaff from "../_components/CreateStaff";
import { MapPin, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DialogWrapper from "@/components/DialogWrapper";
import { useState } from "react";
import EditLeadForm from "../_components/EditLeadForm";
import EditStaffForm from "../_components/EditStaffForm";
import { useApi } from "@/hooks/useApi";
import { useRouter } from "next/navigation";

const page = () => {
  const params = useParams();

  // lead options
  const [isDeleteLeadModalOpen, setIsDeleteLeadModalOpen] =
    useState<boolean>(false);
  const [isEditLeadModalOpen, setIsEditLeadModalOpen] =
    useState<boolean>(false);

  // staff interact/edit/delete options
  const [isEditStaffModalOpen, setIsEditStaffModalOpen] =
    useState<boolean>(false);
  const [isDeleteStaffModalOpen, setIsDeleteStaffModalOpen] =
    useState<boolean>(false);

  const [isInteractStaffModalOpen, setIsInteractStaffModalOpen] =
    useState<boolean>(false);

  const [selectedStaff, setSelectedStaff] = useState(null);

  const openEditStaffModal = (staff) => {
    setSelectedStaff(staff);
    setIsEditStaffModalOpen(true);
  };

  const closeEditStaffModal = () => {
    setIsEditStaffModalOpen(false);
    setSelectedStaff(null);
  };

  const openDeleteStaffModal = (staff) => {
    setSelectedStaff(staff);
    setIsDeleteStaffModalOpen(true);
  };
  const closeDeleteStaffModal = () => {
    setIsDeleteStaffModalOpen(false);
    setSelectedStaff(null);
  };

  const openInteractStaffModal = (staff) => {
    setSelectedStaff(staff);
    setIsInteractStaffModalOpen(true);
  };
  const closeInteractStaffModal = () => {
    setIsInteractStaffModalOpen(false);
    setSelectedStaff(null);
  };

  // api call to load page data
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
    return <>Loading...</>;
  } else if (isError) {
    return <>En Error occurred!</>;
  }

  if (data?.status !== 200) return <>Error : Leads fetching error</>;

  console.log("data=  ", data);

  const lead = data.body;
  return (
    <div>
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

      <div className="bg-green-30 p-4 mb-4">
        <div className="flex justify-between">
          <h1 className="text-3xl text-semibold capitalize">
            {lead.restaurantName}
          </h1>
          <LeadOptions
            openEditLeadModal={() => setIsEditLeadModalOpen(true)}
            openDeleteLeadModal={() => setIsDeleteLeadModalOpen(true)}
          />
        </div>
        <ul className="flex flex-wrap space-x-6">
          <li className="text-lg flex items-center space-x-1">
            <MapPin size={16} />
            <span className="text-md">{lead.address}</span>
          </li>
          <li className="text-lg">
            <Badge
              variant={"outline"}
              className="text-sm rounded-full border-2 font-normal"
            >
              {lead.staffs.length} staffs
            </Badge>
          </li>
        </ul>
      </div>

      <div className="px-5 py-8 bg-indigo-50 rounded-3xl border border-gray-500/20">
        <div className="flex justify-between pb-3">
          <h1 className="text-xl font-medium relative flex items-center">
            Staffs
          </h1>
          <CreateStaff leadId={Number(params.id)} />
        </div>

        <div className="gap-4 grid grid-cols-12">
          {lead.staffs.map((staff) => (
            <StaffCard
              key={staff.staffId}
              staff={staff}
              openInteractStaffModal={openInteractStaffModal}
              openEditStaffModal={openEditStaffModal}
              openDeleteStaffModal={openDeleteStaffModal}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;

const StaffCard = ({
  staff,
  openInteractStaffModal,
  openEditStaffModal,
  openDeleteStaffModal,
}) => {
  const { staffId, staffName, role, email } = staff;
  return (
    <div
      key={staffId}
      className="col-span-12 sm:col-span-6 lg:col-span-4  group transition ease-in-out hover:scale-[1.01] hover:shadow-md cursor-pointer border bg-white rounded-3xl p-5"
    >
      <div className="relative flex justify-between">
        <span className="text-lg font-semibold capitalize">
          {staffName}
          <Button
            variant={"ghost"}
            size="sm"
            onClick={() => openInteractStaffModal(staff)}
          >
            Interact
          </Button>
          <Button
            variant={"ghost"}
            size="sm"
            onClick={() => openEditStaffModal(staff)}
          >
            Edit
          </Button>
          <Button
            variant={"ghost"}
            size="sm"
            onClick={() => openDeleteStaffModal(staff)}
          >
            Delete
          </Button>
        </span>
        <span className="absolute top-0 right-0 bg-gradient-to-tr from-indigo-300 to-fuchsia-300  rounded-full h-[2.5rem] w-[2.5rem] flex items-center justify-center">
          <UserRound className="text-white/80" />
        </span>
      </div>
      <div className="flex justify-between mt-6">
        <span className="text-gray-600/80">Role</span>
        <span>{role}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600/80">Email</span>
        <span>{email}</span>
      </div>
    </div>
  );
};

const LeadOptions = ({ openEditLeadModal, openDeleteLeadModal }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Settings</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={openEditLeadModal}>
          Edit Lead
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openDeleteLeadModal}>
          Delete Lead
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
    console.log("deleting lead, body = ", body);
    makeApiCall({
      fetcherFn: async () => {
        return await getQueryClient().lead.deleteLead.mutation({
          body,
        });
      },
      successMsgProps: {
        title: `Lead deleted successfully`,
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

const EditLeadWrapper = ({
  data,
  isOpen,
  onClose,
}: {
  data: any;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <DialogWrapper title="Edit Lead" isOpen={isOpen} onClose={onClose}>
      <EditLeadForm data={data} />
    </DialogWrapper>
  );
};

const EditStaffWrapper = ({
  staff,
  isOpen,
  onClose,
}: {
  staff: any;
  isOpen: boolean;
  onClose: () => void;
}) => {
  console.log("inside edit staff wrapper, staff=", staff);
  return (
    <DialogWrapper title="Edit Staff" isOpen={isOpen} onClose={onClose}>
      <EditStaffForm staff={staff} />
    </DialogWrapper>
  );
};

const DeleteStaffWrapper = ({
  staff,
  isOpen,
  onClose,
}: {
  staff: any;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { makeApiCall } = useApi();

  function handleDelete() {
    const body = {
      leadId: 1,
      staffId: staff.staffId,
    };
    console.log("deleting staff, body = ", body);
    makeApiCall({
      fetcherFn: async () => {
        return await getQueryClient().lead.deleteStaff.mutation({
          body,
        });
      },
      successMsgProps: {
        title: `Staff updated successfully`,
        duration: 2000,
      },
      onSuccessFn: () => {
        onClose();
        alert("delete successfully!");
      },
    });
  }

  return (
    <DialogWrapper title="Delete Staff" isOpen={isOpen} onClose={onClose}>
      here, delete staff
      <Button variant={"destructive"} onClick={handleDelete}>
        Delete
      </Button>
    </DialogWrapper>
  );
};

const InteractStaffWrapper = ({
  staff,
  isOpen,
  onClose,
}: {
  staff: any;
  isOpen: boolean;
  onClose: () => void;
}) => {
  console.log("inside edit staff wrapper, staff=", staff);
  return (
    <DialogWrapper title="Add Interaction" isOpen={isOpen} onClose={onClose}>
      interact form here
    </DialogWrapper>
  );
};
