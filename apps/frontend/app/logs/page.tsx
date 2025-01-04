"use client";
import { InteractionTable } from "./_components/InteractionTable";
import InteractionsSearchForm from "./_components/InteractionsSearchForm";
import { useQueryState } from "@/hooks/useQueryState";
import { InteractionsSearchFormType } from "@/lib/schema";
import { Fragment, Suspense } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const page = () => {
  return (
    <div>
      <h1 className="text-xl font-bold text-indigo-950">Interaction Logs</h1>
      <Suspense fallback={<p>loading call logs...</p>}>
        <CallLogsComponent />
      </Suspense>
    </div>
  );
};

const CallLogsComponent = () => {
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

  return (
    <Fragment>
      <div className="p-4 bg-red-00 ">
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
    </Fragment>
  );
};

export default page;
