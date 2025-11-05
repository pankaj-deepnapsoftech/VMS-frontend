

export const AssertInvertorySkeletonLoading = () => {
    return (
        <div className="bg-[#161d3d] p-5 rounded-2xl animate-pulse border border-gray-800 flex flex-col justify-between">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div className="h-4 bg-gray-600 w-1/3 rounded"></div>
                <div className="h-6 w-6 bg-gray-600 rounded-full"></div>
            </div>

            {/* Circle */}
            <div className="flex justify-center items-center mb-4">
                <div className="relative w-24 h-24 bg-gray-600 animate-pulse rounded-full"></div>
            </div>

            {/* Asset Details */}
            <div className="space-y-3 text-sm mt-auto">
                {[...Array(3)].map((_, idx) => (
                    <div key={idx} className="flex justify-between items-center text-white/80 hover:text-white transition">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 bg-gray-600 rounded-full"></div>
                            <div className="h-4 bg-gray-600 w-1/2 rounded"></div>
                        </div>
                        <div className="text-right">
                            <div className="h-4 bg-gray-600 w-12 rounded"></div>
                            <div className="h-3 bg-gray-600 w-10 rounded mt-1"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};


export const FinancialExposureSkeletonLoading = () => {
    return (
        <div className="bg-[#161d3d] p-5 animate-pulse rounded-2xl text-white border border-gray-800 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-3">
                <div className="h-4 bg-gray-600 w-1/3 rounded"></div>
                <div className="h-6 w-6 bg-gray-600 rounded-full"></div>
            </div>

            <div className="flex items-end gap-4 mb-4">
                <div>
                    <div className="h-6 bg-gray-600 w-24 rounded"></div>
                    <div className="h-3 bg-gray-600 w-16 rounded mt-1"></div>
                </div>
            </div>

            <div className="flex flex-col justify-center gap-4 mt-auto">
                {[...Array(3)].map((_, idx) => (
                    <div key={idx}>
                        <div className="flex justify-between text-xs mb-1">
                            <div className="h-4 bg-gray-600 w-24 rounded"></div>
                            <div className="h-4 bg-gray-600 w-12 rounded"></div>
                        </div>
                        <div className="w-full h-2 bg-gray-700 rounded-full">
                            <div className="h-2 bg-gray-600 rounded-full"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};


export const RemediationWorkflowSkeletonLoading = () => {
    return (
        <div className="bg-[#161d3d] p-5 animate-pulse rounded-2xl text-white border border-gray-800 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-3">
                <div className="h-4 bg-gray-600 w-1/3 rounded"></div>
                <div className="h-6 w-6 bg-gray-600 rounded-full"></div>
            </div>

            <div className="flex items-end gap-6 mb-5">
                <div>
                    <div className="h-6 bg-gray-600 w-24 rounded"></div>
                    <div className="h-3 bg-gray-600 w-16 rounded mt-1"></div>
                </div>
                <div>
                    <div className="h-6 bg-gray-600 w-24 rounded"></div>
                    <div className="h-3 bg-gray-600 w-16 rounded mt-1"></div>
                </div>
            </div>

            <div className="flex flex-col justify-center gap-4 mt-auto">
                {[...Array(3)].map((_, idx) => (
                    <div key={idx}>
                        <div className="flex justify-between text-xs mb-1">
                            <div className="h-4 bg-gray-600 w-24 rounded"></div>
                            <div className="h-4 bg-gray-600 w-12 rounded"></div>
                        </div>
                        <div className="w-full h-2 bg-gray-700 rounded-full">
                            <div className="h-2 bg-gray-600 rounded-full"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export const AssackExposureSkeletonLoading = () => {
    return (
        <div className="bg-[#161e3e] border border-gray-800 p-5 animate-pulse rounded-xl text-white flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <div className="h-4 bg-gray-600 w-1/3 rounded"></div>
                    <div className="h-3 bg-gray-600 w-16 rounded mt-1"></div>
                </div>
                <div className="h-6 w-6 bg-gray-600 rounded-full"></div>
            </div>

            {/* Static Data Table */}
            <div className="bg-[#121F3A] rounded-md overflow-hidden text-sm mt-2">
                {/* Header Row */}
                <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-[#1B2B45] text-gray-400">
                    <div className="col-span-6 h-4 bg-gray-600 rounded"></div>
                    <div className="col-span-3 text-right h-4 bg-gray-600 rounded"></div>
                </div>

                {/* Static Data Rows */}
                {[...Array(5)].map((_, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-[#1B2B45] items-center hover:bg-[#1a2748] transition-colors">
                        <div className="col-span-6 h-4 bg-gray-600 rounded"></div>
                        <div className="col-span-3 text-right h-4 bg-gray-600 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}




