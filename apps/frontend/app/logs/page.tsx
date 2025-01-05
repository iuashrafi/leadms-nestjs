"use client";
import { Fragment, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { InteractionTable } from "@/app/logs/_components/InteractionTable";
import InteractionsSearchForm from "@/app/logs/_components/InteractionsSearchForm";
import { useQueryState } from "@/hooks/useQueryState";
import { InteractionsSearchFormType } from "@/types/logs";

const CallLogsPage = () => {
  return (
    <div className="space-y-4">
      <h1 className=" text-[24px] md:text-[28px] leading-tight font-bold text-indigo-950">
        Interaction Logs
      </h1>
      <Suspense fallback={<p>loading call logs...</p>}>
        <CallLogsComponent />
      </Suspense>
    </div>
  );
};

const CallLogsComponent = () => {
  const searchParams = useSearchParams();
  const staffId = searchParams.get("staffId");
  const leadId = searchParams.get("leadId");

  const [allInteractionsSearchQuery, setAllInteractionsSearchQuery] =
    useQueryState<InteractionsSearchFormType>("InteractionsSearchQuery", {
      searchText: "",
      role: "",
    });

  const searchForm = useForm({
    defaultValues: {
      searchText: "",
      role: "",
    },
  });

  const onInteractionsSearch: SubmitHandler<InteractionsSearchFormType> = (
    data
  ) => {
    setAllInteractionsSearchQuery(data);
  };

  return (
    <Fragment>
      <div className="bg-red-00 ">
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
        staffId={staffId}
        leadId={leadId}
      />
    </Fragment>
  );
};

export default CallLogsPage;
