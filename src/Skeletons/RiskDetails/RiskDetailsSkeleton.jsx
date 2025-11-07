import { TableSkeletonLoading } from "../Components/TablesSkeleton";

export const RiskDetailsSkeletonLayout = () => {
  return (
    <div>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="w-full mt-4">
          {/* Skeleton for heading */}
          <div className="h-8 w-1/3 bg-gray-700 rounded mb-2 animate-pulse"></div>
          {/* Skeleton for subtext */}
          <div className="h-4 w-1/4 bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="w-full min-h-screen p-6">
        <div className="bg-[#1a1f2e] rounded-lg mb-12 shadow-xl overflow-hidden">
          <TableSkeletonLoading />
        </div>
      </div>
    </div>
  );
};
