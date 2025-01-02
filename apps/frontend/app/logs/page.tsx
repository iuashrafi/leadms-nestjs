"use client";
import { getQueryClient } from "@/lib/api";
import { InteractionTable } from "./_components/InteractionTable";
import { contract } from "contract";

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
    return <>Loading...</>;
  } else if (isError) {
    return <>En Error occurred!</>;
  }

  if (data?.status !== 200) return <>Error : Interactions fetching error</>;

  console.log("data=", data);
  const interactions = data.body.results;
  return (
    <div>
      <InteractionTable data={interactions} />
    </div>
  );
};

export default page;
