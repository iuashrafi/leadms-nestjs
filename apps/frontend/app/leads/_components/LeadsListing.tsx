import RestaurantCard from "@/app/leads/_components/RestaurantCard";
import PreLoader from "@/components/PreLoader";
import { Button } from "@/components/ui/button";
import CustomErrorMessage from "@/components/CustomErrorMessage";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { contract } from "contract";
import { getQueryClient } from "@/lib/api";
import { SearchFormType } from "@/types/common";
import { Plus } from "lucide-react";

const LeadsListing = ({
  allLeadsSearchQuery,
  openLeadsModal,
}: {
  allLeadsSearchQuery: SearchFormType;
  openLeadsModal: () => void;
}) => {
  const { searchText, role } = allLeadsSearchQuery;

  const {
    data,
    isLoading,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = getQueryClient().lead.getAllLeads.useInfiniteQuery(
    [contract.lead.getAllLeads.path, allLeadsSearchQuery, searchText],
    ({ pageParam = { pageNumber: 1 } }) => {
      return {
        query: {
          pageNumber: String(pageParam.pageNumber),
          pageSize: String(9),
          searchText,
          roles: role.trim().length === 0 ? undefined : role,
        },
      };
    },
    {
      getNextPageParam: (lastPage) => {
        if (
          lastPage.status === 200 &&
          lastPage.body.currentPageNumber < lastPage.body.totalPages
        ) {
          return { pageNumber: lastPage.body.currentPageNumber + 1 };
        }
        return undefined;
      },
    }
  );

  const observeElement = useInfiniteScroll(
    isLoading || isFetchingNextPage,
    Boolean(hasNextPage),
    () => fetchNextPage()
  );

  if (isLoading) {
    return <PreLoader />;
  } else if (error) {
    return (
      <CustomErrorMessage
        title={"Error"}
        description={"OOPS! An error occurred while loading leads."}
      />
    );
  }

  const leads = data.pages.flatMap((items) => items.body.results);

  if (leads.length === 0)
    return (
      <CustomErrorMessage
        title={"No Leads found"}
        description={"Try to Add New Leads"}
        actionButton={
          <Button variant="default" onClick={openLeadsModal}>
            <Plus /> Add New Lead
          </Button>
        }
      />
    );
  return (
    <>
      <div className="w-full grid grid-cols-12 gap-4 py-4">
        {leads.map((lead: any) => (
          <RestaurantCard key={lead.id} lead={lead} />
        ))}
      </div>
      {observeElement}
    </>
  );
};

export default LeadsListing;
