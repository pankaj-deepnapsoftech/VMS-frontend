import { LineChartsSkeleton } from "../TvmDashboard/LineCharts";

// Static block for sidebar links
function SidebarSkeleton() {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#181d25] flex flex-col justify-between">
      <div className="h-16 flex items-center justify-center">
        <div className="w-28 h-6 bg-[#232730] rounded" />
      </div>
      <div className="flex-1 px-3 py-2">
        {[...Array(7)].map((_, idx) => (
          <div key={idx} className="h-8 w-48 bg-[#232730] rounded my-2" />
        ))}
      </div>
      <div className="mb-4 px-4">
        <div className="w-full h-10 bg-[#232730] rounded-lg" />
      </div>
    </aside>
  );
}

function MainLayoutSkeleton() {
  return (
    <div className="flex min-h-screen w-full bg-[#1a1f2e]">
      {/* Sidebar Skeleton */}
      <SidebarSkeleton />

      {/* Main Section */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Header Skeleton */}
        <header className="h-14 w-full flex items-center justify-between px-4 bg-[#181d25]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#232730] rounded mr-2" />
            <div className="w-24 h-5 bg-[#232730] rounded" />
            <div className="ml-4 w-24 h-6 bg-[#232730] rounded" />
          </div>
          <div className="flex items-center gap-6">
            <div className="w-7 h-7 bg-[#232730] rounded-full" />
            <div className="w-8 h-8 bg-[#232730] rounded-full" />
          </div>
        </header>

        {/* Main Content Skeleton */}
        <main className="flex-1 bg-[#181d25] pt-6 px-8"></main>

        {/* Footer Skeleton */}
        <footer className="h-12 w-full flex items-center justify-center bg-[#181d25]"> 
          <div className="w-32 h-6 bg-[#232730] rounded" />
        </footer>
      </div>
    </div>
  );
}

export default MainLayoutSkeleton;
