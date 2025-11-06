import React from "react";
import CardsSkeletonLoading from "./Cards";
import LineChartSkeletonLoading from "./trendsChart";
import { AssackExposureSkeletonLoading, AssertInvertorySkeletonLoading, FinancialExposureSkeletonLoading, RemediationWorkflowSkeletonLoading } from "./thirdSection";

const ExecutiveDashboardLayoutSkeleton = () => {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 font-sans">
      <div className="flex flex-col mb-10 gap-3 max-w-full xl:max-w-7xl mx-auto">
        <CardsSkeletonLoading />
      </div>
      <div className="flex flex-col xl:flex-row gap-4 w-full">
        <div className="bg-[#161d3d] border border-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out rounded-xl p-4 flex-1 shadow-md overflow-hidden">
          <LineChartSkeletonLoading />
        </div>
        <div className="bg-[#161d3d] border border-gray-800 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out rounded-xl p-4 flex-1 shadow-md overflow-hidden">
          <LineChartSkeletonLoading />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 pt-5">
        <AssertInvertorySkeletonLoading />
        <FinancialExposureSkeletonLoading />
        <RemediationWorkflowSkeletonLoading />
        <AssackExposureSkeletonLoading />
        </div>
    </div>
  );
};

export default ExecutiveDashboardLayoutSkeleton;
