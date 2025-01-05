"use client";
import { Fragment, Suspense, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import DialogWrapper from "@/components/DialogWrapper";
import CreateLeadForm from "@/app/leads/_components/CreateLeadForm";
import LeadsSearchForm from "@/app/leads/_components/LeadsSearchForm";
import LeadsListing from "@/app/leads/_components/LeadsListing";
import { useQueryState } from "@/hooks/useQueryState";
import { SearchFormType } from "@/types/common";

const LeadsPage = () => {
  return (
    <div className="bg-green-00">
      <h1 className="text-xl font-bold text-indigo-950">Restaurants Leads</h1>
      <Suspense fallback={<p>Loading leads...</p>}>
        <LeadsComponent />
      </Suspense>
    </div>
  );
};

const LeadsComponent = () => {
  const [allLeadsSearchQuery, setAllLeadsSearchQuery] =
    useQueryState<SearchFormType>("LeadsSearchQuery", {
      searchText: "",
      role: "",
    });

  const searchForm = useForm({
    defaultValues: {
      searchText: "",
      role: "",
    },
  });

  const onSearchLeads: SubmitHandler<SearchFormType> = (data) => {
    setAllLeadsSearchQuery(data);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <Fragment>
      <div className="p-4 bg-red-00 ">
        <div className="flex flex-wrap justify-between gap-4 ">
          <div className="flex space-x-2">
            <LeadsSearchForm
              searchForm={searchForm}
              onSearchLeads={onSearchLeads}
            />
          </div>
          <div>
            <Button variant="default" onClick={openModal}>
              Add New Lead
            </Button>
          </div>
        </div>
        <div>
          <DialogWrapper
            title="Add New Lead"
            isOpen={isModalOpen}
            onClose={closeModal}
          >
            <CreateLeadForm closeModal={closeModal} />
          </DialogWrapper>
        </div>
      </div>

      <LeadsListing
        allLeadsSearchQuery={allLeadsSearchQuery}
        openLeadsModal={openModal}
      />
    </Fragment>
  );
};

export default LeadsPage;
