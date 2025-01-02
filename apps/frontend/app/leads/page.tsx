"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getQueryClient } from "@/lib/api";
import { Search } from "lucide-react";
import { contract } from "contract";
import { Input } from "@/components/ui/input";
import RestaurantCard from "./_components/RestaurantCard";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import DialogWrapper from "@/components/DialogWrapper";
import CreateLeadForm from "./_components/CreateLeadForm";

const page = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const {
    data,
    isLoading,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = getQueryClient().lead.getAllLeads.useInfiniteQuery(
    [contract.lead.getAllLeads.path],
    ({ pageParam = { pageNumber: 1 } }) => {
      return {
        query: {
          pageNumber: String(pageParam.pageNumber),
          pageSize: String(3),
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
    return <>Loading...</>;
  } else if (error) {
    return <>En Error occurred!</>;
  }

  const leads = data.pages.flatMap((items) => items.body.results);

  const handleChange = (value: string) => {
    setSearchText(value);
  };

  return (
    <div className="">
      <div className="py-4">
        <h1 className="text-3xl font-bold text-indigo-950 text-center">
          Restaurants Leads
        </h1>
        <div className="mt-4 mb-8 flex justify-center space-x-3">
          <Input
            placeholder="Search for Restaurant Name"
            className="rounded-3xl h-[43px] max-w-md px-4 bg-white"
            onChange={(e) => handleChange(e.currentTarget.value)}
            value={searchText}
          />
          <Button className="rounded-3xl text-md" size="lg">
            Search <Search />
          </Button>
        </div>
        <div>
          <Button variant="default" onClick={() => setIsModalOpen(true)}>
            Create Lead
          </Button>

          <DialogWrapper
            title="Create Lead"
            isOpen={isModalOpen}
            onClose={closeModal}
          >
            <CreateLeadForm />
          </DialogWrapper>
        </div>
      </div>
      <div className="w-full grid grid-cols-12 gap-4">
        {leads?.map((lead: any) => (
          <RestaurantCard key={lead.id} lead={lead} />
        ))}
      </div>
      <div className="p-8">{observeElement}</div>
    </div>
  );
};

export default page;
