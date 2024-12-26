"use client";
import { TableDemo } from "@/components/TableDemo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getQueryClient } from "@/lib/api";
import { MapPin, Phone, Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { contract } from "contract";
import { Input } from "@/components/ui/input";
import RestaurantCard from "./_components/RestaurantCard";

const page = () => {
  const [searchText, setSearchText] = useState<string>("");

  // const [leads, setLeads] = useState([]);

  // useEffect(() => {
  //   const getLeads = async () => {
  //     try {
  //       const response = await fetch("http://localhost:3000/lead/getAllLeads");
  //       if (!response.ok) {
  //         throw new Error(`Response status: ${response.status}`);
  //       }
  //       const json = await response.json();
  //       console.log(json);
  //       setLeads(json);

  //       console.log(leads);
  //     } catch (error) {
  //       console.log("Error fetching leads, error= ", error);
  //     }
  //   };
  //   getLeads();
  // }, []);

  const { data, isError, isLoading } =
    getQueryClient().lead.getAllLeads.useQuery(
      [contract.lead.getAllLeads.path],
      {}
    );

  if (isLoading) {
    return <>Loading...</>;
  } else if (isError) {
    return <>En Error occurred!</>;
  }

  if (data?.status !== 200) return <>Error : Leads fetching error</>;

  const leads = data.body;

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
      </div>
      <div className="w-full grid grid-cols-12 gap-4">
        {leads?.map((lead: any) => (
          <RestaurantCard key={lead.id} lead={lead} />
        ))}
      </div>
    </div>
  );
};

export default page;
