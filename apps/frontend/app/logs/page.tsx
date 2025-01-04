"use client";
import { getQueryClient } from "@/lib/api";
import { InteractionTable } from "./_components/InteractionTable";
import { contract } from "contract";
import PreLoader from "@/components/PreLoader";
import InteractionsSearchForm from "./_components/InteractionsSearchForm";
import { useQueryState } from "@/hooks/useQueryState";
import { InteractionsSearchFormType } from "@/lib/schema";
import { SubmitHandler, useForm } from "react-hook-form";

const page = () => {
  const [allInteractionsSearchQuery, setAllInteractionsSearchQuery] =
    useQueryState<InteractionsSearchFormType>("InteractionsSearchQuery", {
      searchText: "",
    });

  const searchForm = useForm({
    defaultValues: {
      searchText: "",
    },
  });

  const onInteractionsSearch: SubmitHandler<InteractionsSearchFormType> = (
    data
  ) => {
    setAllInteractionsSearchQuery(data);
  };

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
            <InteractionsSearchForm
              searchForm={searchForm}
              onInteractionsSearch={onInteractionsSearch}
            />
          </div>
        </div>
      </div>
      <InteractionTable
        allInteractionsSearchQuery={allInteractionsSearchQuery}
      />
    </div>
  );
};

export default page;
