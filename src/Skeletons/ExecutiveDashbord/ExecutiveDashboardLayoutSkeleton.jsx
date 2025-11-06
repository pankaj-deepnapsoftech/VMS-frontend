import React from 'react'
import CardsSkeletonLoading from './Cards'

const ExecutiveDashboardLayoutSkeleton = () => {
    return (
        <div className="min-h-screen bg-background p-4 sm:p-6 font-sans">
            <div className="flex flex-col mb-10 gap-3 max-w-full xl:max-w-7xl mx-auto">
                <CardsSkeletonLoading />
            </div>
        </div>
    )
}

export default ExecutiveDashboardLayoutSkeleton