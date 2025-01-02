"use client";
import { getQueryClient } from "@/lib/api";
import { InteractionTable } from "./_components/InteractionTable";
import { contract } from "contract";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import PreLoader from "@/components/PreLoader";

const page = () => {
  const { data, isError, isLoading } =
    getQueryClient().lead.getAllInteractions.useQuery(
      [contract.lead.getAllInteractions.path],
      {
        query: {
          pageNumber: String(1),
          pageSize: String(10),
        },
      }
    );

  if (isLoading) {
    return <PreLoader />;
  } else if (isError) {
    return <>En Error occurred!</>;
  }

  if (data?.status !== 200) return <>Error : Interactions fetching error</>;

  const interactions = data.body.results;
  return (
    <div>
      <div className="p-4 bg-red-00 ">
        <h1 className="text-xl font-bold text-indigo-950">Interaction Logs</h1>
        <div className="flex flex-wrap justify-between gap-4 ">
          <div className="flex space-x-2">
            <Input
              placeholder="Search for Logs"
              className="rounded-lg min-w-full px-4 bg-white"
            />
            <Button className="rounded-lg text-md">
              Search <Search />
            </Button>
          </div>
        </div>
      </div>
      <InteractionTable data={interactions} />
    </div>
  );
};

export default page;
