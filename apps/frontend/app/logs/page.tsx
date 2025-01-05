"use client";
import { Fragment, Suspense } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InteractionTable } from "@/app/logs/_components/InteractionTable";
import InteractionsSearchForm from "@/app/logs/_components/InteractionsSearchForm";
import { useQueryState } from "@/hooks/useQueryState";
import { InteractionsSearchFormType } from "@/types/logs";

const CallLogsPage = () => {
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
    useQueryState<SearchFormType>("InteractionsSearchQuery", {
      searchText: "",
      role: "",
    });

  const searchForm = useForm({
    defaultValues: {
      searchText: "",
      role: "",
    },
  });

  const onInteractionsSearch: SubmitHandler<SearchFormType> = (data) => {
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

export default CallLogsPage;
