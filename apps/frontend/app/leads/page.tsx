"use client";
import { TableDemo } from "@/components/TableDemo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getQueryClient } from "@/lib/api";
import { MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { contract } from "../../../contract";

const page = () => {
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

  return (
    <div className="container mx-auto bg-red-200 py-8 px-4 grid grid-cols-12 gap-4">
      {leads?.map((lead: any) => (
        <div
          key={lead.id}
          className="col-span-12 sm:col-span-6  lg:col-span-3 border bg-white p-4 rounded-lg shadow"
        >
          <div>{lead.name}</div>
          <ul>
            <li className="flex items-center">
              <MapPin size={18} />
              <span>{lead.address}</span>
            </li>
            <li className="flex items-center">
              <Phone size={18} />
              <span>{lead.contactNumber}</span>
            </li>
            <li>
              <Badge variant="outline">{lead.restaurantLeadStatus}</Badge>
            </li>
          </ul>
          <Button asChild className="w-full" variant={"outline"}>
            <Link href={`/leads/${lead.id}`}>View</Link>
          </Button>
        </div>
      ))}
      {/* <div className="col-span-3 border bg-white p-4 rounded-lg shadow">
        <div>Restaurant Name</div>
        <ul>
          <li className="flex items-center">
            <MapPin size={18} />
            <span>Chennai India</span>
          </li>
          <li className="flex items-center">
            <Phone size={18} />
            <span>1234567890</span>
          </li>
          <li>
            <Badge variant="outline">Active</Badge>
          </li>
        </ul>
        <Button className="w-full" variant={"outline"}>
          View
        </Button>
      </div> */}
    </div>
  );
};

export default page;
