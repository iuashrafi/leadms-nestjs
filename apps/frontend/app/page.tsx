"use client";

import { getQueryClient } from "@/lib/api";
import { contract } from "../../contract";
import { ChefHat, PhoneCall, Utensils } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { data, isError, isLoading } =
    getQueryClient().lead.getDashboardData.useQuery(
      [contract.lead.getDashboardData.path],
      {}
    );

  if (isLoading) {
    return <>Loading...</>;
  } else if (isError) {
    return <>En Error occurred!</>;
  }

  if (data?.status !== 200) return <>Error : Leads fetching error</>;

  const dashboardData = data.body;

  return (
    <div className="relative grid grid-cols-12 gap-3 md:gap-4 ">
      {dashboardData.map((item, index) => (
        <Link
          href={`${item.link}`}
          key={index}
          className="group transition ease-in-out hover:scale-[1.02] hover:shadow-lg relative cursor-pointer min-h-[150px] bg-gradient-to-tr from-indigo-300 to-violet-100 border border-indigo-400/40 p-6 col-span-12 sm:col-span-6 md:col-span-4 rounded-3xl"
        >
          <span className="absolute border border-indigo-600/50 text-green-600 right-4 top-4 text-2xl bg-white  h-12 w-12 rounded-full flex items-center justify-center">
            {item.title === "Restaurants" && (
              <Utensils size={24} className="text-indigo-500/50" />
            )}
            {item.title === "Staffs" && (
              <ChefHat size={24} className="text-indigo-500/50" />
            )}
            {item.title === "Interaction" && (
              <PhoneCall size={24} className="text-indigo-500/50" />
            )}
          </span>
          <div>
            <div className="text-lg font-semibold text-indigo-800/80 tracking-wider">
              {item.title}
            </div>
            <div className="text-2xl font-semibold text-indigo-900">
              {item.itemsCount} leads
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
