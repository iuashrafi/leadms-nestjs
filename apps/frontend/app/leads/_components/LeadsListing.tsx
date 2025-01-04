import { SearchFormType } from "@/lib/schema";
import RestaurantCard from "./RestaurantCard";
import PreLoader from "@/components/PreLoader";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { getQueryClient } from "@/lib/api";
import { contract } from "contract";
import { Button } from "@/components/ui/button";
import CustomErrorMessage from "@/components/CustomErrorMessage";

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
          pageSize: String(4),
          searchText,
          roles: role,
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
    return <>En Error occurred!</>;
  }

  const leads = data.pages.flatMap((items) => items.body.results);

  if (leads.length === 0)
    return (
      <CustomErrorMessage
        title={"No Lead found"}
        description={"Try to add new leads"}
        actionButton={
          <Button variant="default" onClick={openLeadsModal}>
            Add New Lead
          </Button>
        }
      />
    );
  return (
    <>
      <div className="w-full grid grid-cols-12 gap-4">
        {leads.map((lead: any) => (
          <RestaurantCard key={lead.id} lead={lead} />
        ))}
      </div>
      {observeElement}
    </>
  );
};

export default LeadsListing;
