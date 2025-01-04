"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import DialogWrapper from "@/components/DialogWrapper";
import CreateLeadForm from "./_components/CreateLeadForm";
import LeadsSearchForm from "./_components/LeadsSearchForm";
import { useQueryState } from "@/hooks/useQueryState";
import { LeadsSearchFormType } from "@/lib/schema";
import { SubmitHandler, useForm } from "react-hook-form";
import LeadsListing from "./_components/LeadsListing";

const page = () => {
  const [allLeadsSearchQuery, setAllLeadsSearchQuery] =
    useQueryState<LeadsSearchFormType>("LeadsSearchQuery", {
      searchText: "",
    });

  const searchForm = useForm({
    defaultValues: {
      searchText: "",
    },
  });

  const onLeadsSearch: SubmitHandler<LeadsSearchFormType> = (data) => {
    console.log("setting data = ", data);
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
    <div className="bg-green-00">
      <div className="p-4 bg-red-00 ">
        <h1 className="text-xl font-bold text-indigo-950">Restaurants Leads</h1>
        <div className="flex flex-wrap justify-between gap-4 ">
          <div className="flex space-x-2">
            <LeadsSearchForm
              searchForm={searchForm}
              onLeadsSearch={onLeadsSearch}
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
    </div>
  );
};

export default page;
