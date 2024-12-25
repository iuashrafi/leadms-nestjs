"use client";
import { getQueryClient } from "@/lib/api";
import { useParams } from "next/navigation";
import { contract } from "../../../../contract";
import { Button } from "@/components/ui/button";
import CreateStaff from "./_components/CreateStaff";
import { MapPin, Settings, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const page = () => {
  const params = useParams();

  const { data, isError, isLoading } =
    getQueryClient().lead.getLeadById.useQuery(
      [contract.lead.getLeadById.path],
      {
        query: {
          id: params.id,
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
      <div className="bg-green-30 p-4 mb-4">
        <div className="flex justify-between">
          <h1 className="text-3xl text-semibold capitalize">
            {lead.restaurantName}
          </h1>
          <Button variant={"outline"} className="">
            <Settings className="text-lg" /> Settings
          </Button>
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
          {lead.staffs.map(({ staffId, staffName, role, email }) => (
            <div
              key={staffId}
              className="col-span-12 sm:col-span-6 lg:col-span-4  group transition ease-in-out hover:scale-[1.01] hover:shadow-md cursor-pointer border bg-white rounded-3xl p-5"
            >
              <div className="relative flex justify-between">
                <span className="text-lg font-semibold capitalize">
                  {staffName}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
