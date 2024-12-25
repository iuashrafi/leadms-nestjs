"use client";

import { getQueryClient } from "@/lib/api";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { contract } from "../../../../contract";

const page = () => {
  const params = useParams();

  // discarded  - normal way
  // const [lead, setLead] = useState<any>({});
  // useEffect(() => {
  //   const getLead = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:3000/lead/getLeadById?id=${params.id}`
  //       );
  //       if (!response.ok) {
  //         throw new Error(`Response status: ${response.status}`);
  //       }
  //       const json = await response.json();
  //       setLead(json);
  //       console.log(lead);
  //     } catch (error) {
  //       console.log("Error fetching leads, error= ", error);
  //     }
  //   };
  //   getLead();
  // }, []);

  // using tanstack(react) query
  const { data, isError, isLoading } =
    getQueryClient().lead.getLeadById.useQuery(
      [contract.lead.getLeadById.path],
      {
        query: {
          id: params.id,
        },
      }
    );

  if (isLoading) {
    return <>Loading...</>;
  } else if (isError) {
    return <>En Error occurred!</>;
  }

  if (data?.status !== 200) return <>Error : Leads fetching error</>;

  console.log("data=  ", data);

  const lead = data.body;
  return (
    <div>
      <div>
        name : {lead.restaurantName}
        <br />
        address : {lead.address}
      </div>

      <div>
        <h1>Staffs</h1>
        <ul className="space-y-4">
          {lead.staffs?.map(({ staffId, staffName, role, email }) => (
            <li key={staffId} className=" border p-4">
              name : {staffName} <br />
              role : {role} <br />
              email : {email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default page;
