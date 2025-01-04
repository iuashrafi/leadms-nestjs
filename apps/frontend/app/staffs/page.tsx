"use client";

import { useQueryState } from "@/hooks/useQueryState";
import { SubmitHandler, useForm } from "react-hook-form";
import { StaffTable } from "./_components/StaffTable";
import StaffsSearchForm from "./_components/StaffsSearchForm";
import { SearchFormType } from "@/types/common";

const page = () => {
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
    <div>
      <div className="p-4">
        <h1 className="text-xl font-bold text-indigo-950">
          Restaurants Staffs
        </h1>
        <div className="mt-4 mb-6 flex">
          <StaffsSearchForm
            searchForm={searchForm}
            onStaffsSearch={onStaffsSearch}
          />
        </div>
      </div>
      <StaffTable allStaffsSearchQuery={allStaffsSearchQuery} />
    </div>
  );
};

export default page;
