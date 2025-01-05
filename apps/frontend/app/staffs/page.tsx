"use client";
import { Fragment, Suspense } from "react";
import { useQueryState } from "@/hooks/useQueryState";
import { SubmitHandler, useForm } from "react-hook-form";
import { StaffTable } from "@/app/staffs/_components/StaffTable";
import StaffsSearchForm from "@/app/staffs/_components/StaffsSearchForm";
import { SearchFormType } from "@/types/common";

const StaffsPage = () => {
  return (
    <div>
      <h1 className="text-xl font-bold text-indigo-950">Restaurants Staffs</h1>
      <Suspense fallback={<p>Loading staffs data...</p>}>
        <StaffsComponent />
      </Suspense>
    </div>
  );
};

const StaffsComponent = () => {
  //TODO: move the default value to the specific utils
  const [allStaffsSearchQuery, setAllStaffsSearchQuery] =
    useQueryState<SearchFormType>("StaffSearchQuery", {
      searchText: "",
      role: "",
    });

  const searchForm = useForm({
    defaultValues: {
      searchText: "",
      role: "",
    },
  });

  const onStaffsSearch: SubmitHandler<SearchFormType> = (data) => {
    setAllStaffsSearchQuery(data);
  };

  return (
    <Fragment>
      <div className="p-4">
        <div className="mt-4 mb-6 flex">
          <StaffsSearchForm
            searchForm={searchForm}
            onStaffsSearch={onStaffsSearch}
          />
        </div>
      </div>

      <StaffTable allStaffsSearchQuery={allStaffsSearchQuery} />
    </Fragment>
  );
};

export default StaffsPage;
