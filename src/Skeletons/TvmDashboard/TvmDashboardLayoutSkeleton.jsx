import { TvmCardsSkeleton } from "./Cards";
import { BarGraphsSkeleton } from "./BarGraphs";
import LineChartSkeletonLoading from "../ExecutiveDashbord/trendsChart";
import { LineChartsSkeleton } from "./LineCharts";
import { AssackExposureSkeletonLoading } from "../ExecutiveDashbord/thirdSection";

const TvmDashboardLayoutSkeleton = () => {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 font-sans">
      <div className="flex flex-col mb-10 gap-3 max-w-full xl:max-w-7xl mx-auto">
        <TvmCardsSkeleton />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <BarGraphsSkeleton />
        <LineChartSkeletonLoading />
      </div>

      <div className="flex flex-col lg:flex-row lg:flex-wrap gap-4 mt-4 w-full">
        <BarGraphsSkeleton />
        <BarGraphsSkeleton />
        <LineChartsSkeleton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] mb-4 gap-6 mt-4 w-full">
        <div className="bg-[#161e3e] rounded-xl p-6 border border-gray-800 shadow-lg hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out text-white flex flex-col justify-between overflow-hidden">
          <LineChartsSkeleton />
        </div>
        <BarGraphsSkeleton />
        <BarGraphsSkeleton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AssackExposureSkeletonLoading />
        <AssackExposureSkeletonLoading />
        <AssackExposureSkeletonLoading />
        <AssackExposureSkeletonLoading />
        <AssackExposureSkeletonLoading />
        <AssackExposureSkeletonLoading />
      </div>
    </div>
  );
};

export default TvmDashboardLayoutSkeleton;
