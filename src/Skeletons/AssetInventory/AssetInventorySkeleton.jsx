import { PaginationSkeletonLoading } from "../Components/PaginationSkeleton";
import { SearchSkeletonLoading } from "../Components/SearchSkeleton";
import { TableSkeletonLoading } from "../Components/TablesSkeleton";

export const AssertInventorySkeletonLayout = () => {
  return (
    <div className="bg-[#1a1f2e]">
      <div className="w-full px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-md">
        <div className="flex flex-col gap-2">
          <div className="h-8 w-48 bg-gray-500 rounded-md animate-pulse" />
          <div className="h-4 w-32 bg-gray-500 rounded-md animate-pulse" />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
          <div className="h-10 w-32 bg-gray-600 rounded-md animate-pulse" />
          <div className="h-10 w-40 bg-gray-600 rounded-md animate-pulse" />
        </div>
      </div>

      <div className="w-full min-h-screen p-6">
        <div className="bg-[#1a1f2e] rounded-lg mb-12 shadow-xl overflow-hidden">
          <SearchSkeletonLoading />
          <TableSkeletonLoading />
          <PaginationSkeletonLoading />
        </div>
      </div>
    </div>
  );
};
