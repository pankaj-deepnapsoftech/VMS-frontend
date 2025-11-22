export default function AttackSurfaceSkeleton () {
  return (
    <div className="space-y-6">
      {/* Title Skeleton */}
      <div className="space-y-2">
        <div className="h-6 w-60 bg-gray-700/30 animate-pulse rounded-md" />
        <div className="h-4 w-72 bg-gray-700/20 animate-pulse rounded-md" />
      </div>

      {/* Cards Skeleton Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1 */}
        <div className="bg-gray-800/40 rounded-xl p-6 animate-pulse">
          <div className="h-10 w-10 bg-gray-700/40 rounded-md mb-4"></div>
          <div className="h-5 w-40 bg-gray-700/30 rounded-md mb-3"></div>
          <div className="h-4 w-full bg-gray-700/20 rounded-md mb-2"></div>
          <div className="h-4 w-3/4 bg-gray-700/20 rounded-md"></div>
        </div>

        {/* Card 2 */}
        <div className="bg-gray-800/40 rounded-xl p-6 animate-pulse">
          <div className="h-10 w-10 bg-gray-700/40 rounded-md mb-4"></div>
          <div className="h-5 w-48 bg-gray-700/30 rounded-md mb-3"></div>
          <div className="h-4 w-full bg-gray-700/20 rounded-md mb-2"></div>
          <div className="h-4 w-3/4 bg-gray-700/20 rounded-md"></div>
        </div>

      </div>

      {/* Table skeleton */}
      <div className="overflow-hidden rounded-xl border border-slate-800">
        <table className="w-full min-w-[900px]">
          <thead className="bg-slate-800">
            <tr>
              {["Scan Name", "Severity", "Assets", "Last Update", "Options"].map(
                (h) => (
                  <th
                    key={h}
                    className="py-3 px-4 text-left text-slate-400 text-xs uppercase"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="animate-pulse">
                <td className="py-4 px-4">
                  <div className="h-4 w-32 bg-slate-800 rounded-md"></div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <div
                        key={j}
                        className="h-5 w-6 bg-slate-800 rounded-md"
                      ></div>
                    ))}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="h-4 w-10 bg-slate-800 rounded-md"></div>
                </td>
                <td className="py-4 px-4">
                  <div className="h-4 w-28 bg-slate-800 rounded-md"></div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-4">
                    <div className="h-5 w-5 bg-slate-800 rounded-md"></div>
                    <div className="h-5 w-5 bg-slate-800 rounded-md"></div>
                    <div className="h-5 w-5 bg-slate-800 rounded-md"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination skeleton */}
      <div className="mt-5 flex justify-center gap-3">
        <div className="h-8 w-24 bg-slate-800 rounded-md animate-pulse"></div>
        <div className="h-8 w-24 bg-slate-800 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
}
