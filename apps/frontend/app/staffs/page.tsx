"use client";

import { useQueryState } from "@/hooks/useQueryState";
import { SubmitHandler, useForm } from "react-hook-form";
import { StaffTable } from "./_components/StaffTable";
import StaffsSearchForm from "./_components/StaffsSearchForm";
import { StaffsSearchFormType } from "@/lib/schema";

const page = () => {
  const [allStaffsSearchQuery, setAllStaffsSearchQuery] =
    useQueryState<StaffsSearchFormType>("StaffSearchQuery", {
      searchText: "",
    });

  const searchForm = useForm({
    defaultValues: {
      searchText: "",
    },
  });

  // const { reset } = searchForm;

  const onStaffsSearch: SubmitHandler<StaffsSearchFormType> = (data) => {
    console.log("submitting data= ", data);
    setAllStaffsSearchQuery(data);
  };

  // const { data, isError, isLoading } =
  //   getQueryClient().lead.getAllStaffs.useQuery(
  //     [contract.lead.getAllStaffs.path],
  //     {
  //       query: {
  //         pageNumber: String(1),
  //         pageSize: String(5),
  //       },
  //     }
  //   );

  // if (isLoading) {
  //   return <>Loading...</>;
  // } else if (isError) {
  //   return <>En Error occurred!</>;
  // }

  // if (data?.status !== 200) return <>Error : Leads fetching error</>;

  // const staffs = data.body.results;
  return (
    <div>
      <div className="py-4">
        <h1 className="text-3xl font-bold text-indigo-950 text-center">
          Restaurants Staffs
        </h1>
        <div className="mt-4 mb-8 flex justify-center space-x-3">
          <StaffsSearchForm
            searchForm={searchForm}
            onStaffsSearch={onStaffsSearch}
          />
        </div>
      </div>
      <StaffTable
        allStaffsSearchQuery={allStaffsSearchQuery}
        searchForm={searchForm}
      />
    </div>
  );
};

export default page;
