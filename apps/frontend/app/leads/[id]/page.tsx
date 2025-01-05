"use client";
import { getQueryClient } from "@/lib/api";
import { useParams } from "next/navigation";
import { contract } from "contract";
import { Button } from "@/components/ui/button";
import { MapPin, Pencil, Phone, Trash2 } from "lucide-react";
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
import Image from "next/image";
import PreLoader from "@/components/PreLoader";
import { InteractionForm } from "@/app/staffs/_components/InteractionForm";
import CreateStaffForm from "../_components/CreateStaffForm";

const LeadPage = () => {
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

  const [isCreateStaffModalOpen, setIsCreateStaffModalOpen] =
    useState<boolean>(false);

  const [isInteractStaffModalOpen, setIsInteractStaffModalOpen] =
    useState<boolean>(false);

  const [selectedStaff, setSelectedStaff] = useState(null);

  const closeCreateStaffModal = () => {
    setIsCreateStaffModalOpen(false);
  };

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
    return <PreLoader />;
  } else if (isError) {
    return <>En Error occurred!</>;
  }

  if (data?.status !== 200) return <>Error : Leads fetching error</>;

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
      <CreateStaffWrapper
        leadId={Number(params.id)}
        isOpen={isCreateStaffModalOpen}
        onClose={closeCreateStaffModal}
      />

      <div className="bg-green-30 p-4 mb-4">
        <div className="flex items-center space-x-4 bg-green-00 mb-6">
          <Image width={120} height={120} src={"/restaurant.png"} alt={""} />
          <div className="">
            <h1 className="text-3xl text-bold capitalize">
              {lead.restaurantName}
            </h1>
            <p className="flex space-x-2 items-center">
              <MapPin size={16} />
              <span className="text-lg">{lead.address}</span>
            </p>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <Button onClick={() => setIsCreateStaffModalOpen(true)}>
            Add New Staff
          </Button>
          {/* <CreateStaff leadId={Number(params.id)} /> */}
          <LeadOptions
            openEditLeadModal={() => setIsEditLeadModalOpen(true)}
            openDeleteLeadModal={() => setIsDeleteLeadModalOpen(true)}
          />
        </div>
      </div>

      <div className="px-5 py-8 bg-indigo-00">
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

export default LeadPage;

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
      className="col-span-12 sm:col-span-6 lg:col-span-4  group transition ease-in-out hover:scale-[1.01] hover:shadow-md cursor-pointer border bg-white rounded-2xl p-5"
    >
      <div className="relative flex justify-between">
        <div>
          <div className="text-lg font-semibold capitalize">{staffName}</div>
          <div className="text-muted-foreground">{role}</div>
        </div>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-600/80">Email</span>
        <span>{email}</span>
      </div>
      <div className="flex justify-end">
        <Button
          variant={"ghost"}
          size="sm"
          onClick={() => openInteractStaffModal(staff)}
        >
          <Phone />
        </Button>
        <Button
          variant={"ghost"}
          size="sm"
          onClick={() => openEditStaffModal(staff)}
        >
          <Pencil />
        </Button>
        <Button
          variant={"ghost"}
          size="sm"
          onClick={() => openDeleteStaffModal(staff)}
        >
          <Trash2 />
        </Button>
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
      <EditLeadForm data={data} closeModal={onClose} />
    </DialogWrapper>
  );
};

const CreateStaffWrapper = ({
  leadId,
  isOpen,
  onClose,
}: {
  leadId: number;
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <DialogWrapper title="Add New Staff" isOpen={isOpen} onClose={onClose}>
      <CreateStaffForm leadId={leadId} closeModal={onClose} />
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
  return (
    <DialogWrapper title="Edit Staff" isOpen={isOpen} onClose={onClose}>
      <EditStaffForm staff={staff} closeModal={onClose} />
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
      staffId: staff.staffId,
    };
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
      This action will delete all the staffs and all the interactions with this
      staff. Are you sure you want to proceed ?
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
  return (
    <DialogWrapper title="Add Interaction" isOpen={isOpen} onClose={onClose}>
      {!staff && <p>Loading...</p>}
      {staff && (
        <InteractionForm staffId={staff.staffId} closeModal={onClose} />
      )}
    </DialogWrapper>
  );
};
