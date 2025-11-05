const CardsSkeletonLoading = () => {
    return (
        <div className="grid grid-cols-3 gap-10" >
            {[1, 2, 3].map((item) => <div key={item}
                className="relative rounded-2xl  bg-[#1C2543] p-5 text-white shadow-md border border-[#303A60] flex flex-col justify-center hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 ease-in-out h-[120px] sm:h-[130px] md:h-[140px]"
            >
                {/* ICON PLACEHOLDER */}
                <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl backdrop-blur-md bg-[#2A355E] animate-pulse" />

                {/* TEXT SECTION */}
                <div className="flex flex-col justify-center h-full pr-16 sm:pr-20 space-y-3">
                    <div className="h-3 sm:h-4 w-2/5 bg-[#2A355E] rounded-md animate-pulse" />
                    <div className="h-5 sm:h-6 w-3/5 bg-[#2A355E] rounded-md animate-pulse" />
                    <div className="h-3 sm:h-4 w-1/3 bg-[#2A355E] rounded-md animate-pulse" />
                </div>
            </div>)}
        </div>
    );
};

export default CardsSkeletonLoading;
