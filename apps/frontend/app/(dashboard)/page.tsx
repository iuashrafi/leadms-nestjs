"use client";
import DashboardCard from "@/app/(dashboard)/_components/DashboardCard";
import RecentRestaurants from "@/app/(dashboard)/_components/RecentRestaurants";
import RecentInteractions from "@/app/(dashboard)/_components/RecentInteractions";
import TodaysPendingCalls from "@/app/(dashboard)/_components/TodaysPendingCalls";
import PreLoader from "@/components/PreLoader";
import { contract } from "contract";
import { getQueryClient } from "@/lib/api";
import CustomErrorMessage from "@/components/CustomErrorMessage";

export default function DashboardPage() {
  const { data, isError, isLoading } =
    getQueryClient().lead.getDashboardData.useQuery(
      [contract.lead.getDashboardData.path],
      {}
    );

  if (isLoading) {
    return <PreLoader />;
  } else if (isError) {
    return (
      <CustomErrorMessage
        title={"Error"}
        description={"Error loading dashboard data"}
      />
    );
  }

  const dashboardData = data.body;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 md:gap-8">
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
