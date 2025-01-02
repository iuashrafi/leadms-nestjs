"use client";

import { getQueryClient } from "@/lib/api";
import { contract } from "contract";
import DashboardCard from "./_components/DashboardCard";
import RecentRestaurants from "./_components/RecentRestaurants";
import RecentInteractions from "./_components/RecentInteractions";
import TodaysPendingCalls from "./_components/TodaysPendingCalls";

export default function DashboardPage() {
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
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {dashboardData.dashboardCards.map((data, index) => (
            <DashboardCard key={index} data={data} />
          ))}
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <RecentRestaurants restaurants={dashboardData.recentRestaurants} />
          <RecentInteractions interactions={dashboardData.recentInteractions} />
          <TodaysPendingCalls interactions={dashboardData.recentInteractions} />
        </div>
      </main>
    </div>
  );
}
